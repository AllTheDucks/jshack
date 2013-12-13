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
public class AdvancedCourseAvailabilityRestriction extends CourseAvailabilityRestriction {
    
    @Override
    public boolean test(Context context) {
        Course course = context.getCourse();
        
        if(course == null) {
            return false;
        }
        
        boolean courseAvailable = course.getIsAvailable(true)
                && CourseUtil.courseIsAvailableByDuration(false, course, null, null, context.getCourseMembership());
        
        return courseAvailable == this.requireAvilable;
    }
    
}
