goog.provide('jsh.ResourceRestrictions');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Checkbox');
goog.require('jsh.CheckSwitchRenderer');
goog.require('jsh.soy.editor');



/**
 * The Panel which contains all the controls for editing where and when a
 * resource will be injected.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.ResourceRestrictions = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.ResourceRestrictions, goog.ui.Component);


/**
 * @override
 */
jsh.ResourceRestrictions.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.editor.resourceRestrictions);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceRestrictions.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var cbel = goog.dom.getElementByClass('jsh-checkswitch', element);

  var cb = new goog.ui.Checkbox(goog.ui.Checkbox.State.CHECKED, null,
      new jsh.CheckSwitchRenderer());
  cb.decorate(cbel);

};
