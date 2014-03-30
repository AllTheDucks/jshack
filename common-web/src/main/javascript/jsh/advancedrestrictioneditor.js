goog.provide('jsh.AdvancedRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ToggleButton');
goog.require('jsh.AceEditor');



/**
 * Restriction editor for Course Availability.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.AdvancedRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /** @type {jsh.AceEditor}
   * @private */
  this.aceEditor_ = null;
};
goog.inherits(jsh.AdvancedRestrictionEditor, jsh.RestrictionEditor);


/**
 * @override
 */
jsh.AdvancedRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.advancedRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.AdvancedRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var optionsEl = goog.dom.getElementByClass(
      'jsh-advanced-restriction-editor-options', element);
  var optionsComp = new goog.ui.Component();
  optionsComp.render(optionsEl);

  this.aceEditor_ = new jsh.AceEditor();
  optionsComp.addChild(this.aceEditor_, true);

};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @override
 */
jsh.AdvancedRestrictionEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.aceEditor_.getAce().getSession().setMode('ace/mode/advancedrestriction');
};
