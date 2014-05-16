<%--
  Created by IntelliJ IDEA.
  User: wiley
  Date: 3/05/14
  Time: 5:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"
           prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions"
           prefix="fn" %>

<html>
<head>
    <title>Hacks List (Test Application)</title>
</head>
<body>
    <h1>Hacks List (Test Application)</h1>
    <a href="Editor.action">Create New Hack</a>
    <p>Hack Count: ${fn:length(actionBean.hacks)}</p>
    <c:choose>
        <c:when test="${empty actionBean.hacks}">
            <i>No Hacks to Display.</i>
        </c:when>
        <c:otherwise>
            <c:forEach items="${actionBean.hacks}" var="currHack">
                <a href="Editor.action?hackid=${currHack.identifier}">${currHack.identifier}</a><br>
            </c:forEach>
        </c:otherwise>
    </c:choose>
</body>
</html>
