package org.oscelot.jshack.servlets;

import org.apache.commons.io.IOUtils;
import org.oscelot.jshack.service.TempFileService;
import org.springframework.stereotype.Component;
import org.springframework.web.HttpRequestHandler;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created with IntelliJ IDEA.
 * User: sargo
 * Date: 24/01/14
 * Time: 10:46 AM
 */
@Component("TempFileServlet")
public class TempFileServlet implements HttpRequestHandler {

    @Inject
    private TempFileService tempFileService;

    @Override
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String pathInfo = request.getPathInfo();
        String[] pathSegments = pathInfo.substring(1).split("/", 2);
        String filename = pathSegments[0];

        InputStream is = null;
        try {
            response.setContentType(tempFileService.getContentTypeFromTempFileName(filename));
            is = tempFileService.getTempFileInputStream(filename);
            IOUtils.copy(is, response.getOutputStream());
        } catch(Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } finally {
            if(is != null) {
                is.close();
            }
        }
    }

}
