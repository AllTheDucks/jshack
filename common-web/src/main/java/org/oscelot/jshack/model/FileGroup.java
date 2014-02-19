package org.oscelot.jshack.model;

/**
 * Jersey will not decode a array of strings directly, therefore it needs to be
 * contained in a model, thus:
 */
public class FileGroup {

    private String[] filenames;

    public String[] getFilenames() {
        return filenames;
    }

    public void setFilenames(String[] filenames) {
        this.filenames = filenames;
    }

}
