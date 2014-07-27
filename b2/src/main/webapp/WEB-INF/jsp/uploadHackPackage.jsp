<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- 
    Document   : uploadHackPackage.jsp
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
<fmt:message var="title" key="jsh.uploadHackPackagePage.title" />
<fmt:message var="pageHelp" key="jsh.uploadHackPackagePage.pageHelp" />
<fmt:message var="stepUploadText" key="jsh.uploadHackPackagePage.step.upload" />
<fmt:message var="labelFileSelectionText" key="jsh.uploadHackPackagePage.label.fileSelection" />
<fmt:message var="labelOverwriteText" key="jsh.uploadHackPackagePage.label.overwrite" />
<fmt:message var="stepSubmitText" key="jsh.uploadHackPackagePage.step.submit" />


<bbNG:genericPage title="${title}" ctxId="ctx" >
  <bbNG:cssFile href="css/default.css?2"/>
  <bbNG:pageHeader instructions="${pageHelp}">
    <bbNG:breadcrumbBar environment="SYS_ADMIN" >
      <bbNG:breadcrumb href="../blackboard/admin/manage_plugins.jsp" title="${pluginPageStr}" />
      <bbNG:breadcrumb href="ListHacks.action" title="${listHacksPageTitle}" />
      <bbNG:breadcrumb title="${title}"/>
    </bbNG:breadcrumbBar>
    <bbNG:pageTitleBar title="${title}" />
  </bbNG:pageHeader>
  <stripes:form beanclass="org.oscelot.jshack.stripes.UploadHackPackageAction" enctype="multipart/form-data" method="POST">
    <stripes:hidden name="uploadHackPackage" />
    <stripes:errors globalErrorsOnly="true"/>
    <bbNG:dataCollection>
      <bbNG:step title="${stepUploadText}">
        <bbNG:dataElement label="${labelFileSelectionText}">
          <stripes:file name="packageFile" />
        </bbNG:dataElement>
          <stripes:checkbox name="overwritePackage" id="overwritePackage" /><label for="overwritePackage">${labelOverwriteText}</label>
      </bbNG:step>

          <bbNG:stepSubmit cancelUrl="ListHacks.action"><bbNG:stepSubmitButton label="${stepSubmitText}" id="submitUploadHackButton"/></bbNG:stepSubmit>
    </bbNG:dataCollection>

  </stripes:form>
</bbNG:genericPage>