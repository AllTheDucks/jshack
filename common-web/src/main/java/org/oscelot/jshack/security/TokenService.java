package org.oscelot.jshack.security;

/**
 * Created by shane on 16/11/2015.
 */
public interface TokenService {

    String generateToken();
    boolean validateToken(String token);

}
