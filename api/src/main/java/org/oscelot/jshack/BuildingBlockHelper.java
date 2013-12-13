/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack;

import blackboard.platform.intl.BbResourceBundle;
import blackboard.platform.intl.BundleManager;
import blackboard.platform.intl.BundleManagerFactory;
import blackboard.platform.plugin.PlugIn;
import blackboard.platform.plugin.PlugInManager;
import blackboard.platform.plugin.PlugInManagerFactory;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class BuildingBlockHelper {
    
    public static String VENDOR_ID = "oslt";
    public static String HANDLE = "jshack";
    
    public static String getLocalisationString(String key) {
        PlugInManager pluginMgr = PlugInManagerFactory.getInstance();
        PlugIn plugin = pluginMgr.getPlugIn(BuildingBlockHelper.VENDOR_ID, BuildingBlockHelper.HANDLE);

        BundleManager bm = BundleManagerFactory.getInstance();
        BbResourceBundle bundle = bm.getPluginBundle(plugin.getId());

        return bundle.getStringWithFallback(key, key);
    }
}
