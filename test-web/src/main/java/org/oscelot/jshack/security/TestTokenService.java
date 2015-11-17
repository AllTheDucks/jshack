package org.oscelot.jshack.security;

/**
 * Created by shane on 16/11/2015.
 */
public class TestTokenService implements TokenService {

    private String validToken;

    public TestTokenService(String validToken) {
        this.validToken = validToken;
    }

    @Override
    public String generateToken() {
        return validToken;
    }

    @Override
    public boolean validateToken(String token) {
        return token.equals(validToken);
    }
}
