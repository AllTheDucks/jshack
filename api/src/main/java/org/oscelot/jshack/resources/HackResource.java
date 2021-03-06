/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.resources;

import org.oscelot.jshack.model.Hack;
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
     * only used for text type resources, and only contains a value when
     * saving a modified resource.
     */
    private String content;
    /**
     * only applicable for "text/html" resources
     */
    private boolean injectResource;
    private List<String> injectionPoints;
    private List<Restriction> restrictions;
    /**
     * only populated for the in-memory representation when hacks are being rendered.
     *
     */
    private Hack hack;

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
     * get the text content set from the client.  This will be null if no
     * changes have been made or if the content is non-text.
     *
     * @return the content
     */
    public String getContent() {
        return content;
    }


    /**
     * Set the content.   This should only be called to set content sent from
     * the client.
     *
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
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

    public Hack getHack() { return hack; }

    public void setHack(Hack hack) { this.hack = hack; }
}
