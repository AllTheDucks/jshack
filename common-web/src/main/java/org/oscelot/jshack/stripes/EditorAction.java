package org.oscelot.jshack.stripes;

import blackboard.platform.plugin.PlugInUtil;
import net.sourceforge.stripes.action.*;
import org.oscelot.jshack.BuildingBlockHelper;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 7/12/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
@UrlBinding("/editor/{hackId}")
public class EditorAction implements ActionBean {

    private boolean dev = false;
    private ActionBeanContext context;
    private String rootUri;
    private String hackId;

    @DefaultHandler
    public Resolution displayEditor() {
        rootUri = PlugInUtil.getUriStem(BuildingBlockHelper.VENDOR_ID, BuildingBlockHelper.HANDLE);
        return new ForwardResolution("/WEB-INF/jsp/editor.jsp");
    }

    public ActionBeanContext getContext() {
        return context;
    }

    public void setContext(ActionBeanContext context) {
        this.context = context;
    }

    public String getRootUri() {
        return rootUri;
    }

    public boolean isDev() {
        return dev;
    }

    public void setDev(boolean dev) {
        this.dev = dev;
    }

    public String getHackId() {
        return hackId;
    }

    public void setHackId(String hackId) {
        this.hackId = hackId;
    }
}
