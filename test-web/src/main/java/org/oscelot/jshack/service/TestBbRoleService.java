package org.oscelot.jshack.service;

import org.oscelot.jshack.model.BbRole;

import java.util.ArrayList;
import java.util.List;

public class TestBbRoleService implements BbRoleService {

    static List<BbRole> systemRoles;
    static List<BbRole> courseRoles;
    static List<BbRole> institutionRoles;

    static {
        systemRoles = new ArrayList<BbRole>();
        systemRoles.add(new BbRole("Z", "System Administrator"));
        systemRoles.add(new BbRole("H", "System Support"));
        systemRoles.add(new BbRole("C", "Course Administrator"));
        systemRoles.add(new BbRole("A", "User Administrator"));
        systemRoles.add(new BbRole("Y", "Community Administrator"));
        systemRoles.add(new BbRole("U", "Guest"));
        systemRoles.add(new BbRole("N", "None"));
        systemRoles.add(new BbRole("O", "Observer"));
        systemRoles.add(new BbRole("R", "Support"));

        courseRoles = new ArrayList<BbRole>();
        courseRoles.add(new BbRole("B", "Unit Builder"));
        courseRoles.add(new BbRole("G", "Grader"));
        courseRoles.add(new BbRole("P", "Instructor"));
        courseRoles.add(new BbRole("S", "Student"));
        courseRoles.add(new BbRole("T", "Teaching Assistant"));
        courseRoles.add(new BbRole("U", "Guest"));

        institutionRoles = new ArrayList<BbRole>();
        institutionRoles.add(new BbRole("student", "Student"));
        institutionRoles.add(new BbRole("staff", "Staff"));
        institutionRoles.add(new BbRole("sob", "School of Beef"));
        institutionRoles.add(new BbRole("soc", "School of Chicken"));
        institutionRoles.add(new BbRole("sol", "School of Lamb"));
        institutionRoles.add(new BbRole("sof", "School of Frog"));
        institutionRoles.add(new BbRole("sop", "School of Pork"));
        institutionRoles.add(new BbRole("soq", "School of Quail"));
        institutionRoles.add(new BbRole("fom", "Faculty of Meat"));
    }

    @Override
    public List<BbRole> getSystemRoles() {
        return systemRoles;
    }

    @Override
    public List<BbRole> getCourseRoles() {
        return courseRoles;
    }

    @Override
    public List<BbRole> getInstitutionRoles() {
        return institutionRoles;
    }
}
