/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.resources;

import java.io.IOException;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class ResourceManagerFactory {
    
    private static ResourceManager resourceManager;
    
    public static synchronized ResourceManager getResourceManager() throws IOException {
        if(resourceManager == null) {
            resourceManager = new ResourceManager();
        }
        return resourceManager;
    }
    
    public static synchronized void voidResourceManager() {
        resourceManager = null;
    }
    
}
