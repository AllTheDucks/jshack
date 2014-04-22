/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.resources;

import org.oscelot.jshack.model.Restriction;

import java.util.List;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class HackResource {
    private String path;
    private String tempFileName;
    private String mime;
    /**
     * only applicable for "text/html" resources
     */
    private boolean injectResource;
    private List<String> injectionPoints;
    private List<Restriction> restrictions;

    public HackResource() {
    }

    public HackResource(String path, String tempFileName, String mime) {
        this.path = path;
        this.tempFileName = tempFileName;
        this.mime = mime;
    }

    /**
     * @return the path
     */
    public String getPath() {
        return path;
    }

    /**
     * @param path the path to set
     */
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * @return the mime
     */
    public String getMime() {
        return mime;
    }

    /**
     * @param mime the mime to set
     */
    public void setMime(String mime) {
        this.mime = mime;
    }

    /**
     * @return the tempFileName
     */
    public String getTempFileName() {
        return tempFileName;
    }

    /**
     * @param tempFileName the tempFileName to set
     */
    public void setTempFileName(String tempFileName) {
        this.tempFileName = tempFileName;
    }


    public boolean isInjectResource() {
        return injectResource;
    }

    public void setInjectResource(boolean injectResource) {
        this.injectResource = injectResource;
    }

    public List<String> getInjectionPoints() {
        return injectionPoints;
    }

    public void setInjectionPoints(List<String> injectionPoints) {
        this.injectionPoints = injectionPoints;
    }

    public List<Restriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(List<Restriction> restrictions) {
        this.restrictions = restrictions;
    }
}
