goog.provide('jsh.ResourceListContainer');

goog.require('goog.dom');



/**
 * A component which renders a listing of the resources of a package
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.ResourceListContainer = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.ResourceListContainer, goog.ui.Component);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListContainer.prototype.createDom = function() {
  var el = this.dom_.createDom('div', 'jsh-resourcelistcontainer');
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} el The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceListContainer.prototype.decorateInternal = function(el) {
  this.setElementInternal(el);
};


