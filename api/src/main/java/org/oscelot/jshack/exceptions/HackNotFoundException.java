/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.exceptions;

/**
 *
 * @author sargo
 */
public class HackNotFoundException extends RuntimeException {

    /**
     * Creates a new instance of
     * <code>HackNotFoundException</code> without detail message.
     */
    public HackNotFoundException() {
    }

    public HackNotFoundException(Throwable cause) {
        super(cause);
    }

    public HackNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs an instance of
     * <code>HackNotFoundException</code> with the specified detail message.
     *
     * @param msg the detail message.
     */
    public HackNotFoundException(String msg) {
        super(msg);
    }
}
