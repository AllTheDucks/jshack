/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.data.role.PortalRole;
import blackboard.persist.PersistenceException;
import blackboard.persist.role.PortalRoleDbLoader;
import blackboard.platform.context.Context;
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
public class PortalRoleRestriction extends CompiledRestriction {

    private List<PortalRole> roles;
    
    @Override
    public boolean test(Context context) {
        List<PortalRole> actualRoles;
        try {
            actualRoles = PortalRoleDbLoader.Default.getInstance().loadAllByUserId(context.getUserId());
        } catch (PersistenceException ex) {
            Logger.getLogger(PortalRoleRestriction.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        for(PortalRole requiredRole : roles) {
            for(PortalRole actualRole : actualRoles) {
                if(actualRole.equals(requiredRole)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    @Override
    public int getPriority() {
        return 6;
    }

    public List<PortalRole> getRoles() {
        return roles;
    }

    public void setRoles(List<PortalRole> roles) {
        this.roles = roles;
    }
    
    public void setRolesByPattern(Pattern pattern) throws PersistenceException {
        PortalRoleDbLoader loader = PortalRoleDbLoader.Default.getInstance();
        roles = new ArrayList<PortalRole>();
        for(PortalRole pr : loader.loadAll()) {
            Matcher m = pattern.matcher(pr.getRoleID());
            if(m.matches()) {
                roles.add(pr);
            }
        }
    }
    
    public void setRolesByPatternString(String patternString) throws PersistenceException {
        this.setRolesByPattern(Pattern.compile(patternString));
    }
    
}
