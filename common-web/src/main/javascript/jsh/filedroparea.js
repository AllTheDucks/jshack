goog.provide('jsh.FileDropArea');



/**
 * The Partially opaque overlay for displaying modal UI components.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.FileDropArea = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.FileDropArea, goog.ui.Component);


/**
 * @override
 */
jsh.FileDropArea.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.editor.fileDropArea);
  this.decorateInternal(el);
};
