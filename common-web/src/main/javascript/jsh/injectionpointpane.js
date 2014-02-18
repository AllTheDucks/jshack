goog.provide('jsh.InjectionPointPane');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('jsh.soy.editor');



/**
 * Component for selecting injection points.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.InjectionPointPane = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.InjectionPointPane, goog.ui.Component);


/**
 * @override
 */
jsh.InjectionPointPane.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.injectionPointPane);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.InjectionPointPane.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};
