package org.oscelot.jshack.resources;

import blackboard.platform.context.Context;
import org.oscelot.jshack.RestrictionCompiler;
import org.oscelot.jshack.model.CompiledHackResource;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.Restriction;
import org.oscelot.jshack.model.restrictions.CompiledRestriction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The ResourceRequestMatcher is basically a sub-component of the HackGlobalContext. Its primary responsibility is
 * to match incoming requests for a given hook-key and Bb Context, to matching Injectable Resources from Hacks.
 * These hacks are then returned to the RenderingHook and rendered to the page.<br>
 *
 * Important: The ResourceRequestMatcher and all the hacks it contains, should be considered Immutable.<br>
 *
 *
 * Created by wiley on 20/07/14.
 */
public class ResourceRequestMatcher {

    private List<HackResource> noResources = new ArrayList<>();
    private Map<String, List<CompiledHackResource>> resourcesByHookKey;
    private List<Hack> hacks;


    public ResourceRequestMatcher(List<Hack> hacks) {
        resourcesByHookKey = new HashMap<>();
        this.hacks = hacks;
        for (Hack hack : hacks) {
            if (hack.getResources() != null) {
                for (HackResource resource : hack.getResources()) {

                    CompiledHackResource compiledResource = new CompiledHackResource(
                            resource, new ArrayList<CompiledRestriction>());
                    List<Restriction> restrictions = resource.getRestrictions();
                    if (restrictions != null) {
                        for (Restriction restriction : resource.getRestrictions()) {
                            compiledResource.getRestrictions().add(RestrictionCompiler.compileRestriction(restriction));
                        }
                    }
                    for (String hook : resource.getInjectionPoints()) {
                        List<CompiledHackResource> resList = resourcesByHookKey.get(hook);
                        if (resList == null) {
                            resList = new ArrayList();
                            resourcesByHookKey.put(hook, resList);
                        }
                        resList.add(compiledResource);
                    }
                }
            }
        }
    }


    public List<HackResource> getMatchingResources(String hookKey, Context ctx) {
        List<CompiledHackResource> resources = resourcesByHookKey.get(hookKey);
        if (resources == null) {
            return noResources;
        } else {
            List<HackResource> finalResources = new ArrayList<>(resources.size());
            for (CompiledHackResource resource : resources) {
                if (resource.getRestrictions().isEmpty()) {
                    finalResources.add(resource.getResource());
                } else {
                    for (CompiledRestriction restriction : resource.getRestrictions()) {
                        if (restriction.test(ctx)) {
                            finalResources.add(resource.getResource());
                        }
                    }
                }
            }
            return finalResources;
        }
    }
}
