goog.provide('jsh.UrlRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ToggleButton');



/**
 * Restriction editor for URLs.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.UrlRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.UrlRestrictionEditor, jsh.RestrictionEditor);


/**
 * @override
 */
jsh.UrlRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.urlRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.UrlRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var optionsEl = goog.dom.getElementByClass(
      'jsh-url-restriction-editor-options', element);
  var optionsComp = new goog.ui.Component();
  optionsComp.render(optionsEl);

  var textbox = new goog.ui.LabelInput(
      '.*/webapps/discussionboard/do/conference');
  optionsComp.addChild(textbox, true);

};
