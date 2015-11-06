<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

    <c:choose>
        <c:when test="${actionBean.dev}">
            <link rel="stylesheet" href="http://localhost:9810/css/jshack-common-web/"/>
        </c:when>
        <c:otherwise>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css"/>
        </c:otherwise>
    </c:choose>
    <script src="${pageContext.request.contextPath}/js/ace/ace.js"></script>
    <script src="${pageContext.request.contextPath}/js/ace/ext-language_tools.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/font-awesome-4.0.3/css/font-awesome.min.css">


    <title>Javascript Hacks Editor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<script type="application/javascript">
    window.hackid = "${actionBean.hackId}";
    window.jshRootUri = "/jshack-test-web";
</script>
<c:choose>
    <c:when test="${actionBean.dev}">
        <script src="http://localhost:9810/compile?id=jshack-common-web"></script>
    </c:when>
    <c:otherwise>
        <script src="${pageContext.request.contextPath}/js/main.js"></script>
    </c:otherwise>
</c:choose>
</body>
</html>