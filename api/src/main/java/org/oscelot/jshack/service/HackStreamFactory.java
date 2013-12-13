package org.oscelot.jshack.service;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 29/11/13
 * Time: 8:13 AM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class HackStreamFactory {

    public static final String METADATA_FILENAME = "hack.xml";

    @Inject
    public JSHackDirectoryFactory directoryFactory;

    public InputStream getHackMetadataInputStream(String hackId) throws FileNotFoundException {
        File hackDir = new File(directoryFactory.getHacksDir(), hackId);
        File hackMetadataFile = new File(hackDir, METADATA_FILENAME);

        return new FileInputStream(hackMetadataFile);
    }
    public OutputStream getHackMetadataOutputStream(String hackId) {
        throw new RuntimeException("Not Implemented");
    }

    public InputStream getHackResourceInputStream(String hackId, String resourceName) {
        throw new RuntimeException("Not Implemented");
    }
    public OutputStream getHackResourceOutputStream(String hackId, String resourceName) {
        throw new RuntimeException("Not Implemented");
    }

    public InputStream getHackConfigInputStream(String hackId) {
        throw new RuntimeException("Not Implemented");
    }
    public OutputStream getHackConfigOutputStream(String hackId) {
        throw new RuntimeException("Not Implemented");
    }

    public JSHackDirectoryFactory getDirectoryFactory() {
        return directoryFactory;
    }

    public void setDirectoryFactory(JSHackDirectoryFactory directoryFactory) {
        this.directoryFactory = directoryFactory;
    }
}
