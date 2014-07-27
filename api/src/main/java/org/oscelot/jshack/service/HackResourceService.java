package org.oscelot.jshack.service;

import org.oscelot.jshack.resources.HackResource;

/**
 * Created by wiley on 18/05/14.
 */
public interface HackResourceService {
    public void persistResource(String hackId, HackResource resource);
}
