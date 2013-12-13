package org.oscelot.jshack.model;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class ConfigEntryDefinition {
    
    private String identifier;
    private String name;
    private String description;
    protected String defaultValue;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }
    
}
