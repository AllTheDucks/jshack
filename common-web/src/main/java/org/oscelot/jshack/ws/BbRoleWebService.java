package org.oscelot.jshack.ws;

import org.oscelot.jshack.model.BbRole;
import org.oscelot.jshack.service.BbRoleService;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

@Path("bbroles")
public class BbRoleWebService {

    @Inject
    public BbRoleService bbRoleService;

    @GET
    @Path("system")
    @Produces("application/json")
    public List<BbRole> getSystemRoles() {
        return bbRoleService.getSystemRoles();
    }

    @GET
    @Path("course")
    @Produces("application/json")
    public List<BbRole> getCourseRoles() {
        return bbRoleService.getCourseRoles();
    }

    @GET
    @Path("institution")
    @Produces("application/json")
    public List<BbRole> getInstitutionRoles() {
        return bbRoleService.getInstitutionRoles();
    }

}
