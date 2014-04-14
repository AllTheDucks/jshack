goog.provide('jsh.CourseAvailabilityRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.ToggleButton');



/**
 * Restriction editor for Course Availability.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.CourseAvailabilityRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {atd.ToggleButtonGroup}
   * @private
   */
  this.group_ = null;
};
goog.inherits(jsh.CourseAvailabilityRestrictionEditor, jsh.RestrictionEditor);


/**
 * @override
 */
jsh.CourseAvailabilityRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.courseAvailabilityRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.CourseAvailabilityRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var optionsEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-course-availability-restriction-editor-options'),
      element);
  var renderer = goog.ui.Css3ButtonRenderer.getInstance();
  this.group_ = new atd.ToggleButtonGroup();
  this.group_.addChild(new goog.ui.ToggleButton('Available', renderer), true);
  this.group_.addChild(new goog.ui.ToggleButton('Unavailable', renderer), true);
  this.group_.render(optionsEl);
};


/**
 * @inheritDoc
 */
jsh.CourseAvailabilityRestrictionEditor.prototype.setEnabled =
    function(enabled) {
  goog.base(this, 'setEnabled', enabled);
  this.group_.setEnabled(enabled);
};
