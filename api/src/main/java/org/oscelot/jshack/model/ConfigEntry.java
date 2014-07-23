/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class ConfigEntry {
    
    protected String identifier;
    protected String value;

    public ConfigEntry(String identifier, String value) {
        this.identifier = identifier;
        this.value = value;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
    
}
