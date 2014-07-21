package org.oscelot.jshack.model;

import org.oscelot.jshack.model.restrictions.CompiledRestriction;
import org.oscelot.jshack.resources.HackResource;

import java.util.List;

/**
 * Created by wiley on 21/07/14.
 */
public class CompiledHackResource {
    private HackResource resource;
    private List<CompiledRestriction> restrictions;

    public CompiledHackResource() {
    }

    public CompiledHackResource(HackResource resource, List<CompiledRestriction> restrictions) {
        this.resource = resource;
        this.restrictions = restrictions;
    }

    public HackResource getResource() {
        return resource;
    }

    public void setResource(HackResource resource) {
        this.resource = resource;
    }

    public List<CompiledRestriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(List<CompiledRestriction> restrictions) {
        this.restrictions = restrictions;
    }
}
