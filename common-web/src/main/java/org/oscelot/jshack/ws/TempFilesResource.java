package org.oscelot.jshack.ws;

import org.oscelot.jshack.model.FileGroup;
import org.oscelot.jshack.service.TempFileService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;

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

    @DELETE
    @Consumes("application/json")
    public void deleteTempFile(FileGroup fileGroup) {
        for(String file : fileGroup.getFilenames()) {
            tempFileService.deleteTempFile(file);
        }
    }

}
