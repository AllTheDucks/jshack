goog.provide('jsh.DeveloperList');

goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');



/**
 * List if developers for a package.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.DeveloperList = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.ui.Button}
   * @private
   */
  this.addButton_ = null;

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.list_ = null;
};
goog.inherits(jsh.DeveloperList, goog.ui.Component);


/**
 * @inheritDoc
 */
jsh.DeveloperList.prototype.createDom = function() {
  var el = goog.dom.createDom('div', 'jsh-developer-list');
  this.decorateInternal(el);
};


/**
 * @inheritDoc
 */
jsh.DeveloperList.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.addButton_ = new goog.ui.Button('Add Developer',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.addChild(this.addButton_, true);

  this.list_ = new goog.ui.Component();
  this.addChild(this.list_, true);
};


/**
 * @inheritDoc
 */
jsh.DeveloperList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  goog.events.listen(this.addButton_, goog.ui.Component.EventType.ACTION,
      function() {
        this.addDeveloper();
      }, false, this);

  goog.events.listen(this.list_, jsh.events.EventType.REMOVE,
      function(e) {
        this.list_.removeChild(e.target, true);
      }, false, this);
};


/**
 * Add a developer editor to the list.
 */
jsh.DeveloperList.prototype.addDeveloper = function() {
  var ed = new jsh.DeveloperEditor();
  this.list_.addChild(ed, true);
};



/**
 * Item in the list of developers
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.DeveloperEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.ui.Button}
   * @private
   */
  this.removeButton_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.nameTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.institutionTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.urlTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.emailTextbox_ = null;
};
goog.inherits(jsh.DeveloperEditor, goog.ui.Component);


/**
 * @inheritDoc
 */
jsh.DeveloperEditor.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.developerEditor);
  this.decorateInternal(el);
};


/**
 * @inheritDoc
 */
jsh.DeveloperEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var closeEl = goog.dom.getElementByClass(
      'jsh-developer-editor-close-button', element);
  this.removeButton_ = new goog.ui.Button('Remove',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.removeButton_.render(closeEl);

  var nameEl = goog.dom.getElementByClass('jsh-developer-editor-name', element);
  this.nameTextbox_ = new goog.ui.LabelInput('Jane Doe');
  this.addChild(this.nameTextbox_, false);
  this.nameTextbox_.render(nameEl);

  var institutionEl = goog.dom.getElementByClass(
      'jsh-developer-editor-institution', element);
  this.institutionTextbox_ = new goog.ui.LabelInput('University of Hacks');
  this.addChild(this.institutionTextbox_, false);
  this.institutionTextbox_.render(institutionEl);

  var urlEl = goog.dom.getElementByClass('jsh-developer-editor-url', element);
  this.urlTextbox_ = new goog.ui.LabelInput('http://jshack.net');
  this.addChild(this.urlTextbox_, false);
  this.urlTextbox_.render(urlEl);

  var emailEl = goog.dom.getElementByClass('jsh-developer-editor-email',
      element);
  this.emailTextbox_ = new goog.ui.LabelInput('jane.doe@jshack.net');
  this.addChild(this.emailTextbox_, false);
  this.emailTextbox_.render(emailEl);
};


/**
 * @inheritDoc
 */
jsh.DeveloperEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  goog.events.listen(this.removeButton_, goog.ui.Component.EventType.ACTION,
      this.handleRemoveButtonClick_, false, this);
};


/**
 * Handle the the click of the close button.
 * @param {goog.events.Event} e
 * @private
 */
jsh.DeveloperEditor.prototype.handleRemoveButtonClick_ = function(e) {
  this.dispatchEvent(new goog.events.Event(jsh.events.EventType.REMOVE));
};
