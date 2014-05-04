package org.oscelot.jshack.stripes;

import net.sourceforge.stripes.action.*;
import net.sourceforge.stripes.integration.spring.SpringBean;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.service.HackDiscoveryService;
import org.oscelot.jshack.service.HackManager;

import java.util.List;

/**
 * Created by wiley on 3/05/14.
 */
public class ListHacksAction implements ActionBean {

    private boolean dev = false;
    private ActionBeanContext context;
    private HackManager hackManager;

    private List<Hack> hacks;

    @DefaultHandler
    public Resolution displayEditor() {
        hackManager.getHacks();
        return new ForwardResolution("/WEB-INF/jsp/listhacks.jsp");
    }

    public ActionBeanContext getContext() {
        return context;
    }

    public void setContext(ActionBeanContext context) {
        this.context = context;
    }

    public boolean isDev() {
        return dev;
    }

    public void setDev(boolean dev) {
        this.dev = dev;
    }

    public List<Hack> getHacks() {
        return hacks;
    }

    public void setHacks(List<Hack> hacks) {
        this.hacks = hacks;
    }


    @SpringBean
    public void injectHackManager(HackManager hackManager) {
        this.hackManager = hackManager;
    }
}