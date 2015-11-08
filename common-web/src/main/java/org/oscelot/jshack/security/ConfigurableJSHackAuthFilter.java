package org.oscelot.jshack.security;

import blackboard.platform.context.Context;
import blackboard.platform.context.ContextManagerFactory;
import blackboard.platform.security.Entitlement;
import blackboard.platform.security.SecurityUtil;
import blackboard.platform.session.BbSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import java.io.IOException;


public class ConfigurableJSHackAuthFilter implements ContainerRequestFilter {
    final Logger logger = LoggerFactory.getLogger(ConfigurableJSHackAuthFilter.class);

    final static Entitlement REQUIRED_ENTITLEMENT = new Entitlement("system.jshacks.CREATE");
    final static String CSRF_HEADER = "X-JSHack-CSRF";

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        if(!SecurityUtil.userHasEntitlement(REQUIRED_ENTITLEMENT)) {
            throw buildAuthException();
        }

        final String csrfHeader = requestContext.getHeaderString(CSRF_HEADER);
        if(csrfHeader == null) {
            throw buildAuthException();
        }

        final Context context = ContextManagerFactory.getInstance().getContext();
        if(context == null) {
            throw buildAuthException();
        }

        final BbSession session = context.getSession();
        if(session == null) {
            throw buildAuthException();
        }

        final String sessionId = session.getBbSecureSessionIdMd5();
        if(sessionId == null || !sessionId.equals(csrfHeader)) {
            throw buildAuthException();
        }

    }

    private WebApplicationException buildAuthException() {
        return new WebApplicationException(
                Response.status(Response.Status.UNAUTHORIZED).build());
    }

}
