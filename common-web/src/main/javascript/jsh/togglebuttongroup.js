goog.provide('atd.ToggleButtonGroup');

goog.require('goog.dom.classlist');
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

  //todo: This more than likely isn't the best way to add this class.
  goog.dom.classlist.add(this.getElement(),
      goog.getCssName('atd-toggle-button-group'));
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


/**
 * @inheritDoc
 */
atd.ToggleButtonGroup.prototype.addChildAt = function(child, index, opt_render)
    {
  goog.base(this, 'addChildAt', child, index, opt_render);

  this.setCollapsed_(index - 1);
  this.setCollapsed_(index);
  this.setCollapsed_(index + 1);
};


/**
 * @inheritDoc
 */
atd.ToggleButtonGroup.prototype.removeChildAt =
    function(index, opt_render) {
  var returnVal = goog.base(this, 'removeChildAt', index, opt_render);

  this.setCollapsed_(index - 1);
  // right neighbour now that the child has been removed
  this.setCollapsed_(index);

  return returnVal;
};


/**
 * Calculates and sets the correct collapsed sides of the child button at the
 * given index.
 * @param {number} index The index of the button which should have it's sides
 * collapsed.
 * @private
 */
atd.ToggleButtonGroup.prototype.setCollapsed_ = function(index) {
  var item = this.getChildAt(index);
  if (!item) {
    return;
  }

  var sides = goog.ui.ButtonSide.NONE;
  if (index > 0) {
    sides |= goog.ui.ButtonSide.START;
  }
  if (index < this.getChildCount() - 1) {
    sides |= goog.ui.ButtonSide.END;
  }

  item.setCollapsed(sides);
};
