package org.oscelot.jshack.service;

import blackboard.platform.plugin.PlugInException;
import blackboard.platform.plugin.PlugInUtil;

import java.io.File;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: shane
 * Date: 8/12/13
 * Time: 7:53 PM
 * To change this template use File | Settings | File Templates.
 */
public class JSHackB2DirectoryFactory extends JSHackDirectoryFactory {

    @Override
    public File getRootConfigDir() {
        File rootConfigDir;
        try {
            //TODO: remove hardcoded vendor id and b2 name
            rootConfigDir = PlugInUtil.getConfigDirectory("oslt", "jshack");
        } catch (PlugInException ex) {
                /* if we get a PluginException, there's nothing we can do
                 * just log it, wrap it, and rethrow it. */
            Logger.getLogger(JSHackB2DirectoryFactory.class.getName()).log(Level.SEVERE, null, ex);
            throw new RuntimeException("Problem while trying to get Building Block Config Directory", ex);
        }
        return rootConfigDir;
    }
}
