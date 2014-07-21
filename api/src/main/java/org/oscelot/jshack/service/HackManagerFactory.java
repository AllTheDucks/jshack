package org.oscelot.jshack.service;

/**
 * Created by wiley on 20/07/14.
 */
public class HackManagerFactory {

    private static HackManager hackManager;
    private static final String synchObj = "";

    public static HackManager getHackManager() {
        if (hackManager == null) {
            synchronized (synchObj) {
                if (hackManager == null) {
                    hackManager = new HackManager();
                }
            }
        }
        return hackManager;
    }
}
