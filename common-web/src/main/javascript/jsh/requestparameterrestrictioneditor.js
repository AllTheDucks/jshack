goog.provide('jsh.RequestParameterRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ToggleButton');



/**
 * Restriction editor for request parameters.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.RequestParameterRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.name_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.value_ = null;
};
goog.inherits(jsh.RequestParameterRestrictionEditor, jsh.RestrictionEditor);


/**
 * @override
 */
jsh.RequestParameterRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.requestParameterRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.RequestParameterRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var nameEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-request-parameter-restriction-editor-name'),
      element);
  this.name_ = new goog.ui.LabelInput('type');
  this.name_.render(nameEl);

  var valueEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-request-parameter-restriction-editor-value'),
      element);
  this.value_ = new goog.ui.LabelInput('(blogs|journals)');
  this.value_.render(valueEl);
};


/**
 * @inheritDoc
 */
jsh.RequestParameterRestrictionEditor.prototype.setEnabled = function(enabled) {
  goog.base(this, 'setEnabled', enabled);
  this.name_.setEnabled(enabled);
  this.value_.setEnabled(enabled);
};
