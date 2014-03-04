goog.provide('jsh.RestrictionEditor');



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
  return dom;
};
