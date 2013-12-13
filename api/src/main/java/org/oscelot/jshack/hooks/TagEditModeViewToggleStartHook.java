/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.hooks;

/**
 * JSHack Rendering Hook to inject JS before the "Edit Mode Toggle" tag
 * @author Shane Argo
 */
public class TagEditModeViewToggleStartHook extends JSHackRenderingHook {

    @Override
    public String getKey() {
        return "tag.editModeViewToggle.start";
    }
    
}
