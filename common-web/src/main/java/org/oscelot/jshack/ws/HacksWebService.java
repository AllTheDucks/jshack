package org.oscelot.jshack.ws;

import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.security.RequiresAuthentication;
import org.oscelot.jshack.service.HackManager;
import org.oscelot.jshack.service.HackResourceService;

import javax.inject.Inject;
import javax.ws.rs.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 28/11/13
 * Time: 8:14 PM
 * To change this template use File | Settings | File Templates.
 */
@Path("hacks")
@RequiresAuthentication
public class HacksWebService {

    @Inject
    private HackManager hackManager;

    @GET
    @Produces("application/json")
    @Path("{hackId}")
    public Hack getHackDetails(@PathParam("hackId") String hackId) {
        Hack hack = hackManager.getHackById(hackId);
        return hack;
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Hack createHack(Hack hack) {
        hackManager.persistHack(hack);
        return hackManager.getHackById(hack.getIdentifier());
    }

    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    @Path("{hackId}")
    public Hack updateHack(Hack hack) {
        //TODO check for existence of hack before persisting it.
        hackManager.persistHack(hack);
        return hackManager.getHackById(hack.getIdentifier());
    }

    public HackManager getHackManager() {
        return hackManager;
    }

    public void setHackManager(HackManager hackManager) {
        this.hackManager = hackManager;
    }
}
