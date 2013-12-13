<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- 
    Document   : uploadConfig.jsp
    Author     : Shane Argo <sargo@usc.edu.au>
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib uri="/bbNG" prefix="bbNG"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://stripes.sourceforge.net/stripes.tld" prefix="stripes" %>  
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>



<fmt:message var="pluginPageStr" key="admin_plugin_manage.label" bundle="${bundles.navigation_item}"/>
<fmt:message var="listHacksPageTitle" key="jsh.listHacksPage.title" />
<fmt:message var="configHackPageTitle" key="jsh.configHackPage.title" />
<fmt:message var="title" key="jsh.uploadConfigPage.title" />
<fmt:message var="pageHelp" key="jsh.uploadConfigPage.pageHelp" />
<fmt:message var="stepUploadText" key="jsh.uploadConfigPage.step.upload" />
<fmt:message var="labelFileSelectionText" key="jsh.uploadConfigPage.label.fileSelection" />
<fmt:message var="stepSubmitText" key="jsh.uploadConfigPage.step.submit" />


<bbNG:genericPage title="${title}" ctxId="ctx" >
  <bbNG:cssFile href="css/default.css?2"/>
  <bbNG:pageHeader instructions="${pageHelp}">
    <bbNG:breadcrumbBar environment="SYS_ADMIN" >
      <bbNG:breadcrumb href="../blackboard/admin/manage_plugins.jsp" title="${pluginPageStr}" />
      <bbNG:breadcrumb href="ListHacks.action" title="${listHacksPageTitle}" />
      <bbNG:breadcrumb href="ConfigHack.action?hackId=${actionBean.hackId}" title="${configHackPageTitle}" />
      <bbNG:breadcrumb title="${title}"/>
    </bbNG:breadcrumbBar>
    <bbNG:pageTitleBar title="${title}" />
  </bbNG:pageHeader>
  <stripes:form beanclass="org.oscelot.jshack.stripes.ConfigHackAction" enctype="multipart/form-data" method="POST">
    <stripes:hidden name="takeUploadConfig" />
    <stripes:hidden name="hackId" value="${actionBean.hackId}"/>
    <stripes:errors globalErrorsOnly="true"/>
    <bbNG:dataCollection>
      <bbNG:step title="${stepUploadText}">
        <bbNG:dataElement label="${labelFileSelectionText}">
          <stripes:file name="configFile" />
        </bbNG:dataElement>
      </bbNG:step>

          <bbNG:stepSubmit cancelUrl="ListHacks.action"><bbNG:stepSubmitButton label="${stepSubmitText}" id="submitUploadHackButton"/></bbNG:stepSubmit>
    </bbNG:dataCollection>

  </stripes:form>
</bbNG:genericPage>