/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.servlets;

import java.io.IOException;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import org.oscelot.jshack.resources.ResourceManager;
import org.oscelot.jshack.resources.ResourceManagerFactory;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class HackResourceServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String pathInfo = request.getPathInfo();
        String[] pathSegments = pathInfo.substring(1).split("/", 2);
        String hash = pathSegments[0];

        ResourceManager resourceManager = ResourceManagerFactory.getResourceManager();
        InputStream is = null;
        try {
            response.setContentType(resourceManager.getHackResourceForHash(hash).getMime());
            is = resourceManager.getInputStreamForHash(hash);
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
