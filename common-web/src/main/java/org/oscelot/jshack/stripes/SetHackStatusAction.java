/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import blackboard.platform.servlet.InlineReceiptUtil;
import java.io.IOException;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DontValidate;
import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.validation.Validate;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.BuildingBlockHelper;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
@EntitlementRestrictions(entitlements={"system.jshacks.CREATE"}, errorPage="/noaccess.jsp")
public class SetHackStatusAction implements ActionBean {

    @Validate(required=true)
    private String hackId;
    BlackboardActionBeanContext context;

    @DontValidate
    public Resolution disableHack() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        manager.disableHack(hackId);
        RedirectResolution redirect = new RedirectResolution("ListHacks.action", false);
        redirect.addParameter(InlineReceiptUtil.SIMPLE_STRING_KEY, BuildingBlockHelper.getLocalisationString("jsh.receipt.hackDisabled"));
        return redirect;
    }
    
    @DontValidate
    public Resolution enableHack() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        manager.enableHack(hackId);
        RedirectResolution redirect = new RedirectResolution("ListHacks.action", false);
        redirect.addParameter(InlineReceiptUtil.SIMPLE_STRING_KEY, BuildingBlockHelper.getLocalisationString("jsh.receipt.hackEnabled"));
        return redirect;
    }


    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext) context;
    }

    public ActionBeanContext getContext() {
        return context;
    }

    public String getHackId() {
        return hackId;
    }

    public void setHackId(String hackId) {
        this.hackId = hackId;
    }

}
