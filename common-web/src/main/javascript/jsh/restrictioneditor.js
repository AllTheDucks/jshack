goog.provide('jsh.RestrictionEditor');

goog.require('goog.dom');
goog.require('goog.events.Event');
goog.require('goog.soy');
goog.require('goog.ui.Button');
goog.require('goog.ui.Css3ButtonRenderer');



/**
 * The class from which all the restriction editors inherit.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.RestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.RestrictionEditor, goog.ui.Component);


/**
 * Wraps a {Element} in the generic restriction editor elements
 * @param {Element} element
 * @return {Element}
 */
jsh.RestrictionEditor.prototype.wrapDom = function(element) {
  var dom = goog.soy.renderAsElement(jsh.soy.editor.restrictionEditor);
  var contentEl = goog.dom.getElementByClass('jsh-restriction-editor-content',
      dom);
  contentEl.appendChild(element);

  var closeEl = goog.dom.getElementByClass(
      'jsh-restriction-editor-content-close-button', dom);
  var closeButton = new goog.ui.Button('Remove',
      goog.ui.Css3ButtonRenderer.getInstance());
  closeButton.render(closeEl);

  goog.events.listen(closeButton, goog.ui.Component.EventType.ACTION,
      this.handleCloseButtonClick_, false, this);

  return dom;
};


/**
 * Handle the the click of the close button.
 * @private
 */
jsh.RestrictionEditor.prototype.handleCloseButtonClick_ = function() {
  this.dispatchEvent(new goog.events.Event(jsh.events.EventType.REMOVE));
};
