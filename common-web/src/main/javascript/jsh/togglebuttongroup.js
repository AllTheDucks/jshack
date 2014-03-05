goog.provide('atd.ToggleButtonGroup');

goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Container');



/**
 * An group of {goog.ui.ToggleButton} which are exclusively enabled.
 * @param {?goog.ui.Container.Orientation=} opt_orientation Container
 *     orientation; defaults to {@code VERTICAL}.
 * @param {goog.ui.ContainerRenderer=} opt_renderer Renderer used to render or
 *     decorate the container; defaults to {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @extends {goog.ui.Container}
 * @constructor
 */
atd.ToggleButtonGroup = function(opt_orientation, opt_renderer, opt_domHelper) {
  goog.base(this, opt_orientation, opt_renderer, opt_domHelper);

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.selectedChild_ = null;
};
goog.inherits(atd.ToggleButtonGroup, goog.ui.Container);


/**
 * @override
 */
atd.ToggleButtonGroup.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.events.listen(this, goog.ui.Component.EventType.ACTION,
      this.handleChildChecked_, false, this);
};


/**
 * Returns the value associated with the active toggle button
 * @return {*} The value of the active toggle button, or undefined if none.
 */
atd.ToggleButtonGroup.prototype.getValue = function() {
  if (this.selectedChild_) {
    return this.selectedChild_.getValue();
  }
  return undefined;
};


/**
 *
 * @param {goog.events.Event} e
 * @private
 */
atd.ToggleButtonGroup.prototype.handleChildChecked_ = function(e) {
  if (this.selectedChild_) {
    this.selectedChild_.setChecked(false);
  }

  var target = /** @type {goog.ui.Component} */(e.target);
  if (target.isChecked()) {
    this.selectedChild_ = target;
  } else {
    this.selectedChild_ = null;
  }
};
