goog.provide('jsh.ConfigurationList');

goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');



/**
 * List if configuration for a package.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.ConfigurationList = function(opt_domHelper) {
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
goog.inherits(jsh.ConfigurationList, goog.ui.Component);


/**
 * @inheritDoc
 */
jsh.ConfigurationList.prototype.createDom = function() {
  var el = goog.dom.createDom('div', goog.getCssName('jsh-configuration-list'));
  this.decorateInternal(el);
};


/**
 * @inheritDoc
 */
jsh.ConfigurationList.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.addButton_ = new goog.ui.Button('Add Configuration',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.addChild(this.addButton_, true);

  this.list_ = new goog.ui.Component();
  this.addChild(this.list_, true);
};


/**
 * @inheritDoc
 */
jsh.ConfigurationList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  goog.events.listen(this.addButton_, goog.ui.Component.EventType.ACTION,
      function() {
        this.addConfiguration();
      }, false, this);

  goog.events.listen(this.list_, jsh.events.EventType.REMOVE,
      function(e) {
        this.list_.removeChild(e.target, true);
      }, false, this);
};


/**
 * Add a configuration editor to the list.
 * @param {jsh.model.ConfigEntryDefinition=} opt_model
 */
jsh.ConfigurationList.prototype.addConfiguration = function(opt_model) {
  var ed = new jsh.ConfigurationEditor(opt_model);

  this.list_.addChild(ed, true);
};


/**
 * Gets a list of {jsh.model.ConfigEntryDefinition}.
 * @return {Array.<jsh.model.ConfigEntryDefinition>}
 */
jsh.ConfigurationList.prototype.getConfiguration = function() {
  var configurations = [];
  this.list_.forEachChild(function(child, index) {
    var config = new jsh.model.ConfigEntryDefinition();
    config.name = child.getName();
    config.identifier = child.getIdentifier();
    config.description = child.getDescription();
    config.defaultValue = child.getDefaultValue();

    this.push(config);
  }, configurations);

  return configurations;
};


/**
 * Removes all existing configuration and creates an editor for each of the
 * given configuration.
 * @param {Array.<jsh.model.ConfigEntryDefinition>} configurations
 */
jsh.ConfigurationList.prototype.setConfiguration = function(configurations) {
  this.list_.removeChildren(true);

  if (configurations != null) {
    goog.array.forEach(configurations, function(item, index, array) {
      this.addConfiguration(item);
    }, this);
  }
};



/**
 * Item in the list of configuration
 * @param {jsh.model.ConfigEntryDefinition=} opt_configuration
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.ConfigurationEditor = function(opt_configuration, opt_domHelper) {
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
  this.identifierTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.nameTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.descriptionTextbox_ = null;

  /**
   * @type {goog.ui.LabelInput}
   * @private
   */
  this.defaultValueTextbox_ = null;

  if (opt_configuration != null) {
    this.setModel(opt_configuration);
  }
};
goog.inherits(jsh.ConfigurationEditor, goog.ui.Component);


/**
 * @inheritDoc
 */
jsh.ConfigurationEditor.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.configurationEditor);
  this.decorateInternal(el);
};


/**
 * @inheritDoc
 */
jsh.ConfigurationEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var closeEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-configuration-editor-close-button'), element);
  this.removeButton_ = new goog.ui.Button('Remove',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.removeButton_.render(closeEl);

  var identifierEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-configuration-editor-identifier'), element);
  this.identifierTextbox_ = new goog.ui.LabelInput('btnText');
  this.addChild(this.identifierTextbox_, false);
  this.identifierTextbox_.render(identifierEl);

  var nameEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-configuration-editor-name'), element);
  this.nameTextbox_ = new goog.ui.LabelInput('Button Text');
  this.addChild(this.nameTextbox_, false);
  this.nameTextbox_.render(nameEl);

  var descriptionEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-configuration-editor-description'), element);
  this.descriptionTextbox_ = new goog.ui.LabelInput(
      'The text that appears on the button');
  this.addChild(this.descriptionTextbox_, false);
  this.descriptionTextbox_.render(descriptionEl);

  var defaultValueEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-configuration-editor-default-value'), element);
  this.defaultValueTextbox_ = new goog.ui.LabelInput('A Button');
  this.addChild(this.defaultValueTextbox_, false);
  this.defaultValueTextbox_.render(defaultValueEl);

  var model = this.getModel();
  if (model != null) {
    if (model.name) {
      this.nameTextbox_.setValue(model.name);
    }
    if (model.identifier) {
      this.identifierTextbox_.setValue(model.identifier);
    }
    if (model.description) {
      this.descriptionTextbox_.setValue(model.description);
    }
    if (model.defaultValue) {
      this.defaultValueTextbox_.setValue(model.defaultValue);
    }
  }
};


/**
 * @inheritDoc
 */
jsh.ConfigurationEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  goog.events.listen(this.removeButton_, goog.ui.Component.EventType.ACTION,
      this.handleRemoveButtonClick_, false, this);
};


/**
 * Handle the the click of the close button.
 * @param {goog.events.Event} e
 * @private
 */
jsh.ConfigurationEditor.prototype.handleRemoveButtonClick_ = function(e) {
  this.dispatchEvent(new goog.events.Event(jsh.events.EventType.REMOVE));
};


/**
 * Gets the name of the configuration.
 * @return {string}
 */
jsh.ConfigurationEditor.prototype.getName = function() {
  return this.nameTextbox_.getValue();
};


/**
 * Sets the name of the configuration.
 * @param {string} name
 */
jsh.ConfigurationEditor.prototype.setName = function(name) {
  this.nameTextbox_.setValue(name);
};


/**
 * Gets the institution of the configuration.
 * @return {string}
 */
jsh.ConfigurationEditor.prototype.getIdentifier = function() {
  return this.identifierTextbox_.getValue();
};


/**
 * Sets the identifier of the configuration.
 * @param {string} identifier
 */
jsh.ConfigurationEditor.prototype.setIdentifier = function(identifier) {
  this.identifierTextbox_.setValue(identifier);
};


/**
 * Gets the description of the configuration.
 * @return {string}
 */
jsh.ConfigurationEditor.prototype.getDescription = function() {
  return this.descriptionTextbox_.getValue();
};


/**
 * Sets the description of the configuration.
 * @param {string} configuration
 */
jsh.ConfigurationEditor.prototype.setDescription = function(configuration) {
  this.descriptionTextbox_.setValue(configuration);
};


/**
 * Gets the default value of the configuration.
 * @return {string}
 */
jsh.ConfigurationEditor.prototype.getDefaultValue = function() {
  return this.defaultValueTextbox_.getValue();
};


/**
 * Sets the default value of the configuration.
 * @param {string} defaultValue
 */
jsh.ConfigurationEditor.prototype.setDefaultValue = function(defaultValue) {
  this.defaultValueTextbox_.setValue(defaultValue);
};
