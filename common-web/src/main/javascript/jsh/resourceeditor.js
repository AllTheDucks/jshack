goog.provide('jsh.ResourceEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.soy');
goog.require('jsh.SplitPane');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.ResourceEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = true;

  /** @type {jsh.SplitPane} */
  this.splitPane_;

  /** @type {jsh.AceEditor} */
  this.editor_;

  /** @type {goog.ui.Component} */
  this.resourceProperties_;
};
goog.inherits(jsh.ResourceEditor, goog.ui.Component);


/**
 * @override
 */
jsh.ResourceEditor.prototype.createDom = function() {

  var el = this.dom_.createDom('div');
  this.decorateInternal(el);

};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.editor_ = new jsh.AceEditor();
  this.resourceProperties_ = new goog.ui.Component();
  this.splitPane_ = new jsh.SplitPane(this.editor_, this.resourceProperties_,
    goog.ui.SplitPane.Orientation.VERTICAL);

  this.addChild(this.splitPane_, true);
}

