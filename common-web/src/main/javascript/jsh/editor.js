goog.provide('jsh.HackEditor');

goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.ui.Component');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.SplitPane');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarSeparator');
goog.require('goog.ui.tree.TreeControl');
goog.require('jsh.AceEditor');
goog.require('jsh.EditorContainer');
goog.require('jsh.HackDetailsArea');
goog.require('jsh.ResourceEditor');
goog.require('jsh.ResourceListContainer');
goog.require('jsh.ResourceListHeader');
goog.require('jsh.ResourceListItem');
goog.require('jsh.SplitPane');
goog.require('jsh.ToolbarButton');



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

  this.splitpane_ = null;

  this.viewSizeMonitor_ = new goog.dom.ViewportSizeMonitor();

  this.editorCache_ = {};

  this.editorContainer_ = null;

  this.currentEditor_ = null;

  //TODO This needs to go somewhere else, like a constant or something
  this.splitPaneHandleWidth_ = 5;

  this.setModel(hack);
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

  this.btnSave_ = new jsh.ToolbarButton('Save', goog.getCssName('fa-floppy-o'));
  this.btnSave_.setEnabled(false);
  toolbar.addChild(this.btnSave_, true);
  goog.events.listen(this.btnSave_, goog.ui.Component.EventType.ACTION,
      function() {
        this.dispatchEvent({type: jsh.HackEditor.EventTypes.SAVE});
      }, false, this);

  var btnClose = new jsh.ToolbarButton('Close',
      goog.getCssName('fa-power-off'));
  toolbar.addChild(btnClose, true);

  toolbar.addChild(new goog.ui.ToolbarSeparator(), true);

  var btnUpload = new jsh.ToolbarButton('Upload Resource',
      goog.getCssName('fa-upload'));
  toolbar.addChild(btnUpload, true);

  var btnNew = new jsh.ToolbarButton('New Resource',
      goog.getCssName('fa-plus'));
  toolbar.addChild(btnNew, true);

  var btnDelete = new jsh.ToolbarButton('Delete Resource',
      goog.getCssName('fa-minus'));
  toolbar.addChild(btnDelete, true);

  this.addChild(toolbar, true);

  var resourceListContainer = new jsh.ResourceListContainer();

  var resourceListHeader = new jsh.ResourceListHeader(this.hack_);
  resourceListContainer.addChild(resourceListHeader, true);

  goog.events.listen(resourceListHeader, goog.ui.Component.EventType.ACTION,
      this.showHackDetailsArea, false, this);

  for (var i = 0; i < this.hack_.resources.length; i++) {
    var res = this.hack_.resources[i];
    var resItem = new jsh.ResourceListItem(res);
    resourceListContainer.addChild(resItem, true);
    goog.events.listen(resItem, goog.ui.Component.EventType.ACTION,
        this.handleResourceClick, false, this);
  }

  this.editorContainer_ = new jsh.EditorContainer();

  this.hackDetails_ = new jsh.HackDetailsArea();
  this.editorContainer_.addChild(this.hackDetails_, true);
  this.currentEditor_ = this.hackDetails_;

  this.splitpane_ = new jsh.SplitPane(resourceListContainer,
      this.editorContainer_, goog.ui.SplitPane.Orientation.HORIZONTAL);
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

  goog.events.listen(this.hackDetails_,
      jsh.HackDetailsArea.EventType.REQUIRED_DETAILS_VALID,
      function() {
        this.btnSave_.setEnabled(true);
      }, false, this);

  goog.events.listen(this.hackDetails_,
      jsh.HackDetailsArea.EventType.REQUIRED_DETAILS_INVALID,
      function() {
        this.btnSave_.setEnabled(false);
      }, false, this);
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


/**
 * Events generated by {@link jsh.HackEditor}
 * @enum {String}
 */
jsh.HackEditor.EventTypes = {
  SAVE: 'save'
};

//hack.name = ed.hackDetails.hackNameInput.value;
//hack.identifier = ed.hackDetails.hackNameInput.value;
//hack.description = ed.hackDetails.hackNameInput.value;
//hack.version = ed.hackDetails.hackNameInput.value;
//hack.targetVersionMin = ed.hackDetails.hackNameInput.value;
//hack.targetVersionMax = ed.hackDetails.hackNameInput.value;
//hack.developerName = ed.hackDetails.hackNameInput.value;
//hack.developerInstitution = ed.hackDetails.hackNameInput.value;


/**
 * Returns the name of the hack.
 * @return {String}
 */
jsh.HackEditor.prototype.getHackName = function() {
  return this.hackDetails_.hackNameInput.value;
};


/**
 * Returns the name of the hack.
 * @return {String}
 */
jsh.HackEditor.prototype.getHackIdentifier = function() {
  return this.hackDetails_.hackIdentifierInput.value;
};
