package org.oscelot.jshack.ws;

import org.apache.commons.io.IOUtils;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;

@Path("tempfiles")
public class TempFilesResource {

    @POST
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Produces(MediaType.TEXT_PLAIN)
    public String createTempFile(InputStream is) throws IOException {

        File tempFile;
        OutputStream os = null;
        try {
        tempFile = File.createTempFile("jshack","");

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

        //todo: highly unlikely to remain as getAbsolutePath()
        return tempFile.getAbsolutePath();
    }

}
