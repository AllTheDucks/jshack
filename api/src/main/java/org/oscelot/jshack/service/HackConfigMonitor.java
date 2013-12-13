package org.oscelot.jshack.service;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.WatchService;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 7/12/13
 * Time: 9:34 PM
 * To change this template use File | Settings | File Templates.
 */
public class HackConfigMonitor {

    public void monitor() throws IOException {
        WatchService watchService = FileSystems.getDefault().newWatchService();

//        watchService.
    }
}
