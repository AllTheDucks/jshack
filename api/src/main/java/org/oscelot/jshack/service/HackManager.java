package org.oscelot.jshack.service;

import blackboard.platform.context.Context;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.HackGlobalContext;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.resources.ResourceRequestMatcher;
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

    private HackGlobalContext globalContext;

    private Map<String, Hack> hackLookup;
    private List<Hack> hackList;
    private ResourceRequestMatcher matcher;

    public HackManager() {
        hackLookup = null;
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


    public synchronized void loadHacks() {

        HashMap<String, Hack> newHackLookup = new HashMap<String, Hack>();
        ArrayList<Hack> newHackList = new ArrayList<>();
        List<String> hackIds = discoveryService.enumerateHackIds();

        for (String hackId : hackIds) {
            Hack currHack = hackService.getHackForId(hackId);
            newHackLookup.put(hackId, currHack);
            newHackList.add(currHack);
        }

        hackLookup = newHackLookup;
        ResourceRequestMatcher newMatcher = new ResourceRequestMatcher(newHackList);
        matcher = newMatcher;
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
        return hackList;
    }

    public void persistHack(Hack hack) {
        if (hackLookup == null) {
            loadHacks();
        }
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

    // TODO Return HackRenderingContext instead of List of HackResources
    public List<HackResource> getRenderingContext(String hookKey, Context ctx) {
        // do this first to make sure the ResourceRequestMatcher is initialised.
        if (matcher == null) {
            loadHacks();
        }
        return matcher.getMatchingResources(hookKey, ctx);
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
