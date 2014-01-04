goog.provide('jsh.HackEditor');

goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.ui.Component');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.SplitPane');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.tree.TreeControl');
goog.require('jsh.AceEditor');
goog.require('jsh.HackDetailsArea');
goog.require('jsh.HackList');
goog.require('jsh.HackListResource');
goog.require('jsh.ResourceEditor');
goog.require('jsh.SplitPane');



/**
 * The Main Editor component for JSHack.  Contains the splitpane and
 * coordinates interactions between the child components.
 * @param {jsh.model.Hack} hack The hack to be edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.HackEditor = function(hack, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.hack_ = hack;

  this.hackList_ = null;

  this.splitpane_ = null;

  this.viewSizeMonitor_ = new goog.dom.ViewportSizeMonitor();

  this.editorCache_ = {};

  this.editorContainer_ = null;

  this.currentEditor_ = null;

  //TODO This needs to go somewhere else, like a constant or something
  this.splitPaneHandleWidth_ = 5;
};
goog.inherits(jsh.HackEditor, goog.ui.Component);


/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.HackEditor.prototype.decorateInternal = function(element) {

  goog.base(this, 'decorateInternal', element);

  var toolbar = new goog.ui.Toolbar();

  var btnSave = goog.dom.createDom('div');
  btnSave.innerHTML = "<i class='fa fa-floppy-o icon'></i>" +
      "<span class='toolbar-text'>Save</span>";
  var btnSave = new goog.ui.ToolbarButton(btnSave);
  toolbar.addChild(btnSave, true);

  var btnClose = goog.dom.createDom('div');
  btnClose.innerHTML = "<i class='fa fa-power-off icon'></i>" +
      "<span class='toolbar-text'>Close</span>";
  var btnSave = new goog.ui.ToolbarButton(btnClose);
  toolbar.addChild(btnSave, true);

  this.addChild(toolbar, true);

  this.hackList_ = new jsh.HackList(this.hack_.name, this.hack_.identifier);

  this.editorContainer_ = new goog.ui.Component();

  this.hackDetails_ = new jsh.HackDetailsArea();
  this.editorContainer_.addChild(this.hackDetails_, true);
  this.currentEditor_ = this.hackDetails_;

  for (var i = 0; i < this.hack_.resources.length; i++) {
    var res = this.hack_.resources[i];
    var resItem = new jsh.HackListResource(res);
    this.hackList_.addChild(resItem, true);
    goog.events.listen(resItem, goog.ui.Component.EventType.ACTION,
        this.handleResourceClick, false, this);
  }


  //  this.editor = new jsh.ResourceEditor();

  this.splitpane_ = new jsh.SplitPane(this.hackList_, this.editorContainer_,
      goog.ui.SplitPane.Orientation.HORIZONTAL);
  this.splitpane_.setInitialSize(300);
  this.splitpane_.setHandleSize(this.splitPaneHandleWidth_);

  this.addChild(this.splitpane_, true);
};


/**
 * Called when component's element is known to be in the document.
 * @override
 */
jsh.HackEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.resizeOuterSplitPane_();
  goog.events.listen(this.viewSizeMonitor_,
      goog.events.EventType.RESIZE, this.resizeOuterSplitPane_, false, this);

  goog.dom.classes.add(this.editorContainer_.getElement(),
      'jsh-editorcontainer');
};


/**
 * Handler for the viewSizeMonitor event, to resize the outerSplitPane
 * @private
 */
jsh.HackEditor.prototype.resizeOuterSplitPane_ = function() {
  var lhsheight = this.viewSizeMonitor_.getSize().height -
      goog.style.getPosition(this.splitpane_.getElement()).y;
  var lhswidth = this.viewSizeMonitor_.getSize().width;
  this.splitpane_.setSize(new goog.math.Size(lhswidth, lhsheight));
};


/**
 *
 * @param {goog.events.Event!} e the click event
 */
jsh.HackEditor.prototype.handleResourceClick = function(e) {
  console.log('clicked!');
  this.showEditor(e.currentTarget.getModel());
};


/**
 * Display the HackDetails Area, and hide the currently active resource editor.
 */
jsh.HackEditor.prototype.showHackDetailsArea = function() {
  this.currentEditor_.setVisible(false);
  this.hackDetails_.setVisible(true);
  this.currentEditor_ = this.hackDetails_;
};


/**
 *
 * @param {jsh.model.HackResource!} resource the resource to display the editor
 * for.
 */
jsh.HackEditor.prototype.showEditor = function(resource) {
  var ed = this.editorCache_[resource.path];
  if (ed == null) {
    ed = new jsh.ResourceEditor();
    this.editorCache_[resource.path] = ed;
    this.editorContainer_.addChild(ed, true);
  }

  this.currentEditor_.setVisible(false);
  ed.setVisible(true);
  this.currentEditor_ = ed;

  // trigger resize on ResourceEditor
  this.splitpane_.dispatchEvent(goog.ui.Component.EventType.CHANGE);
};
