<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- 
    Document   : confirmDelete.jsp
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
<fmt:message var="title" key="jsh.confirmDeleteHackPage.title" />
<fmt:message var="pageHelp" key="jsh.confirmDeleteHackPage.pageHelp" />
<fmt:message var="stepReviewText" key="jsh.confirmDeleteHackPage.step.review" />
<fmt:message var="stepSubmitText" key="jsh.confirmDeleteHackPage.step.submit" />
<fmt:message var="labelNameText" key="jsh.confirmDeleteHackPage.label.name" />
<fmt:message var="labelDescriptionText" key="jsh.confirmDeleteHackPage.label.description" />
<fmt:message var="labelIdentifierText" key="jsh.confirmDeleteHackPage.label.identifier" />

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
  <stripes:form beanclass="org.oscelot.jshack.stripes.DeleteHackAction" method="POST">
      <stripes:hidden name="deleteHackPackage" />
      <stripes:hidden name="hackId" value="${hackId}" />
    <bbNG:dataCollection>
      <bbNG:step title="${stepReviewText}">
            <bbNG:dataElement label="${labelNameText}">${actionBean.hack.name}</bbNG:dataElement>
            <bbNG:dataElement label="${labelDescriptionText}">${actionBean.hack.description}</bbNG:dataElement>
            <bbNG:dataElement label="${labelIdentifierText}">${actionBean.hack.identifier}</bbNG:dataElement>
      </bbNG:step>

      <bbNG:stepSubmit cancelUrl="ListHacks.action"><bbNG:stepSubmitButton label="${stepSubmitText}" id="submitUploadHackButton"/></bbNG:stepSubmit>
    </bbNG:dataCollection>

  </stripes:form>
</bbNG:genericPage>