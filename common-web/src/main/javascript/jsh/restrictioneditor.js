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

  /**
   * @type {goog.ui.Button}
   * @private
   */
  this.removeButton_ = null;
};
goog.inherits(jsh.RestrictionEditor, goog.ui.Component);


/**
 * Wraps a {Element} in the generic restriction editor elements
 * @param {Element} element
 * @return {Element}
 */
jsh.RestrictionEditor.prototype.wrapDom = function(element) {
  var dom = goog.soy.renderAsElement(jsh.soy.editor.restrictionEditor);
  var contentEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-restriction-editor-content'), dom);
  contentEl.appendChild(element);

  var closeEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-restriction-editor-close-button'), dom);
  this.removeButton_ = new goog.ui.Button('Remove',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.removeButton_.render(closeEl);

  return dom;
};


/**
 * Handle the the click of the close button.
 * @param {goog.events.Event} e
 * @private
 */
jsh.RestrictionEditor.prototype.handleRemoveButtonClick_ = function(e) {
  this.dispatchEvent(new goog.events.Event(jsh.events.EventType.REMOVE));
};


/**
 * @override
 */
jsh.RestrictionEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.events.listen(this.removeButton_, goog.ui.Component.EventType.ACTION,
      this.handleRemoveButtonClick_, false, this);
};


/**
 * Enables or disabled the editor.
 * @param {boolean} enabled
 */
jsh.RestrictionEditor.prototype.setEnabled = function(enabled) {
  this.removeButton_.setEnabled(enabled);
};
