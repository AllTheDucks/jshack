package org.oscelot.jshack.service;

import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.io.File;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 8/12/13
 * Time: 7:29 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class JSHackTestDirectoryFactory extends JSHackDirectoryFactory {

    private String rootConfigDirPath;

    @Override
    public File getRootConfigDir() {
        File rootConfigDir = new File(rootConfigDirPath);
        rootConfigDir.mkdirs();
        return rootConfigDir;
    }

    public String getRootConfigDirPath() {
        return rootConfigDirPath;
    }

    public void setRootConfigDirPath(String rootConfigDirPath) {
        this.rootConfigDirPath = rootConfigDirPath;
    }
}
