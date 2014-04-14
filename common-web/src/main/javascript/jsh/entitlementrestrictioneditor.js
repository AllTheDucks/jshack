goog.provide('jsh.EntitlementRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ToggleButton');



/**
 * Restriction editor for Entitlement.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.EntitlementRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.textbox_ = null;
};
goog.inherits(jsh.EntitlementRestrictionEditor, jsh.RestrictionEditor);


/**
 * @override
 */
jsh.EntitlementRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.entitlementRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.EntitlementRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var optionsEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-entitlement-restriction-editor-options'), element);
  var optionsComp = new goog.ui.Component();
  optionsComp.render(optionsEl);

  this.textbox_ = new goog.ui.LabelInput(
      'course.availability.MODIFY');
  optionsComp.addChild(this.textbox_, true);

};


/**
 * @inheritDoc
 */
jsh.EntitlementRestrictionEditor.prototype.setEnabled = function(enabled) {
  goog.base(this, 'setEnabled', enabled);
  this.textbox_.setEnabled(enabled);
};
