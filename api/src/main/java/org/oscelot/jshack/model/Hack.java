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
    private List<Developer> developers;
    private List<ConfigEntryDefinition> configEntryDefinitions;
    private List<HackResource> resources;
    private Date lastUpdated;

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

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
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

    public List<Developer> getDevelopers() { return developers ; }

    public void setDevelopers(List<Developer> developers) { this.developers = developers; }
}
