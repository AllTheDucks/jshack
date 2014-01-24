/*
 * Extern for Ace (Ajax.org Cloud9 Editor)
 * https://github.com/ajaxorg/ace
 */

/**
 * @param {string} path
 * @return {RequiredObject}
 */
function require(path) {}

/**
 * @class
 * @constructor
 */
var RequiredObject;

/**
 * @type {function (new:Object)}
 */
RequiredObject.prototype.Mode;

/**
 * @namespace
 */
var ace;

/**
 * @param {string} id
 * @return {!ace.AceEditor}
 */
ace.edit = function(id) {};

/**
 * @class
 * @constructor
 */
ace.AceEditor = function(){};

/**
 * @param {string} theme
 */
ace.AceEditor.prototype.setTheme = function(theme) {};

/**
 * @param {boolean} readOnly
 */
ace.AceEditor.prototype.setReadOnly = function(readOnly) {};

/**
 * @return {ace.AceSession}
 */
ace.AceEditor.prototype.getSession = function() {};

ace.AceEditor.prototype.resize = function() {};

/**
 * @class
 * @constructor
 */
ace.AceSession = function(){};

/**
 * @param {Object} mode
 */
ace.AceSession.prototype.setMode = function(mode) {};

/**
 * @param {string} value
 */
ace.AceSession.prototype.setValue = function(value) {};

/**
 * @return {string}
 */
ace.AceSession.prototype.getValue = function() {};