goog.provide('jsh.DefaultEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.SplitPane');



/**
 * The editor for displaying binary resources that the JS Hack editor isn't able
 * to handle.
 *
 * @param {jsh.model.HackResource} resource the resource to edit.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.BaseEditor}
 * @constructor
 */
jsh.DefaultEditor = function(resource, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = true;

  /** @type {jsh.model.HackResource}
   * @private */
  this.resource_ = resource;

  /**
   * @type {Element}
   * @private
   */
  this.linkElement_;

};
goog.inherits(jsh.DefaultEditor, jsh.BaseEditor);


/**
 * @override
 */
jsh.DefaultEditor.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.editor.defaultEditor);
  this.decorateInternal(el);

};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.DefaultEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.linkElement_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-defaulteditor-link'), element);
};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @override
 */
jsh.DefaultEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.linkElement_.href = this.resource_.tempFileName +
      '/' + this.resource_.path;

};
