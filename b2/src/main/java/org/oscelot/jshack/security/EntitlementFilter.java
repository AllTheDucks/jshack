package org.oscelot.jshack.security;

import blackboard.platform.security.Entitlement;
import blackboard.platform.security.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import java.io.IOException;


public class EntitlementFilter implements ContainerRequestFilter {
    final Logger logger = LoggerFactory.getLogger(EntitlementFilter.class);

    final static Entitlement REQUIRED_ENTITLEMENT = new Entitlement("system.jshacks.CREATE");

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        if(!SecurityUtil.userHasEntitlement(REQUIRED_ENTITLEMENT)) {
            throw buildAuthException();
        }

    }

    private WebApplicationException buildAuthException() {
        return new WebApplicationException(
                Response.status(Response.Status.UNAUTHORIZED).build());
    }

}
