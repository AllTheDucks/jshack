<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

    <script type="application/javascript">
        var jshackToken = '${actionBean.token}';
    </script>

    <c:choose>
        <c:when test="${actionBean.dev}">
            <script src="http://localhost:9810/compile?id=jshack-common-web"></script>
            <link rel="stylesheet" href="http://localhost:9810/css/jshack-common-web/"/>

        </c:when>
        <c:otherwise>
            <script src="js/main.js"></script>
            <link rel="stylesheet" href="css/main.css"/>
        </c:otherwise>
    </c:choose>
    <script src="js/ace/ace.js"></script>
    <script src="js/ace/ext-language_tools.js"></script>
    <link rel="stylesheet" href="font-awesome-4.0.3/css/font-awesome.min.css">


    <title>Javascript Hacks Editor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

</body>
</html>