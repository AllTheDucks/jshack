package org.oscelot.jshack.model;

import org.oscelot.jshack.resources.HackResource;
import java.util.Date;
import java.util.List;

/**
 *
 * @author sargo
 */
public class Hack {
 
    private String name;
    private String identifier;
    private String description;
    private String version;
    private String targetVersionMin;
    private String targetVersionMax;
    private String developerName;
    private String developerInstitution;
    private String developerURL;
    private String developerEmail;
    private List<ConfigEntryDefinition> configEntryDefinitions;
    private List<HackResource> resources;
    private String source;
    private Date lastUpdated;
    private List<SnippetDefinition> snippetDefinitions;
    
    public Hack() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTargetVersionMin() {
        return targetVersionMin;
    }

    public void setTargetVersionMin(String targetVersionMin) {
        this.targetVersionMin = targetVersionMin;
    }

    public String getTargetVersionMax() {
        return targetVersionMax;
    }

    public void setTargetVersionMax(String targetVersionMax) {
        this.targetVersionMax = targetVersionMax;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    /**
     * @return the lastUpdated
     */
    public Date getLastUpdated() {
        return lastUpdated;
    }

    /**
     * @param lastUpdated the lastUpdated to set
     */
    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getDeveloperName() {
        return developerName;
    }

    public void setDeveloperName(String developerName) {
        this.developerName = developerName;
    }

    public String getDeveloperURL() {
        return developerURL;
    }

    public void setDeveloperURL(String developerURL) {
        this.developerURL = developerURL;
    }

    public String getDeveloperEmail() {
        return developerEmail;
    }

    public void setDeveloperEmail(String developerEmail) {
        this.developerEmail = developerEmail;
    }

    public String getDeveloperInstitution() {
        return developerInstitution;
    }

    public void setDeveloperInstitution(String developerInstitution) {
        this.developerInstitution = developerInstitution;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public List<ConfigEntryDefinition> getConfigEntryDefinitions() {
        return configEntryDefinitions;
    }

    public void setConfigEntryDefinitions(List<ConfigEntryDefinition> configEntryDefinitions) {
        this.configEntryDefinitions = configEntryDefinitions;
    }

    public List<HackResource> getResources() {
        return resources;
    }

    public void setResources(List<HackResource> resources) {
        this.resources = resources;
    }

    public List<SnippetDefinition> getSnippetDefinitions() {
        return snippetDefinitions;
    }

    public void setSnippetDefinitions(List<SnippetDefinition> snippetDefinitions) {
        this.snippetDefinitions = snippetDefinitions;
    }
}
