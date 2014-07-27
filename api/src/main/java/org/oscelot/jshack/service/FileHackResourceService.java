package org.oscelot.jshack.service;

import org.apache.commons.io.FileUtils;
import org.oscelot.jshack.exceptions.HackPersistenceException;
import org.oscelot.jshack.resources.HackResource;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.*;

/**
 * Created by wiley on 18/05/14.
 */
@Service
public class FileHackResourceService implements HackResourceService {

    @Inject
    private TempFileService tempFileService;

    @Inject
    private JSHackDirectoryFactory directoryFactory;

    @Override
    public void persistResource(String hackId, HackResource resource) {
        File resourceDir = directoryFactory.getAndCreateHackResourceDir(hackId);
        File resFile = new File(resourceDir, resource.getPath());

        String content = resource.getContent();
        String tempFileName = resource.getTempFileName();

        if (content != null && (tempFileName == null || tempFileName.trim().isEmpty())) {
            try {
                FileOutputStream os = new FileOutputStream(resFile);
                os.write(resource.getContent().getBytes("UTF-8"));
                os.close();
            } catch (UnsupportedEncodingException ex) {
                throw new HackPersistenceException(ex);
            } catch (IOException ex) {
                throw new HackPersistenceException(ex);
            }
        } else if (content == null && !(tempFileName == null || tempFileName.trim().isEmpty())) {
            File tempFile = new File(directoryFactory.getAndCreateTempDir(), tempFileName);
            try {
                FileUtils.moveFile(tempFile, resFile);
            } catch (IOException ex) {
                throw new HackPersistenceException(ex);
            }
        } else if (content == null && (tempFileName == null || tempFileName.trim().isEmpty())) {
            throw new HackPersistenceException("Client tried to persist a file with neither content or tempFileName set.");
        } else if (content != null && !(tempFileName == null || tempFileName.trim().isEmpty())) {
            throw new HackPersistenceException("Client tried to persist a file with both content and tempFileName set.");
        }


    }

    public TempFileService getTempFileService() {
        return tempFileService;
    }

    public void setTempFileService(TempFileService tempFileService) {
        this.tempFileService = tempFileService;
    }

    public JSHackDirectoryFactory getDirectoryFactory() {
        return directoryFactory;
    }

    public void setDirectoryFactory(JSHackDirectoryFactory directoryFactory) {
        this.directoryFactory = directoryFactory;
    }
}
