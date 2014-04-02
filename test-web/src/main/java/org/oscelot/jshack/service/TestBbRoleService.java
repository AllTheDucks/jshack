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
        systemRoles.add(new BbRole("sys1", "System Role 1"));
        systemRoles.add(new BbRole("sys2", "System Role 2"));
        systemRoles.add(new BbRole("sys3", "System Role 3"));
        systemRoles.add(new BbRole("sys4", "System Role 4"));
        systemRoles.add(new BbRole("sys5", "System Role 5"));

        courseRoles = new ArrayList<BbRole>();
        courseRoles.add(new BbRole("course1", "Course Role 1"));
        courseRoles.add(new BbRole("course2", "Course Role 2"));
        courseRoles.add(new BbRole("course3", "Course Role 3"));
        courseRoles.add(new BbRole("course4", "Course Role 4"));
        courseRoles.add(new BbRole("course5", "Course Role 5"));

        institutionRoles = new ArrayList<BbRole>();
        institutionRoles.add(new BbRole("inst1", "Institution Role 1"));
        institutionRoles.add(new BbRole("inst1", "Institution Role 2"));
        institutionRoles.add(new BbRole("inst1", "Institution Role 3"));
        institutionRoles.add(new BbRole("inst1", "Institution Role 4"));
        institutionRoles.add(new BbRole("inst1", "Institution Role 5"));
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
