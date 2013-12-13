/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack;

import blackboard.data.course.Course;
import blackboard.data.course.CourseMembership;
import blackboard.data.course.CourseUtil;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.oscelot.jshack.model.Restriction;
import org.oscelot.jshack.model.restrictions.*;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class RestrictionCompiler {

    private static Boolean courseIsAvailableByDurationFound = null;

    public static CompiledRestriction compileRestriction(Restriction r) {
        CompiledRestriction cr;

        try {
            switch (r.getType()) {
                case URL:
                    cr = new URLRestriction();
                    ((URLRestriction) cr).setURLPatternString(r.getValue());
                    break;
                case ENTITLEMENT:
                    cr = new EntitlementRestriction();
                    ((EntitlementRestriction) cr).setEntitlementUID(r.getValue());
                    break;
                case ADVANCED:
                    cr = new AdvancedRestriction();
                    ((AdvancedRestriction) cr).setExpression(r.getValue());
                    break;

                case COURSE_AVAILABILITY:
                    if (isCourseIsAvailableByDurationFound()) {
                        cr = new AdvancedCourseAvailabilityRestriction();
                    } else {
                        cr = new CourseAvailabilityRestriction();
                    }

                    ((CourseAvailabilityRestriction) cr).setRequireAvilable(Boolean.parseBoolean(r.getValue()));
                    break;

                case SYSTEM_ROLE:
                    cr = new SystemRoleRestriction();
                    ((SystemRoleRestriction) cr).setRolesByPatternString(r.getValue());
                    break;

                case PORTAL_ROLE:
                    cr = new PortalRoleRestriction();
                    ((PortalRoleRestriction) cr).setRolesByPatternString(r.getValue());
                    break;

                case COURSE_ROLE:
                    cr = new CourseRoleRestriction();
                    ((CourseRoleRestriction) cr).setRolesByPatternString(r.getValue());
                    break;

                case REQUEST_PARAMETER:
                    RequestParameterRestriction rpr = new RequestParameterRestriction();
                    String[] valueArray = r.getValue().split("=", 2);
                    rpr.setParameterName(valueArray[0]);
                    if (valueArray.length == 2) {
                        rpr.setParameterValuePatternString(valueArray[1]);
                    }
                    cr = rpr;
                    break;

                default:
                    return null;
            }
        } catch (Exception e) {
            return null;
        }

        cr.setInverse(r.isInverse());
        return cr;
    }

    public static List<CompiledRestriction> compileRestrictions(List<Restriction> rs) {
        List<CompiledRestriction> result;
        if (rs != null && rs.size() > 0) {
            result = new ArrayList<CompiledRestriction>(rs.size());
            for (Restriction r : rs) {
                CompiledRestriction cr = compileRestriction(r);
                if (cr != null) {
                    result.add(compileRestriction(r));
                }
            }
        } else {
            result = new ArrayList<CompiledRestriction>(0);
        }

        Collections.sort(result, new CompiledRestrictionPriorityComparator());
        return result;
    }

    private static boolean isCourseIsAvailableByDurationFound() {
        if (courseIsAvailableByDurationFound == null) {
            Method m = null;
            try {
                m = CourseUtil.class.getMethod("courseIsAvailableByDuration", boolean.class, Course.class, Date.class, List.class, CourseMembership.class);
            } catch (Exception e) {
            }

            if (m != null) {
                courseIsAvailableByDurationFound = true;
            } else {
                courseIsAvailableByDurationFound = false;
            }
        }
        return courseIsAvailableByDurationFound.booleanValue();
    }
}
