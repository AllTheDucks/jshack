package org.oscelot.jshack.service;

import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created with IntelliJ IDEA.
 * User: shane
 * Date: 11/01/14
 * Time: 9:11 PM
 * To change this template use File | Settings | File Templates.
 */
public interface HackStreamFactory {
    InputStream getHackXMLInputStream(String hackId);

    OutputStream getHackXMLOutputStream(String hackId);

    InputStream getHackResourceInputStream(String hackId, String resourceName);

    OutputStream getHackResourceOutputStream(String hackId, String resourceName);

    InputStream getHackConfigInputStream(String hackId);

    OutputStream getHackConfigOutputStream(String hackId);
}
