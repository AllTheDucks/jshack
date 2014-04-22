package org.oscelot.jshack.service;

import org.oscelot.jshack.exceptions.HackNotFoundException;
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
public class FileHackStreamFactory implements HackStreamFactory {

    public static final String METADATA_FILENAME = "hack.xml";

    @Inject
    public JSHackDirectoryFactory directoryFactory;

    @Override
    public InputStream getHackXMLInputStream(String hackId) {
        File hackMetadataFile = new File(directoryFactory.getHackDir(hackId), METADATA_FILENAME);

        try {
            return new FileInputStream(hackMetadataFile);
        } catch (FileNotFoundException e) {
            throw new HackNotFoundException(e);
        }
    }
    @Override
    public OutputStream getHackXMLOutputStream(String hackId) {
        File hackMetadataFile = new File(directoryFactory.getAndCreateHackDir(hackId), METADATA_FILENAME);

        try {
            return new FileOutputStream(hackMetadataFile);
        } catch (FileNotFoundException e) {
            throw new HackNotFoundException(e);
        }
    }

    @Override
    public InputStream getHackResourceInputStream(String hackId, String resourceName) {
        throw new RuntimeException("Not Implemented");
    }
    @Override
    public OutputStream getHackResourceOutputStream(String hackId, String resourceName) {
        throw new RuntimeException("Not Implemented");
    }

    @Override
    public InputStream getHackConfigInputStream(String hackId) {
        throw new RuntimeException("Not Implemented");
    }
    @Override
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
