/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack;

import blackboard.platform.context.Context;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.converters.collections.CollectionConverter;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.thoughtworks.xstream.mapper.ClassAliasingMapper;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.io.FileUtils;
import org.oscelot.jshack.model.*;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.restrictions.CompiledRestriction;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.resources.ResourceManager;
import org.oscelot.jshack.resources.ResourceManagerFactory;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class JSHackManager {

    public static final String HACKPACKAGE_FILENAME = "hack.xml";
    public static final String SNIPPET_DIRECTORY = "snippets";
    public static final String SNIPPET_FILE_EXTENTION = ".html";
    private File hacksRoot;
    private File workingDirectory;
    private File archiveDirectory;
    private File configDirectory;
    private File centralConfigFile;
    private CentralConfig centralConfig;
    private Date lastPackageReload;
    private Date lastConfigReload;
    private volatile List<HackInstance> hackInstances;
    private HashMap<String, List<Snippet>> hookMap;

    public List<Snippet> getMatchingSnippets(String key, Context context) throws IOException {
        List<Snippet> snippets = getSnippetsForHook(key);

        if (snippets == null) {
            return null;
        }

        List<Snippet> matchingSnippets = new ArrayList<Snippet>();

        for (Snippet s : snippets) {

            // Check all restrictions
            boolean passedRestrictions = true;
            for (CompiledRestriction cr : s.getCompiledRestrictions()) {
                passedRestrictions &= cr.test(context) ^ cr.isInverse();
                if (!passedRestrictions) {
                    break;
                }
            }

            if (passedRestrictions) {
                matchingSnippets.add(s);
            }
        }

        return matchingSnippets;
    }

    public List<HackInstance> loadHackPackages() throws IOException {
        ResourceManagerFactory.voidResourceManager();

        ArrayList<HackInstance> reloadedPackages = new ArrayList<HackInstance>();
        hookMap = new HashMap<String, List<Snippet>>();

        String children[] = hacksRoot.list();
        for (String childPath : children) {
            File child = new File(hacksRoot, childPath);
            if (!child.isDirectory()) {
                continue;
            }
            File packageManifest = new File(child, HACKPACKAGE_FILENAME);
            File snippetDirectory = new File(child, SNIPPET_DIRECTORY);
            if (packageManifest.exists()) {
                XStream xstream = getHackPackageXstream();
                Hack hack = (Hack) xstream.fromXML(packageManifest);

                HackInstance hackInstance = new HackInstance();
                hackInstance.setHack(hack);
                hackInstance.setEnabled(this.getCentralConfig().isPackageEnabled(hack.getIdentifier()));
                hackInstance.setConfigEntries(loadHackConfigEntries(childPath));

                reloadedPackages.add(hackInstance);

                ResourceManager resourceManager = ResourceManagerFactory.getResourceManager();
                resourceManager.registerHackPackage(hackInstance);

                if (snippetDirectory.exists()) {
                    for (Snippet snippet : hackInstance.getSnippets()) {
                        File snippetFile = new File(snippetDirectory, snippet.getSnippetDefinition().getIdentifier() + SNIPPET_FILE_EXTENTION);
                        snippet.getSnippetDefinition().setSource(FileUtils.readFileToString(snippetFile, "UTF-8"));

                        if (hackInstance.isEnabled()) {
                            for (String hook : snippet.getSnippetDefinition().getHooks()) {
                                List<Snippet> HookSpecificList;
                                if (hookMap.containsKey(hook)) {
                                    HookSpecificList = hookMap.get(hook);
                                } else {
                                    HookSpecificList = new ArrayList<Snippet>();
                                    hookMap.put(hook, HookSpecificList);
                                }
                                HookSpecificList.add(snippet);
                            }
                        }
                    }
                }
            }
        }
        hackInstances = reloadedPackages;
        lastPackageReload = new Date();
        return reloadedPackages;
    }

    public List<ConfigEntry> loadHackConfigEntries(String identifier) throws FileNotFoundException, IOException {
        FileInputStream configEntriesFileIS = null;
        try {
            File configEntriesFile = getConfigEntriesFile(identifier);
            if (configEntriesFile.exists()) {
                configEntriesFileIS = new FileInputStream(configEntriesFile);
                return parseConfigFile(configEntriesFileIS);
            } else {
                return null;
            }
        } finally {
            if (configEntriesFileIS != null) {
                configEntriesFileIS.close();
            }
        }
    }

    public List<ConfigEntry> parseConfigFile(InputStream configEntriesIS) {
        XStream configEntriesXstream = getConfigEntriesXstream();
        return (List<ConfigEntry>) configEntriesXstream.fromXML(configEntriesIS);
    }

    /**
     * @return the hacksRoot
     */
    public File getHacksRoot() {
        return hacksRoot;
    }

    /**
     * @param hacksRoot the hacksRoot to set
     */
    public void setHacksRoot(File hacksRoot) {
        this.hacksRoot = hacksRoot;
    }

    /**
     * Finds the HackInstance with matching ID, and returns it, otherwise returns
     * null
     *
     * @param hackId
     * @return
     */
    public HackInstance getHackPackageById(String hackId) throws IOException {
        for (HackInstance hackInstance : getAllHackPackages()) {
            if (hackInstance.getHack().getIdentifier().equals(hackId)) {
                return hackInstance;
            }
        }
        return null;
    }

    public void persistHackPackage(Hack hack) throws IOException {
        File hackDir = new File(hacksRoot, hack.getIdentifier());
        if (!hackDir.exists()) {
            hackDir.mkdir();
        }
        File hackPackageFile = new File(hackDir, HACKPACKAGE_FILENAME);

        File snippetDir = new File(hackDir, SNIPPET_DIRECTORY);
        if (hack.getSnippetDefinitions() != null) {
            for (SnippetDefinition snippetDefinition : hack.getSnippetDefinitions()) {
                File snippetFile = new File(snippetDir, snippetDefinition.getIdentifier() + SNIPPET_FILE_EXTENTION);
                FileUtils.writeStringToFile(snippetFile, snippetDefinition.getSource(), "UTF-8");
            }
        }

        FileOutputStream hackPackageOut = new FileOutputStream(hackPackageFile);
        XStream xstream = getHackPackageXstream();
        xstream.toXML(hack, hackPackageOut);
        hackPackageOut.close();

        flagToReload();
    }

    public void persistCentralConfig() throws IOException {
        FileOutputStream hackConfigOut = new FileOutputStream(this.centralConfigFile);

        XStream xstream = this.getCentralConfigXstream();
        xstream.toXML(this.centralConfig, hackConfigOut);

        hackConfigOut.close();

        this.flagToReload();
    }

    public void persistHackConfigEntires(String identifier, List<ConfigEntry> configEntries) throws IOException {
        File configEntriesFile = getConfigEntriesFile(identifier);
        FileOutputStream configEntriesOut = new FileOutputStream(configEntriesFile);

        XStream xstream = getConfigEntriesXstream();
        xstream.toXML(configEntries, configEntriesOut);

        configEntriesOut.close();

        this.flagToReload();
    }

    public XStream getHackPackageXstream() {
        XStream xstream = new XStream(new DomDriver("UTF-8"));
        xstream.alias("hackPackageDefinition", Hack.class);

        ClassAliasingMapper mapper = new ClassAliasingMapper(xstream.getMapper());
        mapper.addClassAlias("pattern", String.class);
        xstream.registerLocalConverter(Hack.class, "urlPatterns", new CollectionConverter(mapper));

        xstream.alias("restriction", Restriction.class);
        xstream.aliasField("restrictions", Hack.class, "restrictions");

        xstream.alias("configEntryDefinition", ConfigEntryDefinition.class);
        xstream.aliasField("configEntryDefinitions", Hack.class, "configEntryDefinitions");

        xstream.alias("snippetDefinition", SnippetDefinition.class);
        xstream.aliasField("snippetDefinitions", Hack.class, "snippetDefinitions");
        xstream.omitField(SnippetDefinition.class, "source");

        xstream.alias("hook", String.class);
        xstream.aliasField("hooks", Hack.class, "hooks");

        xstream.omitField(Hack.class, "enabled");

        xstream.alias("resource", HackResource.class);
        xstream.omitField(HackResource.class, "tempFileName");

        return xstream;
    }

    public XStream getConfigEntriesXstream() {
        XStream xstream = new XStream(new DomDriver("UTF-8"));
        xstream.alias("configEntries", List.class);

        ClassAliasingMapper mapper = new ClassAliasingMapper(xstream.getMapper());
        mapper.addClassAlias("configEntry", ConfigEntry.class);
        xstream.registerConverter(new CollectionConverter(mapper));

        return xstream;
    }

    public XStream getCentralConfigXstream() {
        XStream xstream = new XStream(new DomDriver("UTF-8"));
        xstream.alias("hackconfig", CentralConfig.class);

        ClassAliasingMapper mapper = new ClassAliasingMapper(xstream.getMapper());
        mapper.addClassAlias("package", String.class);
        xstream.registerLocalConverter(CentralConfig.class, "enabledPackages", new CollectionConverter(mapper));

        return xstream;
    }

    public List<HackInstance> getAllHackPackages() throws IOException {
        reloadHackPackagesIfRequired();
        return hackInstances;
    }

    public List<Snippet> getSnippetsForHook(String hookKey) throws IOException {
        reloadHackPackagesIfRequired();
        return hookMap.get(hookKey);
    }

    public File getWorkingDirectory() {
        return workingDirectory;
    }

    public void setWorkingDirectory(File workingDirectory) {
        this.workingDirectory = workingDirectory;
    }

    public void deleteHackPackage(String identifier) throws IOException {
        this.disableHack(identifier);

        File packageDir = new File(getHacksRoot(), identifier);
        File archiveDir = new File(getArchiveDirectory().getPath() + File.separator + identifier + "-" + System.currentTimeMillis());
        if (!archiveDir.exists()) {
            packageDir.renameTo(archiveDir);
        }

        flagToReload();
    }

    public void flagToReload() {
        try {
            FileUtils.touch(centralConfigFile);
        } catch (IOException ex) {
            Logger.getLogger(JSHackManager.class.getName()).log(Level.SEVERE, null, ex);
            throw new RuntimeException("Failed to flag packages for reloading", ex);
        }
    }

    public boolean hackPackagesRequireReloading() {
        return lastPackageReload == null
                || hackInstances == null
                || hookMap == null
                || FileUtils.isFileNewer(centralConfigFile, lastPackageReload);
    }

    public boolean configRequiresReloading() {
        return lastConfigReload == null
                || centralConfig == null
                || FileUtils.isFileNewer(centralConfigFile, lastConfigReload);
    }

    public void reloadHackPackagesIfRequired() throws IOException {
        if (hackPackagesRequireReloading()) {
            synchronized (this) {
                if (hackPackagesRequireReloading()) {
                    loadHackPackages();
                }
            }
        }
    }

    public void reloadConfigIfRequired() throws IOException {
        if (configRequiresReloading()) {
            synchronized (this) {
                if (configRequiresReloading()) {
                    loadCentralConfig();
                }
            }
        }
    }

    public void loadCentralConfig() {
        XStream configXstream = getCentralConfigXstream();
        centralConfig = (CentralConfig) configXstream.fromXML(centralConfigFile);

        lastConfigReload = new Date();
    }

    public File getCentralConfigFile() {
        return centralConfigFile;
    }

    public void setCentralConfigFile(File hackConfigFile) {
        this.centralConfigFile = hackConfigFile;
    }

    public CentralConfig getCentralConfig() throws IOException {
        reloadConfigIfRequired();
        return centralConfig;
    }

    public File getConfigEntriesFile(String identifier) {
        return new File(configDirectory, identifier + ".xml");
    }

    public void enableHack(Hack hackPackage) throws IOException {
        this.enableHack(hackPackage.getIdentifier());
    }

    public void enableHack(String hackPackageIdentifer) throws IOException {
        getCentralConfig().setPackageEnabled(hackPackageIdentifer);
        this.persistCentralConfig();
    }

    public void disableHack(Hack hackPackage) throws IOException {
        this.enableHack(hackPackage.getIdentifier());
    }

    public void disableHack(String hackPackageIdentifer) throws IOException {
        getCentralConfig().setPackageDisabled(hackPackageIdentifer);
        this.persistCentralConfig();
    }

    public File getArchiveDirectory() {
        return archiveDirectory;
    }

    public void setArchiveDirectory(File archiveDirectory) {
        this.archiveDirectory = archiveDirectory;
    }

    public File getConfigDirectory() {
        return configDirectory;
    }

    public void setConfigDirectory(File configDirectory) {
        this.configDirectory = configDirectory;
    }
}
