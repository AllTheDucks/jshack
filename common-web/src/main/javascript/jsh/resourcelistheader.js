goog.provide('jsh.ResourceListHeader');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('jsh.ResourceListBaseItem');
goog.require('jsh.ResourceListItemRenderer');
goog.require('jsh.model.HackResource');



/**
 * A component which renders the title and id of the hack at the top of the
 * resource list.
 *
 * @param {string=} opt_hackName the name of the hack.
 * @param {string=} opt_hackId the id of the hack.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {jsh.ResourceListBaseItem}
 * @constructor
 */
jsh.ResourceListHeader = function(opt_hackName, opt_hackId, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.hackId_ = opt_hackId;
  this.hackName_ = opt_hackName;
};
goog.inherits(jsh.ResourceListHeader, jsh.ResourceListBaseItem);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListHeader.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.resourceListHeader,
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
jsh.ResourceListHeader.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  this.nameEl_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-resourcelistheader-hackname'), element);
  this.idEl_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-resourcelistheader-hackid'), element);
};


/**
 *
 * @param {string} name
 */
jsh.ResourceListHeader.prototype.setHackName = function(name) {
  goog.dom.setTextContent(this.nameEl_, name);
};


/**
 *
 * @param {string} identifier
 */
jsh.ResourceListHeader.prototype.setHackIdentifier = function(identifier) {
  goog.dom.setTextContent(this.idEl_, identifier);
};


/**
 * Returns if the item can be renamed. False for the header.
 * @return {boolean}
 * @override
 */
jsh.ResourceListHeader.prototype.isRenameable = function() {
  return false;
};


/**
 * Returns if the item can be deleted. False for the header.
 * @return {boolean}
 * @override
 */
jsh.ResourceListHeader.prototype.isDeleteable = function() {
  return false;
};
