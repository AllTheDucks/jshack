package org.oscelot.jshack.service;

import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by shane on 11/02/14.
 */
public class TempFileServletContextListener implements ServletContextListener {

    @Inject
    private TempFileService tempFileService;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        WebApplicationContextUtils
                .getRequiredWebApplicationContext(sce.getServletContext())
                .getAutowireCapableBeanFactory()
                .autowireBean(this);

        if(tempFileService != null) {
            tempFileService.cleanupOldTempFiles();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if(tempFileService != null) {
            tempFileService.cleanupOldTempFiles();
        }
    }
}
