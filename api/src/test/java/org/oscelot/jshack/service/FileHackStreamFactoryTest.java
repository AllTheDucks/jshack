package org.oscelot.jshack.service;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.exceptions.HackNotFoundException;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 7/12/13
 * Time: 12:01 AM
 * To change this template use File | Settings | File Templates.
 */
public class FileHackStreamFactoryTest {

    private FileHackStreamFactory streamFactory;
    private JSHackDirectoryFactory directoryFactory;
    private File deleteFile;
    private OutputStream outputStream;
    private InputStream inputStream;

    @Before
    public void setup() {
        streamFactory = new FileHackStreamFactory();
        directoryFactory = mock(JSHackDirectoryFactory.class);

        streamFactory.setDirectoryFactory(directoryFactory);
    }

    @After
    public void tearDown() throws Exception {
        if(inputStream != null) {
            inputStream.close();
            inputStream = null;
        }
        if(outputStream != null) {
            outputStream.close();
            outputStream = null;
        }
        if(deleteFile != null) {
            if(deleteFile.exists()) {
                deleteFile.delete();
            }
            deleteFile = null;
        }
    }

    @Test(expected = HackNotFoundException.class)
    public void getHackMetadataInputStream_withMissingFile_throwsException() throws Exception {
        when(directoryFactory.getHackDir("NOHACK")).thenReturn(new File("api/src/test/data/NOHACK"));
        streamFactory.getHackXMLInputStream("NOHACK");
    }

    @Test
    public void getHackMetadataInputStream_validFile_returnsStream() throws Exception {
        when(directoryFactory.getHackDir("hackstreamtest")).thenReturn(new File("api/src/test/data/singlehack/hackstreamtest"));
        inputStream = streamFactory.getHackXMLInputStream("hackstreamtest");
        inputStream.read();
    }

    @Test
    public void getHackMetadataOutputStream_withMissingFile_returnsStream() throws Exception {
        when(directoryFactory.getAndCreateHackDir("noHackXml")).thenReturn(new File("api/src/test/data/noHackXml"));

        outputStream = streamFactory.getHackXMLOutputStream("noHackXml");
        assertNotNull(outputStream);
        outputStream.write("hello".getBytes());

        deleteFile = new File("api/src/test/data/noHackXml/hack.xml");
        assertTrue(deleteFile.exists());
    }

}
