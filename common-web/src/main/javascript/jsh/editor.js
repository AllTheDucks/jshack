goog.provide('jsh.HackEditor');

goog.require('goog.ui.Component');



/**
 * The Main Editor component for JSHack.  Contains the splitpane and
 * coordinates interactions between the child components.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.SplitPane = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.HackEditor, goog.ui.Component);
