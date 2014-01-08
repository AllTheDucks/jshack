goog.provide('jsh.ResourceListContainer');

goog.require('goog.ui.Container');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.ResourceListContainer = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.ResourceListContainer, goog.ui.Container);


/**
 * @override
 */
jsh.ResourceListContainer.prototype.createDom = function() {
  var el = this.dom_.createDom('div', 'jsh-resourcelistarea');
  this.decorateInternal(el);

};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceListContainer.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};
