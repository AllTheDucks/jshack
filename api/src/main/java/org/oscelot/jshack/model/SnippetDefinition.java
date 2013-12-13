package org.oscelot.jshack.model;

import java.util.List;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class SnippetDefinition {
    
    private String identifier;
    private List<String> hooks;
    private List<Restriction> restrictions;
    private String source;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public List<Restriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(List<Restriction> restrictions) {
        this.restrictions = restrictions;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public List<String> getHooks() {
        return hooks;
    }

    public void setHooks(List<String> hooks) {
        this.hooks = hooks;
    }
    
    
}
