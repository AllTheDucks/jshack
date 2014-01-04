goog.provide('jsh.HackList');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('jsh.soy.editor');



/**
 * A component which renders a listing of the contents of a package
 *
 * @param {string} name the name of the hack being edited.
 * @param {string} id the identifier of the hack being edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.HackList = function(name, id, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.hackName_ = name;
  this.hackId_ = id;
};
goog.inherits(jsh.HackList, goog.ui.Component);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.HackList.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.hackList,
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
jsh.HackList.prototype.decorateInternal = function(el) {
  this.setElementInternal(el);
  this.contentEl_ = goog.dom.getElementByClass('jsh-hacklist-resourcelist',
      el);
};


/**
 * Returns a different element to the root one for this component. This will
 * result in child components being rendered into the contentEl_ element.
 * @override
 */
jsh.HackList.prototype.getContentElement = function() {
  return this.contentEl_;
};

