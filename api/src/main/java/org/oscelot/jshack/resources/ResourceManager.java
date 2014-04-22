/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.resources;

import blackboard.platform.plugin.PlugInUtil;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.io.IOUtils;
import org.oscelot.jshack.BuildingBlockHelper;
//import org.oscelot.jshack.JSHackManager;
//import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.model.HackInstance;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class ResourceManager {
    //todo: do we need shorthand?
    public static final String RESOURCE_SHORTHAND_START = "<[";
    public static final String RESOURCE_SHORTHAND_END = "]>";
    
    private ConcurrentHashMap<String, File> fileLookup = new ConcurrentHashMap<String, File>();
    private ConcurrentHashMap<String, HackResource> resourceLookup = new ConcurrentHashMap<String, HackResource>();
    private ConcurrentHashMap<String, String> hashLookup = new ConcurrentHashMap<String, String>();
    private ConcurrentHashMap<String, HashMap<String, String>> urlLookup = new ConcurrentHashMap<String, HashMap<String, String>>();
    private ResourceCache resourceCache;
    private Pattern shorthandPattern = Pattern.compile(Pattern.quote(RESOURCE_SHORTHAND_START) + "([^\\r\\n]+(?=" + Pattern.quote(RESOURCE_SHORTHAND_END) + "))" + Pattern.quote(RESOURCE_SHORTHAND_END));
    
//    JSHackManager manager = JSHackManagerFactory.getHackManager();
    //todo refactor this to follow the new arch' conventions.
    File hackRoot = null;//manager.getHacksRoot();
           
    public ResourceManager() throws IOException {
        //todo: get this from central config
        //resourceCache = new ResourceCache(manager.getCentralConfig().getResourcesMaxCacheableBytes());
        resourceCache = new ResourceCache(5*1024*1024);
    }
    
    public synchronized void registerHackPackage(HackInstance hackInstance) throws FileNotFoundException, IOException {
        HashMap<String, String> urlLookupEntry = new HashMap<String, String>();
        for(HackResource hackResource : hackInstance.getHack().getResources()) {
            File resourceFile =  getResourceFile(hackInstance.getHack().getIdentifier(), hackResource);
            String hash = calculateHash(resourceFile);
            hashLookup.putIfAbsent(resourceFile.getCanonicalPath(), hash);
            fileLookup.putIfAbsent(hash, resourceFile);
            resourceLookup.putIfAbsent(hash, hackResource);
            
            String baseUrl = PlugInUtil.getUriStem(BuildingBlockHelper.VENDOR_ID, BuildingBlockHelper.HANDLE);
            urlLookupEntry.put(hackResource.getPath(), baseUrl + "resources/" + hash);
        }
        urlLookup.putIfAbsent(hackInstance.getHack().getIdentifier(), urlLookupEntry);
    }
    
    public File getResourceFile(String hackId, HackResource hackResource) {
        return new File(hackRoot, hackId + File.separator + "resources" + File.separator + hackResource.getPath());
    }
    
    private String calculateHash(File file) throws IOException {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(ResourceManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        if(md5 != null) {
            InputStream IS = new DigestInputStream(resourceCache.getResourceInputStream(file), md5);
            IOUtils.toByteArray(IS);
            return new BigInteger(1,md5.digest()).toString(16);
        }
        return null;
    }
    
    public String getHash(String hackId, HackResource hackResource) throws IOException {
        File resourceFile =  getResourceFile(hackId, hackResource);
        return hashLookup.get(resourceFile.getCanonicalPath()); 
    }
    
    public InputStream getInputStreamForHash(String hash) throws FileNotFoundException, IOException {
        File file = fileLookup.get(hash);
        return resourceCache.getResourceInputStream(file);
    }
    
    public HackResource getHackResourceForHash(String hash) {
        return resourceLookup.get(hash);
    }
    
    public HashMap<String, String> getResourceUrlMap(String hackId) {
        return urlLookup.get(hackId);
    }
    
    public String translateResourceShorthand(String snippetSource) {
        Matcher m = shorthandPattern.matcher(snippetSource);
        return m.replaceAll("\\${resources.get('$1')}");
    }
    
}
