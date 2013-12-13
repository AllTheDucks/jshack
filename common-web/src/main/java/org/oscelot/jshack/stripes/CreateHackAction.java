/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import blackboard.platform.plugin.PlugInException;
import blackboard.platform.plugin.PlugInUtil;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.Before;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.DontValidate;
import net.sourceforge.stripes.action.FileBean;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.controller.LifecycleStage;
import net.sourceforge.stripes.validation.Validate;
import net.sourceforge.stripes.validation.ValidateNestedProperties;
import org.apache.commons.io.FileUtils;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.BuildingBlockHelper;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.model.Restriction;
import org.oscelot.jshack.model.SnippetDefinition;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
@EntitlementRestrictions(entitlements = {"system.jshacks.CREATE"}, errorPage = "/noaccess.jsp")
public class CreateHackAction implements ActionBean {

    private static final String DEFAULT_SNIPPET = "<!-- This snippet binds a function to the \"dom:loaded\" event.\n"
            + "You can put your own javascript into the function, or replace\n"
            + "the entire snippet. -->\n"
            + "<script type=\"text/javascript\">\n"
            + "    Event.observe(document,\"dom:loaded\", function() {\n"
            + "        //Your javascript goes here. \n"
            + "    });\n"
            + "</script>\n";
    public static final String JS_DEBUG_PROP_KEY = "js.debug";
    /**
     * @return the DEFAULT_SNIPPET
     */
    BlackboardActionBeanContext context;
    @ValidateNestedProperties({
        @Validate(field = "identifier", required = true),
        @Validate(field = "name", required = true),
        @Validate(field = "description", required = true),
        @Validate(field = "snippetDefinitions.source", converter = Base64StringConverter.class),
        @Validate(field = "resources.mime", converter = Base64StringConverter.class)
    })
    private Hack hack;
    private String hackJSON;
    private JSHackManager manager;
    private String hackId;
    //TODO: maybe we don't need this array of filebeans anymore...
    private List<FileBean> resourceFiles;
    private List<String> tempFiles;
    private FileBean resourceFile;
    private boolean jsDebug = false;

    @Before(stages = LifecycleStage.BindingAndValidation)
    //TODO change this to throw a more specific exception
    public void init() throws Exception {
        manager = JSHackManagerFactory.getHackManager();

        File configDir = PlugInUtil.getConfigDirectory(
                BuildingBlockHelper.VENDOR_ID, BuildingBlockHelper.HANDLE);
        File configFile = new File(configDir, "config.properties");
        Properties props = new Properties();
        props.load(new FileReader(configFile));
        if (props.containsKey(JS_DEBUG_PROP_KEY)) {
            jsDebug = Boolean.parseBoolean(props.getProperty(JS_DEBUG_PROP_KEY));
        }
    }

    @DefaultHandler
    @DontValidate
    public Resolution displayCreateHackPage() throws IOException {
        manager = JSHackManagerFactory.getHackManager();
        if (hackId == null || hackId.isEmpty()) {
            hack = new Hack();
        } else {
            hack = manager.getHackPackageById(hackId).getHack();

        }
        if (hack.getIdentifier() == null || hack.getIdentifier().isEmpty()
                || hack.getSnippetDefinitions() == null
                || hack.getSnippetDefinitions().size() == 0) {
            SnippetDefinition defaultSnippet = new SnippetDefinition();
            defaultSnippet.setSource(DEFAULT_SNIPPET);
            defaultSnippet.setIdentifier("snippet_1");
            if (hack.getSnippetDefinitions() == null) {
                hack.setSnippetDefinitions(new ArrayList<SnippetDefinition>());
            }
            hack.getSnippetDefinitions().add(defaultSnippet);
        }
        Gson gson = new Gson();
        hackJSON = gson.toJson(hack);

        return new ForwardResolution("/WEB-INF/jsp/createHack.jsp");
    }

    @Before(on = {"saveHackPackage"}, stages = LifecycleStage.EventHandling)
    public void postProcessHack() {

        ArrayList<HackResource> tempResources = new ArrayList<HackResource>();
        if (hack.getResources() != null) {
            for (HackResource hackResource : hack.getResources()) {
                if (hackResource.getPath() != null && !hackResource.getPath().isEmpty()) {
                    tempResources.add(hackResource);
                }
            }
        }
        hack.setResources(tempResources);

        ArrayList<Restriction> tempRestrictions = new ArrayList<Restriction>();


    }


    public Resolution saveHackPackage() throws IOException {
        File hackRoot = new File(manager.getHacksRoot(), hack.getIdentifier());
        File resourceDirectory = new File(hackRoot, "resources");
        if (hack.getResources() != null) {
            if (!resourceDirectory.exists()) {
                resourceDirectory.mkdirs();
            }
            for (HackResource currRes : hack.getResources()) {
                if (currRes.getTempFileName() != null
                        && !currRes.getTempFileName().trim().equals("")
                        && !currRes.getTempFileName().contains("..")
                        && currRes.getPath() != null
                        && !currRes.getPath().contains("..")) {
                    String tfName = currRes.getTempFileName();
                    File tf = new File(manager.getWorkingDirectory(), tfName);
                    if (!tf.exists()) {
                        continue;
                    }
                    File destFile = new File(resourceDirectory, currRes.getPath());
                    FileUtils.copyFile(tf, destFile);
                    tf.delete();
                }
            }
        }

        manager.persistHackPackage(hack);

        Gson gson = new Gson();
        String respJson = gson.toJson(new ActionResponse<Hack>(true, null, hack));
        return new StreamingResolution("application/json", respJson);
    }


    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext) context;
    }

    public ActionBeanContext getContext() {
        return context;
    }

    /**
     * @return the hack
     */
    public Hack getHack() {
        return hack;
    }

    /**
     * @param hack the hack to set
     */
    public void setHack(Hack hack) {
        this.hack = hack;
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
     * @return the resourceFiles
     */
    public List<FileBean> getResourceFiles() {
        return resourceFiles;
    }

    /**
     * @param resourceFiles the resourceFiles to set
     */
    public void setResourceFiles(List<FileBean> resourceFiles) {
        this.resourceFiles = resourceFiles;
    }

    /**
     * @return the tempFiles
     */
    public List<String> getTempFiles() {
        return tempFiles;
    }

    /**
     * @param tempFiles the tempFiles to set
     */
    public void setTempFiles(List<String> tempFiles) {
        this.tempFiles = tempFiles;
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
     * @return the hackJSON
     */
    public String getHackJSON() {
        return hackJSON;
    }

    /**
     * Returns the default snippet contents encoded as JSON.
     *
     * @return
     */
    public String getDefaultSnippet() {
        Gson gson = new Gson();
        return gson.toJson(DEFAULT_SNIPPET);
    }

    /**
     * @return the jsDebug
     */
    public boolean isJsDebug() {
        return jsDebug;
    }

    /**
     * @param jsDebug the jsDebug to set
     */
    public void setJsDebug(boolean jsDebug) {
        this.jsDebug = jsDebug;
    }
}
