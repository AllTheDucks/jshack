/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import java.io.IOException;
import java.util.List;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.model.HackInstance;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
@EntitlementRestrictions(entitlements={"system.jshacks.CREATE"}, errorPage="/noaccess.jsp")
public class ListHacksAction implements ActionBean {

    BlackboardActionBeanContext context;
    private List<HackInstance> hackInstances;
    
    @DefaultHandler
    public Resolution displayConfigPage() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        hackInstances = manager.getAllHackPackages();
        return new ForwardResolution("/WEB-INF/jsp/listHacks.jsp");
    }
    
    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext) context;
    }

    public ActionBeanContext getContext() {
        return context;
    }

    public List<HackInstance> getHackInstances() {
        return hackInstances;
    }

    public void setHackInstances(List<HackInstance> hackInstances) {
        this.hackInstances = hackInstances;
    }
    
}
