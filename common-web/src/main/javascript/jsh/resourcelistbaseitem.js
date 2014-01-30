goog.provide('jsh.ResourceListBaseItem');

goog.require('jsh.ResourceListItemRenderer');



/**
 * A component which is the base for all items added to the resource list.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Control}
 * @constructor
 */
jsh.ResourceListBaseItem = function(opt_domHelper) {
  goog.base(this, null, null, opt_domHelper);

  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setAutoStates(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(jsh.ResourceListBaseItem, goog.ui.Control);

// Register the default renderer for goog.ui.Controls.
goog.ui.registry.setDefaultRenderer(jsh.ResourceListBaseItem,
    jsh.ResourceListItemRenderer);


/**
 * Returns if the item can be renamed. True unless overridden by a child.
 * @return {boolean}
 */
jsh.ResourceListBaseItem.prototype.isRenameable = function() {
  return true;
};


/**
 * Returns if the item can be deleted. True unless overridden by a child.
 * @return {boolean}
 */
jsh.ResourceListBaseItem.prototype.isDeleteable = function() {
  return true;
};
