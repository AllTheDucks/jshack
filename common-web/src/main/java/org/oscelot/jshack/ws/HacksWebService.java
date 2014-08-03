package org.oscelot.jshack.ws;

import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.service.HackManager;
import org.oscelot.jshack.service.HackResourceService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 28/11/13
 * Time: 8:14 PM
 * To change this template use File | Settings | File Templates.
 */
@Path("hacks")
public class HacksWebService {

    @Inject
    private HackManager hackManager;

    @GET
    @Produces("application/json")
    @Path("{hackId}")
    public Response getHackDetails(@PathParam("hackId") String hackId) {
        Hack hack = hackManager.getHackById(hackId);
        Response r = Response.ok(hack).type(MediaType.APPLICATION_JSON_TYPE).build();
        return r;
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response createHack(Hack hack) {
        hackManager.persistHack(hack);
        Hack savedHack = hackManager.getHackById(hack.getIdentifier());
        Response r = Response.ok(savedHack).type(MediaType.APPLICATION_JSON_TYPE).build();
        return r;
    }

    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    @Path("{hackId}")
    public Response updateHack(Hack hack) {
        //TODO check for existence of hack before persisting it.
        hackManager.persistHack(hack);
        Hack savedHack = hackManager.getHackById(hack.getIdentifier());
        Response r = Response.ok(savedHack).type(MediaType.APPLICATION_JSON_TYPE).build();
        return r;
    }

    public HackManager getHackManager() {
        return hackManager;
    }

    public void setHackManager(HackManager hackManager) {
        this.hackManager = hackManager;
    }
}
