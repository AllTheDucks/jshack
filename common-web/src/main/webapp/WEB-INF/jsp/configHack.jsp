<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- 
    Document   : configHack.jsp
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
<fmt:message var="title" key="jsh.configHackPage.title" />
<fmt:message var="pageHelp" key="jsh.configHackPage.pageHelp" />

<fmt:message var="buttonDownloadConfigText" key="jsh.configHackPage.button.downloadConfig" />
<fmt:message var="buttonUploadConfigText" key="jsh.configHackPage.button.uploadConfig" />

<fmt:message var="stepConfigureText" key="jsh.configHackPage.step.configure" />
<fmt:message var="stepSubmitText" key="jsh.configHackPage.step.submit" />

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
  <bbNG:actionControlBar showWhenEmpty="true">
      <bbNG:actionButton title="${buttonUploadConfigText}" url="ConfigHack.action?uploadConfig&hackId=${actionBean.hackInstance.hack.identifier}" primary="true"></bbNG:actionButton>
        <c:if test="${actionBean.hackInstance.hasConfig}">
      <bbNG:actionButton title="${buttonDownloadConfigText}" url="ConfigHack.action?downloadConfig&hackId=${actionBean.hackInstance.hack.identifier}" primary="true"></bbNG:actionButton>
      </c:if>
    </bbNG:actionControlBar>
  <stripes:form beanclass="org.oscelot.jshack.stripes.ConfigHackAction" method="POST">
    <stripes:hidden name="updateConfig" />
    <stripes:hidden name="hackId" value="${hackId}" />
    <bbNG:dataCollection>
      <bbNG:step title="${stepConfigureText}">
          <bbNG:stepInstructions text="Leave fields blank for default." />
              <c:set var="i" value="0"/> 
              <c:forEach items="${actionBean.hackInstance.hack.configEntryDefinitions}" var="configEntryDef">
                  <bbNG:dataElement label="${configEntryDef.name}" isRequired="false">
                    <stripes:hidden name="configEntries[${i}].identifier" value="${configEntryDef.identifier}" />
                    <stripes:text name="configEntries[${i}].value" style="width:35em;" value="${bbNG:EncodeHtml(actionBean.hackInstance.configEntriesMapExcludingDefaults[configEntryDef.identifier])}" class="configEntryTextbox"/>
                    <div class="configEntryDescription">${bbNG:EncodeHtml(configEntryDef.description)}</div>
                    <pre class="configEntryDefaultValue">${bbNG:EncodeHtml(configEntryDef.defaultValue)}</pre>
                  </bbNG:dataElement>
                  <c:set var="i" value="${i+1}"/> 
              </c:forEach>
      </bbNG:step>

      <bbNG:stepSubmit cancelUrl="ListHacks.action"><bbNG:stepSubmitButton label="${stepSubmitText}" id="submitUploadHackButton"/></bbNG:stepSubmit>
    </bbNG:dataCollection>

  </stripes:form>
</bbNG:genericPage>