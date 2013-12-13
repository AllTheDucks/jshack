<!DOCTYPE html>
<%-- 
    Document   : listHacks.jsp
    Created on : 21/07/2011, 12:33:41 PM
    Author     : Wiley Fuller <wfuller@swin.edu.au>
    Copyright Swinburne University of Technology, 2011.
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib uri="/bbNG" prefix="bbNG"%>
<%@taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>



<fmt:message var="pluginPageStr" key="admin_plugin_manage.label" bundle="${bundles.navigation_item}"/>
<fmt:message var="title" key="jsh.listHacksPage.title" />
<fmt:message var="pageHelp" key="jsh.listHacksPage.pageHelp" />
<fmt:message var="buttonCreateHackText" key="jsh.listHacksPage.button.createHack" />
<fmt:message var="buttonUploadHackPackageText" key="jsh.listHacksPage.button.uploadHackPackage" />
<fmt:message var="buttonForceReloadText" key="jsh.listHacksPage.button.forceReload" />
<fmt:message var="menuConfigText" key="jsh.listHacksPage.menuItem.config" />
<fmt:message var="menuEditText" key="jsh.listHacksPage.menuItem.edit" />
<fmt:message var="menuDeleteText" key="jsh.listHacksPage.menuItem.delete" />
<fmt:message var="menuDownloadText" key="jsh.listHacksPage.menuItem.download" />
<fmt:message var="menuEnableText" key="jsh.listHacksPage.menuItem.enable" />
<fmt:message var="menuDisableText" key="jsh.listHacksPage.menuItem.disable" />
<fmt:message var="imgaltEnabledText" key="jsh.listHacksPage.imgalt.enabled" />
<fmt:message var="imgaltDisabledText" key="jsh.listHacksPage.imgalt.disabled" />
<fmt:message var="labelHackIdText" key="jsh.listHacksPage.label.hackId" />
<fmt:message var="labelVersionText" key="jsh.listHacksPage.label.version" />
<fmt:message var="labelMinBbVersionText" key="jsh.listHacksPage.label.minBbVersion" />
<fmt:message var="labelMaxBbVersionText" key="jsh.listHacksPage.label.maxBbVersion" />
<fmt:message var="labelEnabledText" key="jsh.listHacksPage.label.enabled" />
<fmt:message var="labelDeveloperNameText" key="jsh.listHacksPage.label.developerName" />


<bbNG:genericPage title="${title}" ctxId="ctx" >
  <bbNG:cssFile href="css/default.css"/>
  
  <bbNG:pageHeader instructions="${pageHelp}">
    <bbNG:breadcrumbBar environment="SYS_ADMIN" >
      <bbNG:breadcrumb href="../blackboard/admin/manage_plugins.jsp" title="${pluginPageStr}" />
      <bbNG:breadcrumb title="${title}"/>
    </bbNG:breadcrumbBar>
    <bbNG:pageTitleBar title="${title}" />
  </bbNG:pageHeader>


  <bbNG:hierarchyList reorderable="false" >

    <bbNG:actionControlBar showWhenEmpty="true">
      <bbNG:actionButton title="${buttonCreateHackText}" url="CreateHack.action" primary="true"></bbNG:actionButton>
      <bbNG:actionButton title="${buttonUploadHackPackageText}" url="UploadHackPackage.action" primary="true"></bbNG:actionButton>
      <bbNG:actionButton title="${buttonForceReloadText}" url="ReloadHackPackages.action" primary="false"></bbNG:actionButton>
    </bbNG:actionControlBar>
    <c:forEach items="${actionBean.hackInstances}" var="hack">
        <c:set var="hackDefn" value="${hack.hack}" />
      <bbNG:hierarchyListItem title="${hackDefn.name}">
        <bbNG:delegateContextMenu>
          <bbNG:contextMenuItem title="${menuConfigText}" url="ConfigHack.action?hackId=${hackDefn.identifier}"></bbNG:contextMenuItem>
          <bbNG:contextMenuItem title="${menuEditText}" url="CreateHack.action?hackId=${hackDefn.identifier}"></bbNG:contextMenuItem>
          <bbNG:contextMenuItem title="${menuDeleteText}" url="DeleteHack.action?hackId=${hackDefn.identifier}"></bbNG:contextMenuItem>
          <bbNG:contextMenuItem title="${menuDownloadText}" url="DownloadHackPackage.action?hackId=${hackDefn.identifier}"></bbNG:contextMenuItem>
          <c:choose>
            <c:when test="${hack.enabled}"><bbNG:contextMenuItem title="${menuDisableText}" url="SetHackStatus.action?disableHack&hackId=${hackDefn.identifier}"></bbNG:contextMenuItem></c:when>
            <c:otherwise><bbNG:contextMenuItem title="${menuEnableText}" url="SetHackStatus.action?enableHack&hackId=${hackDefn.identifier}"></bbNG:contextMenuItem></c:otherwise>
        </c:choose>
        </bbNG:delegateContextMenu>
          <c:if test="${not empty hackDefn.developerName}">
            <p><em>${hackDefn.developerName} | ${hackDefn.developerInstitution} | <a href="${hackDefn.developerURL}">${hackDefn.developerURL}</a> | <a href="mailto:${hackDefn.developerEmail}">${hackDefn.developerEmail}</a></em></p>
          </c:if>
        <p><c:choose>
            <c:when test="${hack.enabled}"><span class="disabledIcon"><img src="/images/ci/icons/check.gif" alt="${imgaltEnabledText}" title="${imgaltEnabledText}"/></span></c:when>
            <c:otherwise><span class="disabledIcon"><img src="/images/ci/icons/x.gif"  alt="${imgaltDisabledText}" title="${imgaltDisabledText}"/></span></c:otherwise>
        </c:choose>
        ${hackDefn.description}</p>
        <bbNG:itemDetail title="${labelHackIdText}" value="${hackDefn.identifier}"/>
        <bbNG:itemDetail title="${labelVersionText}" value="${hackDefn.version}"/>
        <bbNG:itemDetail title="${labelMinBbVersionText}" value="${hackDefn.targetVersionMin}"/>
        <bbNG:itemDetail title="${labelMaxBbVersionText}" value="${hackDefn.targetVersionMax}"/>
        <bbNG:itemDetail title="${labelEnabledText}" value="${hack.enabled}"/>
      </bbNG:hierarchyListItem>
    </c:forEach>
  </bbNG:hierarchyList>


</bbNG:genericPage>