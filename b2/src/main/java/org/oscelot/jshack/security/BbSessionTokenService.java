package org.oscelot.jshack.security;

import blackboard.platform.context.Context;
import blackboard.platform.context.ContextManagerFactory;
import blackboard.platform.session.BbSession;

/**
 * Created by shane on 17/11/2015.
 */
public class BbSessionTokenService implements TokenService {

    @Override
    public String generateToken() {
        return getSessionId();
    }

    @Override
    public boolean validateToken(String token) {
        final String sessionId = getSessionId();
        return sessionId != null && sessionId.equals(token);
    }

    private String getSessionId() {
        final Context context = ContextManagerFactory.getInstance().getContext();
        if(context == null) {
            return null;
        }

        final BbSession session = context.getSession();
        if(session == null) {
            return null;
        }

        return session.getBbSecureSessionIdMd5();
    }

}
