goog.provide('jsh.ResourceListHeader');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('jsh.model.HackResource');



/**
 * A component which renders the title and id of the hack at the top of the
 * resource list.
 *
 * @param {jsh.model.Hack} hack the hack.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Control}
 * @constructor
 */
jsh.ResourceListHeader = function(hack, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.setModel(hack);
};
goog.inherits(jsh.ResourceListHeader, goog.ui.Control);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListHeader.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.resourceListHeader,
      {hackName: this.getModel().name, hackId: this.getModel().identifier});
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

};
