/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.exceptions;

/**
 *
 * @author sargo
 */
public class PackageManagementException extends Exception {

    /**
     * Creates a new instance of
     * <code>PackageManagementException</code> without detail message.
     */
    public PackageManagementException() {
    }

    /**
     * Constructs an instance of
     * <code>PackageManagementException</code> with the specified detail
     * message.
     *
     * @param msg the detail message.
     */
    public PackageManagementException(String msg) {
        super(msg);
    }
}
