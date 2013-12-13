/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class Restriction {
    private RestrictionType type;
    private String value;
    private boolean inverse;

    /**
     * @return the type
     */
    public RestrictionType getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(RestrictionType type) {
        this.type = type;
    }

    /**
     * @return the value
     */
    public String getValue() {
        return value;
    }

    /**
     * @param value the value to set
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * @return the inverse
     */
    public boolean isInverse() {
        return inverse;
    }

    /**
     * @param inverse the inverse to set
     */
    public void setInverse(boolean inverse) {
        this.inverse = inverse;
    }

}
