package org.oscelot.jshack.security;

import blackboard.platform.context.Context;
import blackboard.platform.context.ContextManagerFactory;
import blackboard.platform.security.SecurityUtil;
import blackboard.platform.session.BbSession;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import java.io.IOException;

/**
 * Created by shane on 17/11/2015.
 */
public class TokenFilter implements ContainerRequestFilter {

    final static String CSRF_HEADER = "X-JSHack-CSRF";

    @Inject
    private TokenService tokenService;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        final String csrfHeader = requestContext.getHeaderString(CSRF_HEADER);
        if(csrfHeader == null) {
            throw buildAuthException();
        }

        if(!tokenService.validateToken(csrfHeader)) {
            throw buildAuthException();
        }

    }

    private WebApplicationException buildAuthException() {
        return new WebApplicationException(
                Response.status(Response.Status.UNAUTHORIZED).build());
    }

    public TokenService getTokenService() {
        return tokenService;
    }

    public void setTokenService(TokenService tokenService) {
        this.tokenService = tokenService;
    }
}
