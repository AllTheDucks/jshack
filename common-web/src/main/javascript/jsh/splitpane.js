goog.provide('jsh.SplitPane');

goog.require('goog.ui.SplitPane');



/**
 * A left/right up/down Container SplitPane.
 * Create SplitPane with two goog.ui.Component opjects to split.
 *
 * @param {goog.ui.Component} firstComponent Left or Top component.
 * @param {goog.ui.Component} secondComponent Right or Bottom component.
 * @param {goog.ui.SplitPane.Orientation} orientation SplitPane orientation.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.SplitPane}
 * @constructor
 */
jsh.SplitPane = function(firstComponent, secondComponent,
                         orientation, opt_domHelper) {
  goog.base(this, firstComponent, secondComponent, orientation, opt_domHelper);
};
goog.inherits(jsh.SplitPane, goog.ui.SplitPane);


/**
 * The size of the second component.
 * @type {number}
 * @private
 */
jsh.SplitPane.prototype.secondComponentSize_ = 0;


/**
 * If the size of the second component should remain the same when the
 * component is resized.
 * @type {boolean}
 * @private
 */
jsh.SplitPane.prototype.secondComponentStatic_ = false;


/**
 * Setup all events and do an initial resize.
 * @override
 */
jsh.SplitPane.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().
      unlisten(this.splitpaneHandle_, goog.events.EventType.DBLCLICK,
          this.handleDoubleClick_).
      listen(this.splitpaneHandle_, goog.events.EventType.DBLCLICK,
          this.staticComponentAwareHandleDoubleClick_);

  if (this.secondComponentStatic_) {
    this.secondComponentSize_ = this.initialSize_;
    this.setFirstComponentSize();
  }
};


/**
 * Set the size of the left/top component, and resize the other component based
 * on that size and handle size.
 * @param {?number=} opt_size The size of the top or left, in pixels.
 * @override
 */
jsh.SplitPane.prototype.setFirstComponentSize = function(opt_size) {
  var splitpaneSize = goog.style.getBorderBoxSize(this.getElement());

  var componentSpace;
  if (this.isVertical()) {
    componentSpace = splitpaneSize.height - this.handleSize_;
  } else {
    componentSpace = splitpaneSize.width - this.handleSize_;
  }

  if (goog.isNumber(opt_size) || !this.secondComponentStatic_) {
    goog.base(this, 'setFirstComponentSize', opt_size);
    this.secondComponentSize_ = componentSpace - this.getFirstComponentSize();
  } else {
    goog.base(this, 'setFirstComponentSize',
        componentSpace - this.secondComponentSize_);
  }

};


/**
 * Sets the size of the right/bottom component. and resize the other component
 * based on that size and handle size.
 * @param {?number=} opt_size The size of the bottom or right, in pixels.
 */
jsh.SplitPane.prototype.setSecondComponentSize = function(opt_size) {
  if (goog.isNumber(opt_size)) {
    this.secondComponentSize_ = opt_size;
  }
  this.setFirstComponentSize();
};


/**
 * Returns the size of the right/bottom component.
 * @return {number} The size of the right/bottom component.
 */
jsh.SplitPane.prototype.getSecondComponentSize = function() {
  return this.secondComponentSize_;
};


/**
 * Gets if the second component remains static during resizing.
 * @return {?boolean} True if the second component is static.
 */
jsh.SplitPane.prototype.isSecondComponentStatic = function() {
  return this.secondComponentStatic_;
};


/**
 * Sets if the second component should remain static during resizing.
 * @param {boolean} isstatic If true, the second component will remain the same
 * width/height during resizing.
 */
jsh.SplitPane.prototype.setSecondComponentStatic = function(isstatic) {
  this.secondComponentStatic_ = isstatic;
};


/**
 * Snap the container to the left or top on a Double-click.
 * @private
 */
jsh.SplitPane.prototype.staticComponentAwareSnapIt_ = function() {
  var handlePos = goog.style.getRelativePosition(this.splitpaneHandle_,
      this.firstComponentContainer_);
  var firstBorderBoxSize =
      goog.style.getBorderBoxSize(this.firstComponentContainer_);
  var firstContentBoxSize =
      goog.style.getContentBoxSize(this.firstComponentContainer_);
  var splitPaneContentBoxSize =
      goog.style.getContentBoxSize(this.getElement());

  var isVertical = this.isVertical();

  // Where do we snap the handle (what size to make the component) and what
  // is the current handle position.
  var snapSize;
  var handlePosition;
  if (isVertical) {
    if (!this.secondComponentStatic_) {
      snapSize = firstBorderBoxSize.height - firstContentBoxSize.height;
    } else {
      snapSize = splitPaneContentBoxSize.height - this.handleSize_;
    }
    handlePosition = handlePos.y;
  } else {
    if (!this.secondComponentStatic_) {
      snapSize = firstBorderBoxSize.width - firstContentBoxSize.width;
    } else {
      snapSize = splitPaneContentBoxSize.width;
    }
    handlePosition = handlePos.x;
  }

  if (snapSize == handlePosition) {
    // This means we're 'unsnapping', set it back to where it was.
    this.setFirstComponentSize(this.savedSnapSize_);
  } else {
    // This means we're 'snapping', set the size to snapSize, and hide the
    // first component.
    if (isVertical) {
      this.savedSnapSize_ = goog.style.getBorderBoxSize(
          this.firstComponentContainer_).height;
    } else {
      this.savedSnapSize_ = goog.style.getBorderBoxSize(
          this.firstComponentContainer_).width;
    }
    this.setFirstComponentSize(snapSize);
  }
};


/**
 * Handle the Double-click. Call the snapIt method which snaps the container
 * to the top or left.
 * @param {goog.events.Event} e The event.
 * @private
 */
jsh.SplitPane.prototype.staticComponentAwareHandleDoubleClick_ = function(e) {
  this.staticComponentAwareSnapIt_();
};
