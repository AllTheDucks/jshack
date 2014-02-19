package org.oscelot.jshack.service;

import org.apache.commons.io.FileUtils;

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
    public static final String TEMP_DIR_NAME = "temp";
    public static final String ARCHIVE_DIR_NAME = "archive";
    public static final String CONFIG_DIR_NAME = "config";

    public abstract File getRootConfigDir();

    public File getAndCreateHacksDir() {
        return getOrCreateSubDir(HACKS_DIR_NAME, getRootConfigDir());
    }

    public File getAndCreateWorkingDir() {
        return getOrCreateSubDir(WORKING_DIR_NAME, getRootConfigDir());
    }

    public File getAndCreateArchiveDir() {
        return getOrCreateSubDir(ARCHIVE_DIR_NAME, getRootConfigDir());
    }

    public File getAndCreateConfigDir() {
        return getOrCreateSubDir(CONFIG_DIR_NAME, getRootConfigDir());
    }

    public File getAndCreateHackDir(String hackId) {
        return getOrCreateSubDir(hackId, getAndCreateHacksDir());
    }

    public File getHackDir(String hackId) {
        return new File(this.getAndCreateHacksDir(), hackId);
    }

    public File getAndCreateTempDir() {
        return getOrCreateSubDir(TEMP_DIR_NAME, getRootConfigDir());
    }

    public static File getOrCreateSubDir(String subDirName, File parent) {
        File dir = new File(parent, subDirName);
        if(!dir.exists()) {
            dir.mkdir();
        } else if (!dir.isDirectory())  {
            throw new RuntimeException(String.format("Expected a directory, but got a file. (%s)", dir.getAbsolutePath()));
        }
        return dir;
    }

}
