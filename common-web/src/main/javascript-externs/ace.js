/*
 * Extern for Ace (Ajax.org Cloud9 Editor)
 * https://github.com/ajaxorg/ace
 */

/**
 * @param {string} path
 * @return {ace.RequiredObject}
 */
function require(path) {}

/**
 * @class
 * @constructor
 */
ace.RequiredObject;

/**
 * @type {function (new:Object)}
 */
ace.RequiredObject.prototype.Mode;

/**
 * @param {Object} completer
 */
ace.RequiredObject.prototype.addCompleter = function(completer) {};

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
 * @param {Object} options
 */
ace.AceEditor.prototype.setOptions = function(options) {};

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

/**
 * @param {boolean} wrap
 */
ace.AceSession.prototype.setUseWrapMode = function(wrap) {};
