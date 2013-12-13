/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.hooks;

/**
 * JSHack Rendering Hook to inject JS into the top of a Learning System Page.
 * @author Shane Argo
 */
public class TagLearningSystemPageStartHook extends JSHackRenderingHook {

    @Override
    public String getKey() {
        return "tag.learningSystemPage.start";
    }
    
}
