package org.oscelot.jshack.service;

import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;
import org.springframework.stereotype.Service;

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

    private Map<String, Hack> hackLookup;

    public HackManager() {
        hackLookup = new HashMap<String, Hack>();
    }

    public Hack getHackById(String hackId) {
        Hack hack = hackLookup.get(hackId);
        if (hack == null) {
            throw new HackNotFoundException("Couldn't find Hack. Doesn't appear to exist in the cache.");
        }
        return hack;
    }

    public void loadHacks() {
        List<String> hackIds = discoveryService.enumerateHackIds();

        for (String hackId : hackIds) {
            Hack currHack = hackService.getHackForId(hackId);
            hackLookup.put(hackId, currHack);
        }

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
}
