goog.provide('jsh.RestrictionPane');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('jsh.soy.editor');



/**
 * Component for adding restrictions to an injected resource.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.RestrictionPane = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.RestrictionPane, goog.ui.Component);


/**
 * @override
 */
jsh.RestrictionPane.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.restrictionPane);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.RestrictionPane.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var cbel = goog.dom.getElementByClass('jsh-checkswitch', element);

  var cb = new goog.ui.Checkbox(goog.ui.Checkbox.State.CHECKED, null,
      new jsh.CheckSwitchRenderer());
  cb.decorate(cbel);
};
