/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.FileBean;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.resources.HackResource;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
@EntitlementRestrictions(entitlements = {"system.jshacks.CREATE"}, errorPage = "/noaccess.jsp")
public class ResourceUploader implements ActionBean {

    BlackboardActionBeanContext context;
    private String hackId;
    private FileBean resourceFile;
    private String mimeType;
    private JSHackManager manager;

    public ResourceUploader() {
        manager = JSHackManagerFactory.getHackManager();

    }

    public Resolution uploadResource() throws IOException {
        HackResource res = new HackResource();
        if (resourceFile != null) {
            File tempFile = File.createTempFile("resource", ".dat", manager.getWorkingDirectory());
            res.setMime(mimeType);
            res.setPath(resourceFile.getFileName());
            res.setTempFileName(tempFile.getName());
        }
        Gson gson = new Gson();
        String respJson = gson.toJson(new ActionResponse<HackResource>(true, null, res));
        return new StreamingResolution("application/json", respJson);

    }

    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext) context;
    }

    public ActionBeanContext getContext() {
        return context;
    }

    /**
     * @return the hackId
     */
    public String getHackId() {
        return hackId;
    }

    /**
     * @param hackId the hackId to set
     */
    public void setHackId(String hackId) {
        this.hackId = hackId;
    }

    /**
     * @return the resourceFile
     */
    public FileBean getResourceFile() {
        return resourceFile;
    }

    /**
     * @param resourceFile the resourceFile to set
     */
    public void setResourceFile(FileBean resourceFile) {
        this.resourceFile = resourceFile;
    }

    /**
     * @return the mimeType
     */
    public String getMimeType() {
        return mimeType;
    }

    /**
     * @param mimeType the mimeType to set
     */
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
}
