/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.resources;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.ref.SoftReference;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.io.FileUtils;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class ResourceCache {
    
    public final static int DEFAULT_MAX_CACHEABLE_BYTES = 5242880; //5MB
    
    private int maximumCacheableBytes;
    private ConcurrentHashMap<String,SoftReference<byte[]>> cache = new ConcurrentHashMap<String,SoftReference<byte[]>>();
    
    public ResourceCache() {
        this(DEFAULT_MAX_CACHEABLE_BYTES);
    }
    
    public ResourceCache(int maxCacheableBytes) {
        this.maximumCacheableBytes = maxCacheableBytes;
    }
    
    public InputStream getResourceInputStream(String path) throws FileNotFoundException, IOException {
        return this.getResourceInputStream(new File(path));
    }
    
    public InputStream getResourceInputStream(File file) throws FileNotFoundException, IOException {
        byte[] cachedData = getCachedData(file.getCanonicalPath());
        
        // Data isn't cached
        if(cachedData == null) {
            FileInputStream fileIS = new FileInputStream(file);
            if(file.length() > maximumCacheableBytes) {
                // File too big, read directly from the file
                return fileIS;
            }

            cachedData = getFileContents(file);
        }
        
        return new ByteArrayInputStream(cachedData);
    }
    
    private byte[] getCachedData(String path) {
        SoftReference<byte[]> cachedDataRef;
        
        // Search for cached data
        cachedDataRef = cache.get(path);
        if(cachedDataRef != null) {
            return cachedDataRef.get();
        }
        return null;
    }
    
    private synchronized byte[] getFileContents(File file) throws IOException {
        byte[] cachedData = getCachedData(file.getCanonicalPath());
        if(cachedData == null) {
            cachedData = FileUtils.readFileToByteArray(file);
            cache.put(file.getCanonicalPath(), new SoftReference<byte[]>(cachedData));
        }
        return cachedData;
    }
    
}
