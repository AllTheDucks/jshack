package org.oscelot.jshack.stripes;

import net.sourceforge.stripes.action.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 7/12/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
public class EditorAction implements ActionBean {

    private boolean dev = false;
    private ActionBeanContext context;

    @DefaultHandler
    public Resolution displayEditor() {

        return new ForwardResolution("/WEB-INF/jsp/editor.jsp");

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
}
