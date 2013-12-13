/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class CentralConfig {
    
    private List<String> enabledPackages;
    private int resourcesMaxCacheableBytes;

    public List<String> getEnabledPackages() {
        return enabledPackages;
    }

    public void setEnabledPackages(List<String> availablePackages) {
        this.enabledPackages = availablePackages;
    }
    
    public boolean isPackageEnabled(String identifier) {
        if(enabledPackages == null) {
            return false;
        }
        return enabledPackages.contains(identifier);
    }
    
    public void setPackageDisabled(String identifier) {
        if(isPackageEnabled(identifier)) {
            enabledPackages.remove(identifier);
        }
    }
    
    public void setPackageEnabled(String identifier) {
        if(!isPackageEnabled(identifier)) {
            if(enabledPackages == null) {
                enabledPackages = new ArrayList<String>();
            }
            enabledPackages.add(identifier);
        }
    }

    public int getResourcesMaxCacheableBytes() {
        return resourcesMaxCacheableBytes;
    }

    public void setResourcesMaxCacheableBytes(int resourcesMaxCacheableBytes) {
        this.resourcesMaxCacheableBytes = resourcesMaxCacheableBytes;
    }
    
    
}
