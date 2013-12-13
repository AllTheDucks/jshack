/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.servlets;

import org.oscelot.jshack.service.HackManager;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @author shane
 */
public class JSHackServletContextListener implements ServletContextListener {

//    @Inject
    private HackManager hackManager;

    public void contextInitialized(ServletContextEvent sce) {
        if (hackManager == null) {
            final WebApplicationContext springContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
            hackManager = (HackManager) springContext.getBean("hackManager");
        }

        hackManager.loadHacks();

    }

    public void contextDestroyed(ServletContextEvent sce) {
        //throw new UnsupportedOperationException("Not supported yet.");
    }

    public HackManager getHackManager() {
        return hackManager;
    }

    public void setHackManager(HackManager hackManager) {
        this.hackManager = hackManager;
    }
}
