/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.persist.PersistenceException;
import blackboard.platform.context.Context;
import blackboard.platform.security.DomainManagerFactory;
import blackboard.platform.security.SystemRole;
import blackboard.platform.security.persist.SystemRoleDbLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class SystemRoleRestriction extends CompiledRestriction {

    private List<SystemRole> roles;
    
    @Override
    public boolean test(Context context) {
        List<SystemRole> actualRoles;
        try {
            actualRoles = DomainManagerFactory.getInstance().getDefaultDomainRolesForUser(context.getUser().getUserName());
        } catch (PersistenceException ex) {
            Logger.getLogger(SystemRoleRestriction.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        for(SystemRole requiredRole : roles) {
            for(SystemRole actualRole : actualRoles) {
                if(actualRole.equals(requiredRole)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    @Override
    public int getPriority() {
        return 3;
    }

    public List<SystemRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SystemRole> roles) {
        this.roles = roles;
    }
    
    public void setRolesByPattern(Pattern pattern) throws PersistenceException {
        SystemRoleDbLoader loader = SystemRoleDbLoader.Default.getInstance();
        roles = new ArrayList<SystemRole>();
        for(SystemRole sr : loader.loadAll()) {
            Matcher m = pattern.matcher(sr.getIdentifier());
            if(m.matches()) {
                roles.add(sr);
            }
        }
    }
    
    public void setRolesByPatternString(String patternString) throws PersistenceException {
        this.setRolesByPattern(Pattern.compile(patternString));
    }
    
}
