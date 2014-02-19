package org.oscelot.jshack.service;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.filefilter.FileFilterUtils;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.*;
import java.util.Collection;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: sargo
 * Date: 24/01/14
 * Time: 9:18 AM
 */
@Service
public class TempFileService {

    @Inject
    private JSHackDirectoryFactory directoryFactory;

    public static final String CONTENT_TYPE_SEPARATOR = "-";
    public static final String UPLOAD_PREFIX = "upload";
    public static final char CONTENT_TYPE_SLASH_REPLACEMENT = '_';
    public static final long MAX_TEMP_FILE_AGE = 28*24*60*60*1000; //28 days

    public String persistTempFile(InputStream is, String contentType) throws IOException {
        File tempFile;
        OutputStream os = null;
        try {
            tempFile = getNewTempFile(contentType);

            os = new FileOutputStream(tempFile);
            IOUtils.copy(is, os);
        } finally {
            if(is!=null) {
                is.close();
            }
            if(os!=null) {
                os.close();
            }
        }

        return tempFile.getName();
    }

    public InputStream getTempFileInputStream(String filename) throws FileNotFoundException {
        File file = new File(directoryFactory.getAndCreateTempDir(), filename);
        return new FileInputStream(file);
    }

    public File getNewTempFile(String contentType) throws IOException {
        return File.createTempFile(UPLOAD_PREFIX,
                CONTENT_TYPE_SEPARATOR + contentType.replace('/', CONTENT_TYPE_SLASH_REPLACEMENT),
                directoryFactory.getAndCreateTempDir());
    }

    public String getContentTypeFromTempFileName(String filename) {
        String contentTypePart = filename.substring(filename.lastIndexOf(CONTENT_TYPE_SEPARATOR) + 1);
        return contentTypePart.replace(CONTENT_TYPE_SLASH_REPLACEMENT, '/');
    }

    public void deleteTempFile(String filename) {
        File file = new File(directoryFactory.getAndCreateTempDir(), filename);
        file.delete();
    }

    public void cleanupOldTempFiles() {
        Date oldestDate = new Date(new Date().getTime() - MAX_TEMP_FILE_AGE);
        Collection<File> files = FileUtils.listFiles(directoryFactory.getAndCreateTempDir(),
                FileFilterUtils.ageFileFilter(oldestDate), null);
        for(File file : files) {
            file.delete();
        }
    }

}
