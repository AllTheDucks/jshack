goog.provide('jsh.EditorContainer');

goog.require('goog.ui.Component');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.EditorContainer = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.EditorContainer, goog.ui.Component);


/**
 * @override
 */
jsh.EditorContainer.prototype.createDom = function() {
  var el = this.dom_.createDom('div', 'jsh-editorcontainer');
  this.decorateInternal(el);

};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.EditorContainer.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};
