goog.provide('jsh.BaseEditor');

goog.require('goog.events.EventType');
goog.require('goog.style');



/**
 * The Base Editor class that all resource editors inherit from.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.BaseEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.visible_ = true;
};
goog.inherits(jsh.BaseEditor, goog.ui.Component);


/**
 * Shows or hides the component.  Does nothing if the component already has
 * the requested visibility.  Otherwise, dispatches a SHOW or HIDE event as
 * appropriate, giving listeners a chance to prevent the visibility change.
 * When showing a component that is both enabled and focusable, ensures that
 * its key target has a tab index.  When hiding a component that is enabled
 * and focusable, blurs its key target and removes its tab index.
 * @param {boolean} visible Whether to show or hide the component.
 * @param {boolean=} opt_force If true, doesn't check whether the component
 *     already has the requested visibility, and doesn't dispatch any events.
 * @return {boolean} Whether the visibility was changed.
 */
jsh.BaseEditor.prototype.setVisible = function(visible, opt_force) {
  if (opt_force || (this.visible_ != visible && this.dispatchEvent(visible ?
      goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE))) {
    var element = this.getElement();
    if (element) {
      goog.style.setElementShown(element, visible);
    }
    this.visible_ = visible;
    return true;
  }
  return false;
};
