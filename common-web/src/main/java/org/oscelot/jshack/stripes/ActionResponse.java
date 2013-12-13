/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

/**
 *
 * @author wfuller
 */
public class ActionResponse<T> {

    private boolean successful;
    private String errorMessage;

    private T data;

    public ActionResponse(boolean successful, String errorMessage, T data) {
        this.successful = successful;
        this.errorMessage = errorMessage;
        this.data = data;
    }

}
