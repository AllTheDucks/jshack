goog.provide('jsh.RoleRestrictionEditor');
goog.provide('jsh.SystemRoleRestrictionEditor');

goog.require('atd.ToggleButtonGroup');
goog.require('goog.events.Event');
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
};
goog.inherits(jsh.RoleRestrictionEditor, jsh.RestrictionEditor);


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
jsh.RoleRestrictionEditor.prototype.decorateInternal =
    function(element) {
  this.setElementInternal(element);

  var labelEl = goog.dom.getElementByClass('jsh-label', element);
  goog.dom.setTextContent(labelEl, this.getLabel() + ':');
};


/**
 * @override
 */
jsh.RoleRestrictionEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.dispatchEvent(new goog.events.Event(this.getAddEvent()));
};


/**
 * Get the label to display on this editor
 * @type {function(): string}
 */
jsh.RoleRestrictionEditor.prototype.getLabel = goog.abstractMethod;


/**
 * Gets the list of roles to choose from in this editor
 * @type {function(): jsh.events.EventType}
 */
jsh.RoleRestrictionEditor.prototype.getAddEvent = goog.abstractMethod;



/**
 * Restriction editor for Roles.
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
jsh.SystemRoleRestrictionEditor.prototype.getAddEvent = function() {
  return jsh.events.EventType.SYSTEM_ROLE_RESTRICTION_EDITOR_ADDED;
};

