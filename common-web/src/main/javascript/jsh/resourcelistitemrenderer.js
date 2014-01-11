/**
 * @fileoverview Renderer for {@link jsh.ResourceListItem}s.
 *
 *
 */

goog.provide('jsh.ResourceListItemRenderer');

goog.require('goog.dom.classes');
goog.require('goog.functions');
goog.require('goog.ui.ControlRenderer');



/**
 * Renderer for {@link jsh.ResourceListItem}s.
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
jsh.ResourceListItemRenderer = function() {
  goog.base(this);
};
goog.inherits(jsh.ResourceListItemRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(jsh.ResourceListItemRenderer);


/**
 * @inheritDoc
 */
jsh.ResourceListItemRenderer.CSS_CLASS =
    goog.getCssName('jsh-resourcelistitem');


/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 * @override
 */
jsh.ResourceListItemRenderer.prototype.getCssClass = function() {
  return jsh.ResourceListItemRenderer.CSS_CLASS;
};

