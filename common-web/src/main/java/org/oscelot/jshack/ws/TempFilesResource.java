package org.oscelot.jshack.ws;

import org.apache.commons.io.IOUtils;
import org.oscelot.jshack.service.JSHackDirectoryFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;

@Path("tempfiles")
public class TempFilesResource {

    @Inject
    public JSHackDirectoryFactory directoryFactory;

    @POST
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Produces(MediaType.TEXT_PLAIN)
    public String createTempFile(InputStream is) throws IOException {

        File tempFile;
        OutputStream os = null;
        try {
        tempFile = File.createTempFile("upload", "", directoryFactory.getAndCreateTempDir());

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

}
