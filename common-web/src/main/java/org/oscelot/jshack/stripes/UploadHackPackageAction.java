/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import blackboard.platform.servlet.InlineReceiptUtil;
import java.io.IOException;
import java.io.InputStream;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.DontValidate;
import net.sourceforge.stripes.action.FileBean;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.validation.SimpleError;
import net.sourceforge.stripes.validation.ValidationErrors;
import org.oscelot.bb.stripes.BlackboardActionBeanContext;
import org.oscelot.bb.stripes.EntitlementRestrictions;
import org.oscelot.jshack.BuildingBlockHelper;
import org.oscelot.jshack.HackPackager;
import org.oscelot.jshack.exceptions.PackageManagementException;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
@EntitlementRestrictions(entitlements={"system.jshacks.CREATE"}, errorPage="/noaccess.jsp")
public class UploadHackPackageAction implements ActionBean {

    BlackboardActionBeanContext context;
    private FileBean packageFile;
    private boolean overwritePackage;

    @DefaultHandler
    @DontValidate
    public Resolution displayUploadHackPackagePage() throws IOException {
        return new ForwardResolution("/WEB-INF/jsp/uploadHackPackage.jsp");
    }

    public Resolution uploadHackPackage() throws IOException {
        ValidationErrors errors = new ValidationErrors();
        
        InputStream is = packageFile.getInputStream();
        try {
            HackPackager.unpackageHack(is, overwritePackage);
        } catch (PackageManagementException ex) {
            errors.addGlobalError(new SimpleError(ex.getMessage()));
            getContext().setValidationErrors(errors);
            return new ForwardResolution("/WEB-INF/jsp/uploadHackPackage.jsp");
        }
        
        is.close();
        packageFile.delete();

        RedirectResolution redirect = new RedirectResolution("ListHacks.action", false);
        redirect.addParameter(InlineReceiptUtil.SIMPLE_STRING_KEY, BuildingBlockHelper.getLocalisationString("jsh.receipt.hackUploaded"));
        return redirect;
    }

    public void setContext(ActionBeanContext context) {
        this.context = (BlackboardActionBeanContext) context;
    }

    public ActionBeanContext getContext() {
        return context;
    }

    public FileBean getPackageFile() {
        return packageFile;
    }

    public void setPackageFile(FileBean packageFile) {
        this.packageFile = packageFile;
    }

    public boolean isOverwritePackage() {
        return overwritePackage;
    }

    public void setOverwritePackage(boolean overwritePackage) {
        this.overwritePackage = overwritePackage;
    }
}
