package org.oscelot.jshack.service;

import org.oscelot.jshack.model.BbRole;

import java.util.List;

public interface BbRoleService {

    public List<BbRole> getSystemRoles();
    public List<BbRole> getCourseRoles();
    public List<BbRole> getInstitutionRoles();

}
