package org.oscelot.jshack.ws;

import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.service.HackManager;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 28/11/13
 * Time: 8:14 PM
 * To change this template use File | Settings | File Templates.
 */
@Path("hacks")
public class HacksResource {

    @Inject
    private HackManager hackManager;

    @GET
    @Produces("application/json")
    @Path("{hackId}")
    public Hack getHackDetails(@PathParam("hackId") String hackId) {
        Hack hack = null;
        hack = hackManager.getHackById(hackId);
        return hack;
    }

    public HackManager getHackManager() {
        return hackManager;
    }

    public void setHackManager(HackManager hackManager) {
        this.hackManager = hackManager;
    }
}
