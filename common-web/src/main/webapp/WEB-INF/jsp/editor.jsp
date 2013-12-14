<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

    <c:choose>
        <c:when test="${actionBean.dev}"><script src="http://localhost:9810/compile?id=jshack-common-web"></script></c:when>
        <c:otherwise><script src="js/main.js"></script></c:otherwise>
    </c:choose>
    <script src="js/ace/ace.js"></script>
    <link rel="stylesheet" href="css/ide.css"/>
    <link rel="stylesheet" href="css/tabbar.css"/>
    <link rel="stylesheet" href="css/tab.css"/>
    <link rel="stylesheet" href="css/splitpane.css"/>
    <link rel="stylesheet" href="css/toolbar.css"/>
    <link rel="stylesheet" href="css/menubutton.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/menuitem.css">
    <link rel="stylesheet" href="css/menuseparator.css">
    <link rel="stylesheet" href="css/flatmenubutton.css">
    <link rel="stylesheet" href="css/hacklist.css">
    <link rel="stylesheet" href="font-awesome-4.0.3/css/font-awesome.min.css">


    <title>Javascript Hacks Editor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

</body>
</html>