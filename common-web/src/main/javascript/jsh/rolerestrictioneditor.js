goog.provide('jsh.RoleRestrictionEditor');
goog.provide('jsh.SystemRoleRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.events.Event');
goog.require('goog.ui.ComboBox');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.LabelInput');
goog.require('goog.ui.ToggleButton');
goog.require('jsh.events.EventType');
goog.require('jsh.model.BbRole');



/**
 * Restriction editor for Roles.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RestrictionEditor}
 * @constructor
 */
jsh.RoleRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /** @type {goog.ui.ComboBox} */
  this.roleCombo_;
};
goog.inherits(jsh.RoleRestrictionEditor, jsh.RestrictionEditor);


/**
 * @type {Object}
 */
jsh.RoleRestrictionEditor.roleCache = {};


/**
 * @override
 */
jsh.RoleRestrictionEditor.prototype.createDom = function() {
  var el = this.wrapDom(goog.soy.renderAsElement(
      jsh.soy.editor.roleRestrictionEditor));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.RoleRestrictionEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var labelEl = goog.dom.getElementByClass(goog.getCssName('jsh-label'),
      element);
  goog.dom.setTextContent(labelEl, this.getLabel() + ':');

  var optionsEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-role-restriction-editor-options'), element);

  this.roleCombo_ = new goog.ui.ComboBox();
  this.addChild(this.roleCombo_, false);

  this.roleCombo_.render(optionsEl);
};


/**
 * @override
 */
jsh.RoleRestrictionEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  if (jsh.RoleRestrictionEditor.roleCache[this.getDataRequestType] == null) {
    this.dispatchEvent(
        new jsh.events.DataRequestEvent(this.getDataRequestType(),
        goog.bind(this.handleData, this)));
  } else {
    this.updateCombo();
  }
};


/**
 * Handle the data that comes back from the data request.
 * @param {Array.<jsh.model.BbRole>} roleList
 */
jsh.RoleRestrictionEditor.prototype.handleData = function(roleList) {
  jsh.RoleRestrictionEditor.roleCache[this.getDataRequestType] = roleList;
  this.updateCombo();
};


/**
 * Updates the role combo from the cache
 */
jsh.RoleRestrictionEditor.prototype.updateCombo = function() {
  this.roleCombo_.removeAllItems();
  goog.array.forEach(
      jsh.RoleRestrictionEditor.roleCache[this.getDataRequestType],
      function(role, i, roleList) {
        this.roleCombo_.addItem(new goog.ui.MenuItem(role.name, role));
      }, this);
};


/**
 * @inheritDoc
 */
jsh.RoleRestrictionEditor.prototype.setEnabled = function(enabled) {
  goog.base(this, 'setEnabled', enabled);
  this.roleCombo_.setEnabled(enabled);
};


/**
 * Get the label to display on this editor
 * @type {function(): string}
 */
jsh.RoleRestrictionEditor.prototype.getLabel = goog.abstractMethod;


/**
 * returns the DataRequestType for this component.
 * @type {function(): jsh.events.DataRequestType}
 */
jsh.RoleRestrictionEditor.prototype.getDataRequestType = goog.abstractMethod;



/**
 * Restriction editor for System Roles.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RoleRestrictionEditor}
 * @constructor
 */
jsh.SystemRoleRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.SystemRoleRestrictionEditor, jsh.RoleRestrictionEditor);


/**
 * @inheritDoc
 */
jsh.SystemRoleRestrictionEditor.prototype.getLabel = function() {
  return 'System Role';
};


/**
 * @inheritDoc
 */
jsh.SystemRoleRestrictionEditor.prototype.getDataRequestType = function() {
  return jsh.events.DataRequestType.SYSTEM_ROLES;
};



/**
 * Restriction editor for Course Roles.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RoleRestrictionEditor}
 * @constructor
 */
jsh.CourseRoleRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.CourseRoleRestrictionEditor, jsh.RoleRestrictionEditor);


/**
 * @inheritDoc
 */
jsh.CourseRoleRestrictionEditor.prototype.getLabel = function() {
  return 'Course Role';
};


/**
 * @inheritDoc
 */
jsh.CourseRoleRestrictionEditor.prototype.getDataRequestType = function() {
  return jsh.events.DataRequestType.COURSE_ROLES;
};



/**
 * Restriction editor for Institution Roles.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.RoleRestrictionEditor}
 * @constructor
 */
jsh.InstitutionRoleRestrictionEditor = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.InstitutionRoleRestrictionEditor, jsh.RoleRestrictionEditor);


/**
 * @inheritDoc
 */
jsh.InstitutionRoleRestrictionEditor.prototype.getLabel = function() {
  return 'Institution Role';
};


/**
 * @inheritDoc
 */
jsh.InstitutionRoleRestrictionEditor.prototype.getDataRequestType = function() {
  return jsh.events.DataRequestType.INSTITUTION_ROLES;
};
