goog.provide('jsh.ResourceEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
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

  /** @type {number}
   *  @private
   */
  this.splitPaneHandleWidth_ = 5;
};
goog.inherits(jsh.ResourceEditor, jsh.BaseEditor);


/**
 * @override
 */
jsh.ResourceEditor.prototype.createDom = function() {

  var el = this.dom_.createDom('div', {'class': 'jsh-reseditor'});
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
  this.splitPane_.setInitialSize(300);
  this.splitPane_.setHandleSize(this.splitPaneHandleWidth_);
  this.splitPane_.setSecondComponentStatic(true);

  this.addChild(this.splitPane_, true);

};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @param {Element} element The DIV element for the component
 * @override
 */
jsh.ResourceEditor.prototype.enterDocument = function(element) {
  goog.base(this, 'enterDocument');
  //TODO this is nasty.  Really shouldn't rely on the dom structure like this.
  goog.events.listen(this.getParent().getParent(),
      goog.ui.Component.EventType.CHANGE,
      this.handleParentSizeChange, false, this);
  goog.events.listen(this.splitPane_, goog.ui.Component.EventType.CHANGE,
      goog.events.Event.stopPropagation, false, this);

};


/**
 * Handler for when the parent component changes. We're interested in size
 * changes in particular.
 * @param {!goog.events.Event} e An event.
 */
jsh.ResourceEditor.prototype.handleParentSizeChange = function(e) {
  var size = goog.style.getSize(this.getElement());
  this.splitPane_.setSize(size);
  this.editor_.resize();
};

