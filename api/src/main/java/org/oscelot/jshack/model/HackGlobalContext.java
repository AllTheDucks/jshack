package org.oscelot.jshack.model;

import org.oscelot.jshack.resources.ResourceRequestMatcher;

import java.util.Map;

/**
 * Created by wiley on 20/07/14.<br>
 *
 * This class stores all the data needed to calculate a HackRenderingContext at a given point in time.
 * When the Hack data is reloaded, a new instance of the HackGlobalContext is constructed to represent
 * the new state of the system, and then replaces the old one in HackManager.
 *
 */

public class HackGlobalContext {

    /** Maps Resources to their associated injection points and restrictions, and
     * allows discovery of the matching resources by providing a rendering hook key, and a
     * Blackboard Context object. */
    private ResourceRequestMatcher matcher;

    /** Map of config entries keyed by Hack ID */
    private Map<String, Map<String, String>> hackConfigMaps;

    /** Map of Resource URL entries keyed by Hack ID */
    private Map<String, Map<String, String>> resourceUrlMap;

    public ResourceRequestMatcher getMatcher() {
        return matcher;
    }

    public void setMatcher(ResourceRequestMatcher matcher) {
        this.matcher = matcher;
    }

    public Map<String, Map<String, String>> getHackConfigMaps() {
        return hackConfigMaps;
    }

    public void setHackConfigMaps(Map<String, Map<String, String>> hackConfigMaps) {
        this.hackConfigMaps = hackConfigMaps;
    }
}
