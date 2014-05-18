package org.oscelot.jshack.service;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.exceptions.HackPersistenceException;
import org.oscelot.jshack.resources.HackResource;

import java.io.File;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;

/**
 * Created by wiley on 18/05/14.
 */
public class FileHackResourceServiceTest {

    private FileHackResourceService resourceService;
    private TempFileService tempFileService;
    JSHackDirectoryFactory directoryFactory;

    @Before
    public void setup() {
        tempFileService = mock(TempFileService.class);
        resourceService = new FileHackResourceService();

        resourceService.setTempFileService(tempFileService);
        directoryFactory = new JSHackDirectoryFactory() {
            @Override
            public File getRootConfigDir() {
                File root = new File("build/test/FileHackResourceServiceTest");
                return root;
            }
        };
        cleanup();
        directoryFactory.getRootConfigDir().mkdirs();

        resourceService.setDirectoryFactory(directoryFactory);

    }

    @After
    public void tearDown() {
        cleanup();
    }


    @Test
    public void persistResource_withTextContent_savesSuccessfully() throws Exception {
        String hackId = "FHRST001";
        HackResource resource = new HackResource();
        resource.setMime("application/javascript");
        resource.setContent("window.console.log('Hello World');");
        resource.setPath("test.js");

        resourceService.persistResource(hackId, resource);

        assertTrue(resourceFileExists(hackId, "test.js"));
        assertEquals(getResourceFileContents(hackId, "test.js"), "window.console.log('Hello World');");
    }

    @Test
    public void persistResource_withTempFile_savesSuccessfully() throws Exception {
        String hackId = "FHRST002";
        File srcFile = new File("api/src/test/resources/alltheduck.svg");
        File tmpFile = new File(directoryFactory.getAndCreateTempDir(),"persistResource_withTempFile_savesSuccessfully.svg");
        FileUtils.copyFile(srcFile, tmpFile);
        HackResource resource = new HackResource();
        resource.setMime("image/svg");
        resource.setContent(null);
        resource.setTempFileName(tmpFile.getName());
        resource.setPath("test.svg");

        resourceService.persistResource(hackId, resource);

        assertTrue(resourceFileExists(hackId, "test.svg"));
    }

    @Test(expected = HackPersistenceException.class)
    public void persistResource_withBothTempFileAndTextContent_throwsException() throws Exception {
        String hackId = "FHRST003";
        HackResource resource = new HackResource();
        resource.setMime("application/javascript");
        resource.setContent("asdfg");
        resource.setTempFileName("12345");
        resource.setPath("test.js");

        resourceService.persistResource(hackId, resource);
    }

    @Test(expected = HackPersistenceException.class)
    public void persistResource_withNeitherTempFileAndTextContent_throwsException() throws Exception {
        String hackId = "FHRST004";
        HackResource resource = new HackResource();
        resource.setMime("application/javascript");
        resource.setContent(null);
        resource.setTempFileName(null);
        resource.setPath("test.js");

        resourceService.persistResource(hackId, resource);
    }

    @Test(expected = HackPersistenceException.class)
    public void persistResource_withEmptyTempFileAndNullTextContent_throwsException() throws Exception {
        String hackId = "FHRST005";
        HackResource resource = new HackResource();
        resource.setMime("application/javascript");
        resource.setContent(null);
        resource.setTempFileName("    ");
        resource.setPath("test.js");

        resourceService.persistResource(hackId, resource);
    }

    @Test
    public void persistResource_withTextContentAndEmptyTempFileName_savesSuccessfully() throws Exception {
        String hackId = "FHRST006";
        HackResource resource = new HackResource();
        resource.setMime("application/javascript");
        resource.setContent("window.console.log('Hello World');");
        resource.setTempFileName("  ");
        resource.setPath("test.js");

        resourceService.persistResource(hackId, resource);

        assertTrue(resourceFileExists(hackId, "test.js"));
        assertEquals(getResourceFileContents(hackId, "test.js"), "window.console.log('Hello World');");
    }



    private boolean resourceFileExists(String hackId, String filename) {
        File resFile = new File(directoryFactory.getAndCreateHackResourceDir(hackId), filename);
        return resFile.exists();
    }

    private String getResourceFileContents(String hackId, String filename) throws Exception {
        File resFile = new File(directoryFactory.getAndCreateHackResourceDir(hackId), filename);
        return FileUtils.readFileToString(resFile, "UTF-8");
    }

    private void cleanup() {
        FileUtils.deleteQuietly(directoryFactory.getRootConfigDir());
    }

}
