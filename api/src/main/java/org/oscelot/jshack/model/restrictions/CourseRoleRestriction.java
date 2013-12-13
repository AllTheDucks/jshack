/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.data.course.CourseMembership;
import blackboard.persist.PersistenceException;
import blackboard.platform.context.Context;
import blackboard.platform.security.CourseRole;
import blackboard.platform.security.persist.CourseRoleDbLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class CourseRoleRestriction extends CompiledRestriction {

    private List<CourseRole> roles;
    
    @Override
    public boolean test(Context context) {
        CourseMembership cm = context.getCourseMembership();
        if(cm == null) {
            return false;
        }
        
        CourseRole actualRole = cm.getRole().getDbRole();
        
        for(CourseRole role : getRoles()) {
            // For some reason, the CourseRole objects are not equal. Bb never overrode equals() I assume.
            if(role.getIdentifier().equals(actualRole.getIdentifier())) {
                return true;
            }
        }
        return false;
    }
    
    @Override
    public int getPriority() {
        return 5;
    }

    public List<CourseRole> getRoles() {
        return roles;
    }

    public void setRoles(List<CourseRole> roles) {
        this.roles = roles;
    }
    
    public void setRolesByPattern(Pattern pattern) throws PersistenceException {
        CourseRoleDbLoader loader = CourseRoleDbLoader.Default.getInstance();
        roles = new ArrayList<CourseRole>();
        for(CourseRole sr : loader.loadAll()) {
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
