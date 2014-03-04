goog.provide('jsh.CourseAvailabilityRestrictionEditor');

goog.require('goog.ui.Checkbox');



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
   * @type {goog.ui.Checkbox}
   * @private
   */
  this.availabileCheckbox_ = null;
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

  this.availabileCheckbox_ = new goog.ui.Checkbox();
  this.availabileCheckbox_.setLabel(goog.dom.getElementByClass(
      goog.getCssName('jsh-course-availability-restriction-editor'), element));
  this.availabileCheckbox_.render(goog.dom.getElementByClass(
      goog.getCssName('jsh-course-availability-checkbox'), element));
};
