goog.provide('jsh.ResourceListContainer');

goog.require('goog.ui.Container');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.ResourceListContainer = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

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
  this.selectedItem_ = e.target;

};
