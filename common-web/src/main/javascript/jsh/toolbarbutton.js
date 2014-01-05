goog.provide('jsh.ToolbarButton');


goog.require('goog.soy');
goog.require('goog.ui.ToolbarButton');
goog.require('jsh.soy.editor');



/**
 * Toolbar button with an iconClass and some text.
 *
 * @param {string!} text the text to display on the button
 * @param {string!} iconClass the font-awesome iconClass class
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Control}
 * @constructor
 */
jsh.ToolbarButton = function(text, iconClass, opt_domHelper) {
  var el = goog.soy.renderAsElement(jsh.soy.editor.toolbarButton,
      {text: text, iconClass: iconClass});

  goog.base(this, el, opt_domHelper);
};
goog.inherits(jsh.ToolbarButton, goog.ui.ToolbarButton);
