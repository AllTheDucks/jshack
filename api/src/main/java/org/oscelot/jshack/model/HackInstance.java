/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.oscelot.jshack.exceptions.PackageManagementException;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class HackInstance {

    private Hack hack;
    private List<ConfigEntry> configEntries;
    private Map<String, String> configEntriesValuesIncludingDefaultsMapCache;
    private Map<String, String> configEntriesValuesExcludingDefaultsMapCache;
    private boolean hasConfig;
    private boolean enabled;
    private List<Snippet> snippets;

    public Hack getHack() {
        return hack;
    }

    public void setHack(Hack hack) {
        this.hack = hack;
        if (hack.getSnippetDefinitions() != null) {
            snippets = new ArrayList<Snippet>(hack.getSnippetDefinitions().size());
            for (SnippetDefinition snippetDefinition : hack.getSnippetDefinitions()) {
                snippets.add(new Snippet(this, snippetDefinition));
            }
        }
        if (hack.getResources() != null) {
            
        }
        clearConfigEntryCache();
    }

    public List<ConfigEntry> getConfigEntries() {
        return configEntries;
    }

    public void setConfigEntries(List<ConfigEntry> configEntries) {
        this.configEntries = configEntries;
        clearConfigEntryCache();
    }

    public Map<String, String> getConfigEntriesMap() throws Exception {
        reloadConfigEntriesMapsIfRequired();
        return configEntriesValuesIncludingDefaultsMapCache;
    }

    public Map<String, String> getConfigEntriesMapExcludingDefaults() throws Exception {
        reloadConfigEntriesMapsIfRequired();
        return configEntriesValuesExcludingDefaultsMapCache;
    }

    public boolean getHasConfig() throws PackageManagementException {
        reloadConfigEntriesMapsIfRequired();
        return hasConfig;
    }

    private boolean requiresConfigMapReload() {
        return configEntriesValuesIncludingDefaultsMapCache == null || configEntriesValuesExcludingDefaultsMapCache == null;
    }

    private void reloadConfigEntriesMapsIfRequired() throws PackageManagementException {
        if(requiresConfigMapReload()) {
            synchronized (this) {
                if(requiresConfigMapReload()) {
                    reloadConfigEntries();
                }
            }
        }
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void clearConfigEntryCache() {
        configEntriesValuesIncludingDefaultsMapCache = null;
        configEntriesValuesExcludingDefaultsMapCache = null;
    }

    public List<Snippet> getSnippets() {
        return snippets;
    }

    private void reloadConfigEntries() throws PackageManagementException {
        if(hack == null) {
            throw new PackageManagementException("Cannot retrieve config entries map without first setting a hack package definition.");
        }
        HashMap<String,String> newConfigEntriesValuesIncludingDefaultsMapCache = new HashMap<String,String>();
        HashMap<String,String> newConfigEntriesValuesExcludingDefaultsMapCache = new HashMap<String,String>();
        hasConfig = false;

        for(ConfigEntryDefinition def : hack.getConfigEntryDefinitions()) {
            String value = null;
            if(configEntries != null) {
                for(ConfigEntry entry : configEntries) {
                    if(entry.getIdentifier().equalsIgnoreCase(def.getIdentifier())) {
                        value = entry.getValue();
                        break;
                    }
                }
            }
            if(value != null) {
                newConfigEntriesValuesExcludingDefaultsMapCache.put(def.getIdentifier(), value);
                hasConfig = true;
            } else {
                value = def.getDefaultValue();
            }
            newConfigEntriesValuesIncludingDefaultsMapCache.put(def.getIdentifier(), value);
        }
        
        configEntriesValuesIncludingDefaultsMapCache = newConfigEntriesValuesIncludingDefaultsMapCache;
        configEntriesValuesExcludingDefaultsMapCache = newConfigEntriesValuesExcludingDefaultsMapCache;
    }
    
    
}
