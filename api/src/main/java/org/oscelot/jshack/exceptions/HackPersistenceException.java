package org.oscelot.jshack.exceptions;

public class HackPersistenceException extends RuntimeException {

    /**
     * Creates a new instance of
     * <code>HackNotFoundException</code> without detail message.
     */
    public HackPersistenceException() {
    }

    public HackPersistenceException(Throwable cause) {
        super(cause);
    }

    public HackPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs an instance of
     * <code>HackNotFoundException</code> with the specified detail message.
     *
     * @param message the detail message.
     */
    public HackPersistenceException(String message) {
        super(message);
    }

}
