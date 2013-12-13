/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model;

import java.util.List;
import org.oscelot.jshack.RestrictionCompiler;
import org.oscelot.jshack.model.restrictions.CompiledRestriction;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class Snippet {
    
    private SnippetDefinition snippetDefinition;
    private HackInstance hackInstance;
    private List<CompiledRestriction> compiledRestrictions;
    
    public Snippet() {
    }
    public Snippet(HackInstance hackInstance, SnippetDefinition snippetDefinition) {
        this.setHackInstance(hackInstance);
        this.setSnippetDefinition(snippetDefinition);
    }

    public SnippetDefinition getSnippetDefinition() {
        return snippetDefinition;
    }

    public final void setSnippetDefinition(SnippetDefinition snippetDefinition) {
        this.snippetDefinition = snippetDefinition;
        this.setCompiledRestrictions(RestrictionCompiler.compileRestrictions(snippetDefinition.getRestrictions()));
    }

    public List<CompiledRestriction> getCompiledRestrictions() {
        return compiledRestrictions;
    }

    public void setCompiledRestrictions(List<CompiledRestriction> compiledRestrictions) {
        this.compiledRestrictions = compiledRestrictions;
    }

    public HackInstance getHackInstance() {
        return hackInstance;
    }

    public final void setHackInstance(HackInstance hackInstance) {
        this.hackInstance = hackInstance;
    }
    
}
