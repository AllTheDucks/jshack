package org.oscelot.jshack.ws;

import org.apache.commons.io.IOUtils;
import org.oscelot.jshack.service.TempFileService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;

@Path("tempfiles")
public class TempFilesResource {

    @Inject
    public TempFileService tempFileService;

    @POST
    @Consumes(MediaType.WILDCARD)
    @Produces(MediaType.TEXT_PLAIN)
    public String createTempFile(InputStream is, @HeaderParam("Content-Type") String contentType) throws IOException {
        return tempFileService.persistTempFile(is, contentType);
    }

}
