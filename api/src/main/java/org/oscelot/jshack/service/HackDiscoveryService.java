package org.oscelot.jshack.service;

import org.oscelot.jshack.model.Hack;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 29/11/13
 * Time: 8:15 AM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class HackDiscoveryService {

    @Inject
    JSHackDirectoryFactory directoryFactory;

    public List<String> enumerateHackIds() {
        File hacksDir = directoryFactory.getHacksDir();
        File[] files = hacksDir.listFiles();

        ArrayList<String> hackIds = new ArrayList<String>();

        for (File file : files) {
            if (file.isDirectory() && !file.getName().startsWith(".")) {
                hackIds.add(file.getName());
            }
        }
        return hackIds;
    }

    public JSHackDirectoryFactory getDirectoryFactory() {
        return directoryFactory;
    }

    public void setDirectoryFactory(JSHackDirectoryFactory directoryFactory) {
        this.directoryFactory = directoryFactory;
    }
}
