goog.provide('jsh.ResourceListContainer');

goog.require('goog.ui.Container');



/**
 * The Container for all the resource list items on the left hand side of the
 * editor.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Container}
 * @constructor
 */
jsh.ResourceListContainer = function(opt_domHelper) {
  goog.base(this, null, null, opt_domHelper);

  /**
   * @type {jsh.ResourceListItem}
   * @private
   */
  this.selectedItem_ = null;
};
goog.inherits(jsh.ResourceListContainer, goog.ui.Container);


/**
 * @override
 */
jsh.ResourceListContainer.prototype.createDom = function() {
  var el = this.dom_.createDom('div', 'jsh-resourcelistarea');
  this.decorateInternal(el);

};


/**
 * @override
 */
jsh.ResourceListContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this, goog.ui.Component.EventType.SELECT,
      this.handleItemSelect);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceListContainer.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 *
 * @param {goog.events.Event!} e The event.
 */
jsh.ResourceListContainer.prototype.handleItemSelect = function(e) {
  if (this.selectedItem_) {
    this.selectedItem_.setSelected(false);
  }
  this.selectedItem_ = /** @type {jsh.ResourceListItem} */(e.target);
};


/**
 * Set the currently selected child.
 * @param {goog.ui.Control!} child The child to set as selected.
 */
jsh.ResourceListContainer.prototype.setSelectedChild = function(child) {
  if (this.selectedItem_) {
    this.selectedItem_.setSelected(false);
  }
  this.selectedItem_ = /** @type {jsh.ResourceListItem} */ (child);
  child.setSelected(true);
};


/**
 * Set the currently selected child.
 * @param {goog.ui.Control!} child The child to set as selected.
 * @return {jsh.ResourceListItem}
 */
jsh.ResourceListContainer.prototype.getSelectedChild = function(child) {
  return this.selectedItem_;
};
