goog.provide('jsh.TextEditor');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.ResourceRestrictions');
goog.require('jsh.SplitPane');



/**
 * The main editor for text type resources.  Code, etc.
 *
 * @param {jsh.model.HackResource} resource the resource to edit.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.BaseEditor}
 * @constructor
 */
jsh.TextEditor = function(resource, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = true;

  /** @type {jsh.model.HackResource}
   * @private */
  this.resource_ = resource;

  /** @type {jsh.SplitPane} */
  this.splitPane_;

  /** @type {jsh.AceEditor} */
  this.hackEditor_;

  /** @type {goog.ui.Component} */
  this.resourceProperties_;

  /** @type {number}
   *  @private
   */
  this.splitPaneHandleWidth_ = 5;
};
goog.inherits(jsh.TextEditor, jsh.BaseEditor);


/**
 * @override
 */
jsh.TextEditor.prototype.createDom = function() {

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
jsh.TextEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.hackEditor_ = new jsh.AceEditor();
  this.resourceProperties_ = new jsh.ResourceRestrictions();
  this.splitPane_ = new jsh.SplitPane(this.hackEditor_,
      this.resourceProperties_, goog.ui.SplitPane.Orientation.VERTICAL);
  this.splitPane_.setInitialSize(250);
  this.splitPane_.setHandleSize(this.splitPaneHandleWidth_);
  this.splitPane_.setSecondComponentStatic(true);

  this.addChild(this.splitPane_, true);
};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @override
 */
jsh.TextEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.events.listen(this.splitPane_, goog.ui.Component.EventType.CHANGE,
      goog.events.Event.stopPropagation, false, this);

  goog.dom.classlist.add(this.hackEditor_.getElement(),
      goog.getCssName('jsh-text-editor'));

  this.hackEditor_.getAce().setValue(this.resource_.content);
  this.hackEditor_.getAce().getSession().setMode(
      jsh.MimeTypeHelper.getAceMode(this.resource_.mime));
};


/**
 * Handler for when the parent component changes. We're interested in size
 * changes in particular.
 */
jsh.TextEditor.prototype.resize = function() {
  var size = goog.style.getSize(this.getElement());
  this.splitPane_.setSize(size);
  this.hackEditor_.resize();
  //Hack to force the rerender of the ace editor. Needed for the word wrap.
  this.hackEditor_.getAce().setValue(this.hackEditor_.getAce().getValue());
};


/**
 * Enabled or disables word wrapping in the ace editor.
 * @param {boolean} wrap
 */
jsh.TextEditor.prototype.wordWrap = function(wrap) {
  this.hackEditor_.getAce().getSession().setUseWrapMode(wrap);
};
