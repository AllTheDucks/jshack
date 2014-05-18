package org.oscelot.jshack.service;

import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;


/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 29/11/13
 * Time: 8:12 AM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class HackManager {

    @Inject
    private HackService hackService;
    @Inject
    private HackDiscoveryService discoveryService;
    @Inject
    private HackResourceService resourceService;

    private Map<String, Hack> hackLookup;

    public HackManager() {
        hackLookup = null;//new HashMap<String, Hack>();
    }

    public Hack getHackById(String hackId) {
        if (hackLookup == null) {
            loadHacks();
        }
        Hack hack = hackLookup.get(hackId);
        if (hack == null) {
            throw new HackNotFoundException("Couldn't find Hack. Doesn't appear to exist in the cache.");
        }
        return hack;
    }

    //TODO access to this method should be synchronized...
    public void loadHacks() {

        HashMap<String, Hack> newHackLookup = new HashMap<String, Hack>();
        List<String> hackIds = discoveryService.enumerateHackIds();

        for (String hackId : hackIds) {
            Hack currHack = hackService.getHackForId(hackId);
            newHackLookup.put(hackId, currHack);
        }

        hackLookup = newHackLookup;
    }

    /**
     * Returns a List of all the Hacks loaded in memory.  If no hacks are loaded, loadHacks() will be called.
     *
     * @return a List of Hacks.
     */
    public List<Hack> getHacks() {
        if (hackLookup == null) {
            loadHacks();
        }
        return new ArrayList<Hack>(hackLookup.values());
    }

    public void persistHack(Hack hack) {
        if (hack.getResources() != null) {
            for (HackResource resource : hack.getResources()) {
                if(resource.getContent() != null || resource.getTempFileName() != null) {
                    resourceService.persistResource(hack.getIdentifier(), resource);
                }
            }
        }
        hackService.persistHack(hack);
        hackLookup.put(hack.getIdentifier(), hack);
    }

    public HackService getHackService() {
        return hackService;
    }

    public void setHackService(HackService hackService) {
        this.hackService = hackService;
    }

    public HackDiscoveryService getDiscoveryService() {
        return discoveryService;
    }

    public void setDiscoveryService(HackDiscoveryService discoveryService) {
        this.discoveryService = discoveryService;
    }

    public HackResourceService getHackResourceService() {
        return resourceService;
    }

    public void setHackResourceService(HackResourceService resourceService) {
        this.resourceService = resourceService;
    }
}
