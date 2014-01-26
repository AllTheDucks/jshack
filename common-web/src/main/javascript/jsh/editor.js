goog.provide('jsh.HackEditor');

goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.ui.Component');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.SplitPane');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarMenuButton');
goog.require('goog.ui.ToolbarSeparator');
goog.require('goog.ui.tree.TreeControl');
goog.require('jsh.AceEditor');
goog.require('jsh.DefaultEditor');
goog.require('jsh.EditorContainer');
goog.require('jsh.FileSelectToolbarButton');
goog.require('jsh.HackDetailsArea');
goog.require('jsh.ImageEditor');
goog.require('jsh.ResourceListContainer');
goog.require('jsh.ResourceListHeader');
goog.require('jsh.ResourceListItem');
goog.require('jsh.SplitPane');
goog.require('jsh.TextEditor');
goog.require('jsh.events.EventType');
goog.require('jsh.events.FileImportEvent');
goog.require('jsh.model.Hack');



/**
 * The Main Editor component for JSHack.  Contains the splitpane and
 * coordinates interactions between the child components.
 *
 * @param {jsh.model.Hack=} opt_hack The hack to be edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.HackEditor = function(opt_hack, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.splitpane_ = null;

  this.viewSizeMonitor_ = new goog.dom.ViewportSizeMonitor();

  this.editorCache_ = {};

  this.editorContainer_ = null;

  this.currentEditor_ = null;

  this.resourceListHeader_ = null;

  //TODO This needs to go somewhere else, like a constant or something
  this.splitPaneHandleWidth_ = 5;

  this.setModel(opt_hack);

};
goog.inherits(jsh.HackEditor, goog.ui.Component);


/**
 * Creates the div in which the Hack editor is placed
 *
 * @override
 */
jsh.HackEditor.prototype.createDom = function() {
  var el = goog.dom.createDom('div', goog.getCssName('ide'));
  this.decorateInternal(el);
};


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

  this.btnSave_ = new goog.ui.ToolbarButton(this.createButtonDOM_('Save',
      goog.getCssName('fa-floppy-o')));
  this.btnSave_.setEnabled(false);
  toolbar.addChild(this.btnSave_, true);
  goog.events.listen(this.btnSave_, goog.ui.Component.EventType.ACTION,
      function() {
        this.dispatchEvent({type: jsh.events.EventType.SAVE});
      }, false, this);

  var btnClose = new goog.ui.ToolbarButton(this.createButtonDOM_('Close',
      goog.getCssName('fa-power-off')));
  toolbar.addChild(btnClose, true);

  toolbar.addChild(new goog.ui.ToolbarSeparator(), true);

  var btnUpload = new jsh.FileSelectToolbarButton('Import Resource',
      goog.getCssName('fa-upload'));
  toolbar.addChild(btnUpload, true);


  var btnNew = new goog.ui.ToolbarMenuButton(
      this.createButtonDOM_('Create Resource', goog.getCssName('fa-plus')));
  var jsFileMenuItem = new goog.ui.MenuItem('Javascript File');
  btnNew.addItem(jsFileMenuItem);
  var htmlFileMenuItem = new goog.ui.MenuItem('HTML File');
  btnNew.addItem(htmlFileMenuItem);
  var cssFileMenuItem = new goog.ui.MenuItem('CSS File');
  btnNew.addItem(cssFileMenuItem);

  toolbar.addChild(btnNew, true);

  goog.events.listen(jsFileMenuItem, goog.ui.Component.EventType.ACTION,
      function() {
        this.createResource('newresource.js', 'application/javascript');
      }, false, this);
  goog.events.listen(cssFileMenuItem, goog.ui.Component.EventType.ACTION,
      function() {
        this.createResource('newresource.css', 'text/css');
      }, false, this);
  goog.events.listen(htmlFileMenuItem, goog.ui.Component.EventType.ACTION,
      function() {
        this.createResource('newresource.html', 'text/html');
      }, false, this);


  var btnDelete = new goog.ui.ToolbarButton(
      this.createButtonDOM_('Delete Resource', goog.getCssName('fa-minus')));
  toolbar.addChild(btnDelete, true);

  this.addChild(toolbar, true);

  this.resourceListContainer_ = new jsh.ResourceListContainer();

  this.resourceListHeader_ = new jsh.ResourceListHeader();
  this.resourceListContainer_.addChild(this.resourceListHeader_, true);

  goog.events.listen(this.resourceListHeader_,
      goog.ui.Component.EventType.SELECT,
      this.showHackDetailsArea, false, this);

  this.editorContainer_ = new jsh.EditorContainer();

  this.hackDetails_ = new jsh.HackDetailsArea();
  this.editorContainer_.addChild(this.hackDetails_, true);
  this.currentEditor_ = this.hackDetails_;

  this.splitpane_ = new jsh.SplitPane(this.resourceListContainer_,
      this.editorContainer_, goog.ui.SplitPane.Orientation.HORIZONTAL);
  this.splitpane_.setInitialSize(300);
  this.splitpane_.setHandleSize(this.splitPaneHandleWidth_);

  this.addChild(this.splitpane_, true);

};


/**
 * Update the state of the editor based on the details in a hack object.
 * @param {jsh.model.Hack} hack The hack containing the new details
 */
jsh.HackEditor.prototype.updateEditorState = function(hack) {
  this.hackDetails_.hackIdentifierInput.value =
      hack.identifier ? hack.identifier : '';
  this.hackDetails_.hackNameInput.value = hack.name ? hack.name : '';
  this.hackDetails_.hackDescInput.value =
      hack.description ? hack.description : '';
  this.hackDetails_.hackVersionInput.value =
      hack.version ? hack.version : '';
  this.hackDetails_.hackTargetVerMinInput.value =
      hack.targetVersionMin ? hack.targetVersionMin : '';
  this.hackDetails_.hackTargetVerMaxInput.value =
      hack.targetVersionMax ? hack.targetVersionMax : '';

  this.resourceListHeader_.setHackName(hack.name);
  this.resourceListHeader_.setHackIdentifier(hack.identifier);

  this.setModel(hack);

  //TODO Need to update the resources when the data comes back from the server.

};


/**
 * Event handler for when the "Create Resource" button is clicked.
 * @param {string} name the name of the new resource.
 * @param {string} type the mime type of the new resource.
 */
jsh.HackEditor.prototype.createResource = function(name, type) {
  var resource = new jsh.model.HackResource();
  resource.path = name;
  resource.mime = type;
  this.addResourceListItem(resource);
};


/**
 * Given a HackResource model, adds all the required UI elements to manipulate
 * that HackResource.
 *
 * @param {jsh.model.HackResource!} resource the hack to add to the UI.
 */
jsh.HackEditor.prototype.addResourceListItem = function(resource) {
  var resItem = new jsh.ResourceListItem(resource);
  this.resourceListContainer_.addChild(resItem, true);
  goog.events.listen(resItem, goog.ui.Component.EventType.SELECT,
      this.handleResourceSelect, false, this);

  this.resourceListContainer_.setSelectedChild(resItem);
};


/**
 * Called when component's element is known to be in the document.
 * @override
 */
jsh.HackEditor.prototype.enterDocument = function() {
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

  this.resourceListContainer_.setSelectedChild(this.resourceListHeader_);

  if (this.getModel()) {
    this.updateEditorState(/** @type {jsh.model.Hack} */ (this.getModel()));
  }

  var handler = new goog.events.FileDropHandler(this.getElement(), true);
  goog.events.listen(handler, goog.events.FileDropHandler.EventType.DROP,
      function(e) {
        var files = e.getBrowserEvent().dataTransfer.files;
        var fileEvent = new jsh.events.FileImportEvent(files);
        this.dispatchEvent(fileEvent);
      }, false, this);

  goog.base(this, 'enterDocument');

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
 * @param {goog.events.Event!} e the select event
 */
jsh.HackEditor.prototype.handleResourceSelect = function(e) {
  var resourceListItem = e.currentTarget;
  var resource = resourceListItem.getModel();

  var id = resourceListItem.getId();
  var ed = this.editorCache_[id];
  if (ed == null) {
    ed = this.createEditor(resource);
    this.editorCache_[id] = ed;
    this.editorContainer_.addChild(ed, true);
  }

  this.currentEditor_.setVisible(false);
  ed.setVisible(true);
  this.currentEditor_ = ed;

  // trigger resize on ResourceEditor
  this.splitpane_.dispatchEvent(goog.ui.Component.EventType.CHANGE);
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
 * @param {jsh.model.HackResource} resource
 * @return {jsh.BaseEditor}
 */
jsh.HackEditor.prototype.createEditor = function(resource) {
  var ed;
  switch (jsh.MimeTypeHelper.getEditorType(resource.mime)) {
    case jsh.MimeTypeHelper.EditorType.TEXT:
      ed = new jsh.TextEditor(resource);
      break;

    case jsh.MimeTypeHelper.EditorType.IMAGE:
      ed = new jsh.ImageEditor(resource);
      break;

    default:
      ed = new jsh.DefaultEditor(resource);
  }
  return ed;
};


/**
 * Returns hack model which represents the current unsaved state of the editor.
 * @return {jsh.model.Hack}
 */
jsh.HackEditor.prototype.getHackModel = function() {
  var hack = new jsh.model.Hack();

  hack.identifier = this.hackDetails_.hackIdentifierInput.value;
  hack.name = this.hackDetails_.hackNameInput.value;
  hack.description = this.hackDetails_.hackDescInput.value;
  hack.version = this.hackDetails_.hackVersionInput.value;
  hack.targetVersionMin = this.hackDetails_.hackTargetVerMinInput.value;
  hack.targetVersionMax = this.hackDetails_.hackTargetVerMaxInput.value;

  return hack;
};


/**
 * Creates the DOM structure for a button with a font-awesome icon.
 * @param {string} text Text to display on the button.
 * @param {string} iconClass The font-awesome icon class.
 * @return {Element}
 * @private
 */
jsh.HackEditor.prototype.createButtonDOM_ = function(text, iconClass) {
  return goog.soy.renderAsElement(jsh.soy.editor.toolbarButton,
      {text: text, iconClass: iconClass});
};
