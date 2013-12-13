/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import blackboard.platform.servlet.InlineReceiptUtil;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.FileBean;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.BuildingBlockHelper;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.model.ConfigEntry;
import org.oscelot.jshack.model.HackInstance;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
@EntitlementRestrictions(entitlements={"system.jshacks.CREATE"}, errorPage="/noaccess.jsp")
public class ConfigHackAction implements ActionBean {

    BlackboardActionBeanContext context;
    private String hackId;
    private HackInstance hackInstance;
    private List<ConfigEntry> configEntries;
    private FileBean configFile;
    
    @DefaultHandler
    public Resolution configure() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        hackInstance = manager.getHackPackageById(hackId);
        return new ForwardResolution("/WEB-INF/jsp/configHack.jsp");
    }
    
    public Resolution updateConfig() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        manager.persistHackConfigEntires(hackId, configEntries);
        
        RedirectResolution redirect = new RedirectResolution("ListHacks.action", false);
        redirect.addParameter(InlineReceiptUtil.SIMPLE_STRING_KEY, BuildingBlockHelper.getLocalisationString("jsh.receipt.hackConfigured"));
        return redirect;
    }
    
    public Resolution downloadConfig() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        File file = manager.getConfigEntriesFile(hackId);
        FileInputStream fileIS = new FileInputStream(file);
        StreamingResolution sr = new StreamingResolution("application/force-download", fileIS);
        sr.setFilename(file.getName());
        sr.setLength(file.length());
        sr.setLastModified(file.lastModified());
        return sr;
    }
    
    public Resolution uploadConfig() throws IOException {
        return new ForwardResolution("/WEB-INF/jsp/uploadConfig.jsp");
    }
    
    public Resolution takeUploadConfig() throws IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        List<ConfigEntry> parsedConfigEntries;
        InputStream is = null;
        try {
            is = getConfigFile().getInputStream();
            parsedConfigEntries = manager.parseConfigFile(is);
        }
        finally {
            if(is != null) {
                is.close();
            }
        }
        manager.persistHackConfigEntires(hackId, parsedConfigEntries);
        getConfigFile().delete();
        
        RedirectResolution redirect = new RedirectResolution("ConfigHack.action?hackId=" + hackId, false);
        redirect.addParameter(InlineReceiptUtil.SIMPLE_STRING_KEY, BuildingBlockHelper.getLocalisationString("jsh.receipt.hackUploaded"));
        return redirect;
    }
    
    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext)context;
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

    public HackInstance getHackInstance() {
        return hackInstance;
    }

    public void setHackInstance(HackInstance hack) {
        this.hackInstance = hack;
    }

    public List<ConfigEntry> getConfigEntries() {
        return configEntries;
    }

    public void setConfigEntries(List<ConfigEntry> configEntries) {
        this.configEntries = configEntries;
    }

    public FileBean getConfigFile() {
        return configFile;
    }

    public void setConfigFile(FileBean configFile) {
        this.configFile = configFile;
    }
    
    
}
