goog.provide('jsh.ImageEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.SplitPane');



/**
 *
 * @param {jsh.model.HackResource} resource the resource to edit.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.ImageEditor = function(resource, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = true;

  /** @type {jsh.model.HackResource}
   * @private */
  this.resource_ = resource;

  /**
   * @type {Element}
   * @private
   */
  this.imageElement_;

};
goog.inherits(jsh.TextEditor, jsh.BaseEditor);


/**
 * @override
 */
jsh.ImageEditor.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.editor.imageEditor,
      {hackName: this.hackName_, hackId: this.hackId_});
  this.decorateInternal(el);

};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ImageEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.imageElement_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-imageeditor-image'), element);
};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @param {Element} element The DIV element for the component
 * @override
 */
jsh.ImageEditor.prototype.enterDocument = function(element) {
  goog.base(this, 'enterDocument');

  this.imageElement_.src = this.resource_.url;

};
