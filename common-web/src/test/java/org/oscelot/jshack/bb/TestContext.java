package org.oscelot.jshack.bb;

import blackboard.data.content.Content;
import blackboard.data.course.Course;
import blackboard.data.course.CourseMembership;
import blackboard.data.course.Group;
import blackboard.data.course.GroupMembership;
import blackboard.data.navigation.NavigationItem;
import blackboard.data.user.User;
import blackboard.persist.Id;
import blackboard.persist.PersistenceException;
import blackboard.platform.context.Context;
import blackboard.platform.security.Entitlements;
import blackboard.platform.security.SecurityContext;
import blackboard.platform.session.BbSession;
import blackboard.platform.vxi.data.VirtualHost;
import blackboard.platform.vxi.data.VirtualInstallation;
import blackboard.platform.vxi.service.VirtualSystemException;
import blackboard.platform.workctx.WorkContextInfo;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Created by wiley on 20/07/14.
 */
public class TestContext implements Context {
    @Override
    public boolean hasContentContext() {
        return false;
    }

    @Override
    public boolean hasUserContext() {
        return false;
    }

    @Override
    public boolean hasCourseContext() {
        return false;
    }

    @Override
    public boolean hasGroupContext() {
        return false;
    }

    @Override
    public boolean hasSystemContext() {
        return false;
    }

    @Override
    public boolean hasRequestContext() {
        return false;
    }

    @Override
    public void setAttribute(String s, Object o) {

    }

    @Override
    public Object getAttribute(String s) {
        return null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Object removeAttribute(String s) {
        return null;
    }

    @Override
    public BbSession getSession() {
        return null;
    }

    @Override
    public void setContextOverride(OverrideType overrideType) {

    }

    @Override
    public OverrideType getContextOverride() {
        return null;
    }

    @Override
    public List<SecurityContext> getSecurityContexts() {
        return null;
    }

    @Override
    public Id getContentId() {
        return null;
    }

    @Override
    public Content getContent() {
        return null;
    }

    @Override
    public Content getAvailableContent() {
        return null;
    }

    @Override
    public Id getCourseId() {
        return null;
    }

    @Override
    public Course getCourse() {
        return null;
    }

    @Override
    public CourseMembership getCourseMembership() {
        return null;
    }

    @Override
    public Entitlements getEntitlements() {
        return null;
    }

    @Override
    public Id getGroupId() {
        return null;
    }

    @Override
    public Group getGroup() {
        return null;
    }

    @Override
    public GroupMembership getGroupMembership() {
        return null;
    }

    @Override
    public List<NavigationItem> getNavigationBridgeList() {
        return null;
    }

    @Override
    public WorkContextInfo getWorkContext() {
        return null;
    }

    @Override
    public Id getTabId() {
        return null;
    }

    @Override
    public Id getTabTabGroupId() {
        return null;
    }

    @Override
    public String getBrowserLocale() {
        return null;
    }

    @Override
    public String getGuestSessionLocale() {
        return null;
    }

    @Override
    public String getRequestParameter(String s) {
        return null;
    }

    @Override
    public Object getRequestAttribute(String s) {
        return null;
    }

    @Override
    public String getRequestUrl() {
        return null;
    }

    @Override
    public HttpSession getHttpSession() {
        return null;
    }

    @Override
    public String getHostName() {
        return null;
    }

    @Override
    public String getIPAddress() {
        return null;
    }

    @Override
    public VirtualInstallation getVirtualInstallation() throws VirtualSystemException, PersistenceException {
        return null;
    }

    @Override
    public VirtualHost getVirtualHost() throws VirtualSystemException, PersistenceException {
        return null;
    }

    @Override
    public Id getUserId() {
        return null;
    }

    @Override
    public User getUser() {
        return null;
    }

    @Override
    public String getLocale() {
        return null;
    }
}
