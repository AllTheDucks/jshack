/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.exceptions;

/**
 *
 * @author sargo
 */
public class ConfigNotFoundException extends RuntimeException {

    /**
     * Creates a new instance of
     * <code>ConfigNotFoundException</code> without detail message.
     */
    public ConfigNotFoundException() {
    }

    public ConfigNotFoundException(Throwable cause) {
        super(cause);
    }

    public ConfigNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs an instance of
     * <code>ConfigNotFoundException</code> with the specified detail message.
     *
     * @param msg the detail message.
     */
    public ConfigNotFoundException(String msg) {
        super(msg);
    }
}
