package org.oscelot.jshack.service;

import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 7/12/13
 * Time: 12:01 AM
 * To change this template use File | Settings | File Templates.
 */
public class HackStreamFactoryTest {

    private HackStreamFactory streamFactory;
    private JSHackDirectoryFactory directoryFactory;

    @Before
    public void setup() {
        streamFactory = new HackStreamFactory();
        directoryFactory = mock(JSHackDirectoryFactory.class);

        streamFactory.setDirectoryFactory(directoryFactory);
    }

    @Test(expected = FileNotFoundException.class)
    public void getHackMetadataInputStream_withMissingFile_throwsException() throws Exception {
        streamFactory.getHackMetadataInputStream("NOHACK");
    }

    @Test
    public void getHackMetadataInputStream_validFile_returnsStream() throws Exception {
        when(directoryFactory.getHacksDir()).thenReturn(new File("api/src/test/data/singlehack"));
        InputStream in = streamFactory.getHackMetadataInputStream("hackstreamtest");
        in.read();
        in.close();
    }
}
