package org.oscelot.jshack.service;

import java.io.File;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 8/12/13
 * Time: 7:26 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class JSHackDirectoryFactory {

    public static final String HACKS_DIR_NAME = "hacks";
    public static final String WORKING_DIR_NAME = "working";
    public static final String ARCHIVE_DIR_NAME = "archive";
    public static final String CONFIG_DIR_NAME = "config";

    public abstract File getRootConfigDir();

    public File getHacksDir() {
        return getOrCreateRootSubDir(HACKS_DIR_NAME);
    }

    public File getWorkingDir() {
        return getOrCreateRootSubDir(WORKING_DIR_NAME);
    }

    public File getArchiveDir() {
        return getOrCreateRootSubDir(ARCHIVE_DIR_NAME);
    }

    public File getConfigDir() {
        return getOrCreateRootSubDir(CONFIG_DIR_NAME);
    }

    private File getOrCreateRootSubDir(String subDirName) {
        File hacksDir = new File(getRootConfigDir(), subDirName);
        if(!hacksDir.exists()) {
            hacksDir.mkdir();
        } else if (!hacksDir.isDirectory())  {
            throw new RuntimeException(String.format("Expected a directory, but got a file. (%s)", hacksDir.getAbsolutePath()));
        }
        return hacksDir;
    }

}
