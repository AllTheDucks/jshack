/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.data.course.Course;
import blackboard.data.course.CourseUtil;
import blackboard.platform.context.Context;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class CourseAvailabilityRestriction extends CompiledRestriction {

    protected boolean requireAvilable;
    
    @Override
    public boolean test(Context context) {
        Course course = context.getCourse();
        
        if(course == null) {
            return false;
        }
        
        boolean courseAvailable = course.getIsAvailable(true);
        
        return courseAvailable == this.requireAvilable ;
    }
    
    @Override
    public int getPriority() {
        return 4;
    }

    public boolean isRequireAvilable() {
        return requireAvilable;
    }

    public void setRequireAvilable(boolean requireAvilable) {
        this.requireAvilable = requireAvilable;
    }
    
}
