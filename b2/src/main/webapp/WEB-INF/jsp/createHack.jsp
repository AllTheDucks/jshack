<!DOCTYPE html>
<%--
    Document   : createHack.jsp
    Created on : 21/07/2011, 12:33:41 PM
    Author     : Wiley Fuller <wfuller@swin.edu.au>

    Copyright Swinburne University of Technology, 2011.
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib uri="/bbNG" prefix="bbNG"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://stripes.sourceforge.net/stripes.tld" prefix="stripes" %>



<fmt:message var="pluginPageStr" key="admin_plugin_manage.label" bundle="${bundles.navigation_item}"/>
<fmt:message var="listHacksPageTitle" key="jsh.listHacksPage.title" />
<fmt:message var="title" key="jsh.createHackPage.title" />
<fmt:message var="pageHelp" key="jsh.createHackPage.pageHelp" />

<fmt:message var="stepHackDetailsText" key="jsh.createHackPage.step.hackDetails" />
<fmt:message var="labelNameText" key="jsh.createHackPage.label.name" />
<fmt:message var="labelDescriptionText" key="jsh.createHackPage.label.description" />
<fmt:message var="labelIdentifierText" key="jsh.createHackPage.label.identifier" />
<fmt:message var="labelVersionText" key="jsh.createHackPage.label.version" />
<fmt:message var="labelMinVersionText" key="jsh.createHackPage.label.minVersion" />
<fmt:message var="labelMaxVersionText" key="jsh.createHackPage.label.maxVersion" />
<fmt:message var="stepDeveloperText" key="jsh.createHackPage.step.developer" />
<fmt:message var="labelDeveloperNameText" key="jsh.createHackPage.label.developerName" />
<fmt:message var="labelDeveloperInstitutionText" key="jsh.createHackPage.label.developerInstitution" />
<fmt:message var="labelDeveloperURLText" key="jsh.createHackPage.label.developerURL" />
<fmt:message var="labelDeveloperEmailText" key="jsh.createHackPage.label.developerEmail" />
<fmt:message var="stepInjectedContentText" key="jsh.createHackPage.step.injectedContent" />
<fmt:message var="labelSnippetText" key="jsh.createHackPage.label.snippet" />
<fmt:message var="labelInjectionPointText" key="jsh.createHackPage.label.injectionPoint" />
<fmt:message var="labelResourcesText" key="jsh.createHackPage.label.resources" />
<fmt:message var="labelFileText" key="jsh.createHackPage.label.file" />
<fmt:message var="labelMimeTypeText" key="jsh.createHackPage.label.mimeType" />
<fmt:message var="labelExampleFileReferenceText" key="jsh.createHackPage.label.exampleFileReference" />
<fmt:message var="buttonRemoveResourceText" key="jsh.createHackPage.button.removeResource" />
<fmt:message var="buttonAddResourceText" key="jsh.createHackPage.button.addResource" />
<fmt:message var="stepResourcesText" key="jsh.createHackPage.step.resources" />
<fmt:message var="labelResourcesText" key="jsh.createHackPage.label.resourcesList" />
<fmt:message var="labelTypeText" key="jsh.createHackPage.label.type" />
<fmt:message var="labelInvertNoText" key="jsh.createHackPage.label.invertNo" />
<fmt:message var="labelInvertYesText" key="jsh.createHackPage.label.invertYes" />
<fmt:message var="labelValueText" key="jsh.createHackPage.label.value" />
<fmt:message var="buttonRemoveRestrictionText" key="jsh.createHackPage.button.removeRestriction" />
<fmt:message var="buttonAddRestrictionText" key="jsh.createHackPage.button.addRestriction" />
<fmt:message var="buttonAddInjPointText" key="jsh.createHackPage.button.addInjectionPoint" />
<fmt:message var="stepSaveText" key="jsh.createHackPage.step.save" />
<fmt:message var="stepSaveExitText" key="jsh.createHackPage.step.saveExit" />

<fmt:message var="injectionPointTopFrameText" key="jsh.injectionPoint.jsp.topFrame.start" />
<fmt:message var="injectionPointFramesetText" key="jsh.injectionPoint.jsp.frameset.start" />
<fmt:message var="injectionPointLearningSystemPageText" key="jsh.injectionPoint.tag.learningSystemPage.start" />
<fmt:message var="injectionPointEditModeButtonText" key="jsh.injectionPoint.tag.editModeViewToggle.start" />

<fmt:message var="restrictionUrlText" key="jsh.restriction.url" />
<fmt:message var="restrictionEntitlementText" key="jsh.restriction.entitlement" />
<fmt:message var="restrictionAdvancedText" key="jsh.restriction.advanced" />
<fmt:message var="restrictionCourseRoleText" key="jsh.restriction.courseRole" />
<fmt:message var="restrictionSystemRoleText" key="jsh.restriction.systemRole" />
<fmt:message var="restrictionPortalRoleText" key="jsh.restriction.portalRole" />
<fmt:message var="restrictionCourseAvailabilityText" key="jsh.restriction.courseAvailability" />
<fmt:message var="restrictionRequestParameterText" key="jsh.restriction.requestParameter" />


<bbNG:genericPage title="${title}" ctxId="ctx" >
    <bbNG:cssFile href="css/default.css"/>


    <%-- <script type="text/javascript" src="js/ace/ace.js"></script>
    <bbNG:jsFile href="js/soyutils.js"/>
    <bbNG:jsFile href="js/jsh-tpl.js"/>
    <bbNG:jsFile href="js/jsh-utils.js"/>
    <bbNG:jsFile href="js/jsh-core.js"/> --%>
    <bbNG:jsFile href="/javascript/scriptaculous/version_pinned_scriptaculous.js"/>

    <bbNG:pageHeader instructions="${pageHelp}">
        <bbNG:breadcrumbBar environment="SYS_ADMIN" >
            <bbNG:breadcrumb href="../blackboard/admin/manage_plugins.jsp" title="${pluginPageStr}" />
            <bbNG:breadcrumb href="ListHacks.action" title="${listHacksPageTitle}" />
            <bbNG:breadcrumb title="${title}"/>
        </bbNG:breadcrumbBar>
        <bbNG:pageTitleBar title="${title}" />
    </bbNG:pageHeader>
    <input type="hidden" name="saveHackPackage" />
    <bbNG:dataCollection>
        <bbNG:step title="${stepHackDetailsText}" >
            <bbNG:dataElement label="${labelNameText}" isRequired="true">
                <input type="text" name="hack.name" style="width:35em;" id="hack.name" value="${actionBean.hack.name}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelDescriptionText}" isRequired="true">
                <input type="text" name="hack.description" style="width:35em;" id="hack.description" value="${actionBean.hack.description}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelIdentifierText}" isRequired="true">
                <input type="text" name="hack.identifier" id="hack.identifier"
                       <c:if test="${!empty actionBean.hack.identifier}">disabled="disabled"</c:if>
                       maxlength="20" size="20"  value="${actionBean.hack.identifier}"/>
                <c:if test="${!empty actionBean.hack.identifier}">
                    <input type="hidden" name="hack.identifier"  value="${actionBean.hack.identifier}"/>
                </c:if>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelVersionText}">
                <input type="text" name="hack.version" id="hack.version"  value="${actionBean.hack.version}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelMinVersionText}">
                <input type="text" name="hack.targetVersionMin" id="hack.targetVersionMin" value="${actionBean.hack.targetVersionMin}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelMaxVersionText}">
                <input type="text" name="hack.targetVersionMax" id="hack.targetVersionMax" value="${actionBean.hack.targetVersionMax}"/>
            </bbNG:dataElement>
        </bbNG:step>

        <bbNG:step title="${stepDeveloperText}">
            <bbNG:dataElement label="${labelDeveloperNameText}">
                <input type="text" name="hack.developerName" id="hack.developerName"  value="${actionBean.hack.developerName}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelDeveloperInstitutionText}">
                <input type="text" name="hack.developerInstitution" id="hack.developerInstitution" value="${actionBean.hack.developerInstitution}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelDeveloperURLText}">
                <input type="text" name="hack.developerURL" id="hack.developerURL" value="${actionBean.hack.developerURL}"/>
            </bbNG:dataElement>
            <bbNG:dataElement label="${labelDeveloperEmailText}">
                <input type="text" name="hack.developerEmail" id="hack.developerEmail"  value="${actionBean.hack.developerEmail}"/>
            </bbNG:dataElement>
        </bbNG:step>

        <bbNG:step title="${stepResourcesText}" >
            <bbNG:dataElement label="${labelResourcesText}">
                <%--           <div id="jsh-resources"></div>
                <button onclick="$('jsh_newResourceSelector').click();
                        return false;">Add a New Resource</button>
                <input type="file" id="jsh_newResourceSelector" style="visibility: hidden;">
            </bbNG:dataElement>
        </bbNG:step>

        <bbNG:step title="${stepInjectedContentText}" optionalClass="">
            <bbNG:dataElement label="${labelSnippetText}">  --%>
                <div class="jsh-tabbar" id="jsh-tabbar">
                </div>
                <div class="snippetBlock">
                    <div id="editorContainer" class="editorContainer">
                        <div id="snippetEditor"><c:out value="Snippet details go here.. blah blah" escapeXml="true" /></div>
                    </div>
                    <input type="hidden" name="hack.snippet" id="snippetInput"/>
                    <br>
                    <input type="checkbox" name="jsh-snippet-embed" value="hack.snippet.embed" id="jsh-snippet-embed"><label for="tag.learningSystemPage.start">Embed this resource in the page.</label><br>
                    <hr>
                    <input type="checkbox" name="jsh-hooks" value="tag.learningSystemPage.start" id="tag.learningSystemPage.start"><label for="tag.learningSystemPage.start">Learning System Page (tag.learningSystemPage.start)</label><br>
                    <input type="checkbox" name="jsh-hooks" value="tag.editModeViewToggle.start" id="tag.editModeViewToggle.start"><label for="tag.editModeViewToggle.start">Edit Mode Toggle (tag.editModeViewToggle.start)</label><br>
                    <input type="checkbox" name="jsh-hooks" value="jsp.topFrame.start" id="jsp.topFrame.start"><label for="jsp.topFrame.start">Top Frame (jsp.topFrame.start)</label><br>
                    <input type="checkbox" name="jsh-hooks" value="jsp.frameset.start" id="jsp.frameset.start"><label for="jsp.frameset.start">Frameset (jsp.frameset.start)</label><br>
                    <hr>
                    <div id="jsh-restrictions"></div>
                    <button id="jsh_addRestrictionButton" class="jsh-addRestBut button-2">${buttonAddRestrictionText}</button>
                </div>
            </bbNG:dataElement>
        </bbNG:step>


        <bbNG:stepSubmit cancelUrl="ListHacks.action">
            <bbNG:stepSubmitButton label="${stepSaveExitText}" id="submitHackButton"/>
            <bbNG:stepSubmitButton label="${stepSaveText}" id="saveHackButton"/>
        </bbNG:stepSubmit>
    </bbNG:dataCollection>


    <script type="text/javascript">
        window.hackModel = ${actionBean.hackJSON};
        window.defaultSnippet = ${actionBean.defaultSnippet};
    </script>

    <script type="text/javascript" src="js/ace/ace.js"></script>
    <c:choose>
        <c:when test="${actionBean.jsDebug}">
            <script type="text/javascript" src="http://localhost:9810/compile?id=jshack-dev"></script>
        </c:when>
        <c:otherwise>
            <script type="text/javascript" src="js/jsh-compiled.js"></script>
        </c:otherwise>
    </c:choose>

    <div id="jsh-newcm" class="cmdiv" style="display: none; z-index: 200; left: 0px; top: 0px;">
        <ul>
            <li><a href="#">Upload Resource</a></li>
            <li><a href="#">Create New Resource</a></li></ul>
    </div>
</bbNG:genericPage>