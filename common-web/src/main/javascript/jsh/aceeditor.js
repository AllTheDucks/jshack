goog.provide('jsh.AceEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');



/**
 * @param {jsh.model.Resource=} opt_resource the resource to be edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.AceEditor = function(opt_resource, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.editable = true;
};
goog.inherits(jsh.AceEditor, goog.ui.Component);


/**
 * Creates the div in which the Ace editor is placed
 *
 * @override
 */
jsh.AceEditor.prototype.createDom = function() {
  var el = goog.dom.createDom('div', 'ace-editor-container');
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element as an Ace editor.
 *
 * @param {Element} element The DIV element to decorate.
 * @override
 */
jsh.AceEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.editorElement = goog.dom.createDom('div', 'ace-editor');

  goog.dom.appendChild(element, this.editorElement);
};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @param {Element} element The DIV element for the component
 * @override
 */
jsh.AceEditor.prototype.enterDocument = function(element) {
  goog.base(this, 'enterDocument');
  if (this.editable) {
    this.aceEditor = ace.edit(this.editorElement);
    this.aceEditor.setTheme('ace/theme/clouds_midnight');
  }
};


/**
 * Resize the internal Ace editor to fit the component.
 */
jsh.AceEditor.prototype.resize = function() {
  this.aceEditor.resize();
};


/**
 * return the actual ace editor
 * @return {Object}
 */
jsh.AceEditor.prototype.getAce = function() {
  return this.aceEditor;
};
