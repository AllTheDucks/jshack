goog.provide('jsh.RestrictionPane');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('jsh.RestrictionEditor');
goog.require('jsh.RestrictionTypeHelper');
goog.require('jsh.model.restrictionType');
goog.require('jsh.soy.editor');



/**
 * Component for adding restrictions to an injected resource.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.RestrictionPane = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.ui.MenuButton}
   */
  this.restrictionMenuButton_;

  /**
   * @type {goog.ui.Menu}
   * @private
   */
  this.restrictionMenu_ = null;

  /**
   *  @type {goog.ui.Component}
   *  @private
   */
  this.restrictionEditors_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.emptyNotice_ = null;
};
goog.inherits(jsh.RestrictionPane, goog.ui.Component);


/**
 * @override
 */
jsh.RestrictionPane.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.restrictionPane);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.RestrictionPane.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var listEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-restriction-pane-content'), element);
  this.restrictionEditors_ = new goog.ui.Component();
  this.addChild(this.restrictionEditors_, false);
  this.restrictionEditors_.render(listEl);

  this.emptyNotice_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-empty-notice'), element);

  this.restrictionMenu_ = new goog.ui.Menu();

  this.restrictionMenuButton_ = new goog.ui.MenuButton('Add Restriction',
      this.restrictionMenu_);
  for (var key in jsh.model.restrictionType) {
    var restrictionType = /** @type {jsh.model.restrictionType} */
        (jsh.model.restrictionType[key]);
    var label = jsh.RestrictionTypeHelper.getMenuLabel(restrictionType);
    var menuItem = new goog.ui.MenuItem(label);
    this.restrictionMenu_.addChild(menuItem, true);

    goog.events.listen(menuItem, goog.ui.Component.EventType.ACTION,
        goog.bind(this.addRestriction_, this, restrictionType));
  }

  this.restrictionMenuButton_.render(goog.dom.getElementByClass(
      goog.getCssName('jsh-restriction-button'), element));

  //  var cbel = goog.dom.getElementByClass('jsh-checkswitch', element);
  //
  //  var cb = new goog.ui.Checkbox(goog.ui.Checkbox.State.CHECKED, null,
  //      new jsh.CheckSwitchRenderer());
  //  cb.decorate(cbel);
};


/**
 * Called when the Control is known to be in the document.
 * @override
 */
jsh.RestrictionPane.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.events.listen(this.restrictionEditors_, jsh.events.EventType.REMOVE,
      function(e) {
        this.removeRestriction_(/** @type {goog.ui.Component} */(e.target));
      }, false, this);
};


/**
 * Sets the enabled status of this component.
 * @param {boolean} enabled
 */
jsh.RestrictionPane.prototype.setEnabled = function(enabled) {
  this.restrictionMenuButton_.setEnabled(enabled);
  this.restrictionEditors_.forEachChild(function(child, i) {
    child.setEnabled(enabled);
  }, this.restrictionEditors_);
};


/**
 * Adds the restriction editor to the component.
 * @param {jsh.model.restrictionType!} type
 * @private
 */
jsh.RestrictionPane.prototype.addRestriction_ = function(type) {
  var editor = jsh.RestrictionTypeHelper.getEditor(type);

  this.restrictionEditors_.addChild(editor, true);
  this.refreshEmptyNotice_();
};


/**
 * Removes the specified editor.
 * @param {goog.ui.Component!} editor The editor to be removed
 * @private
 */
jsh.RestrictionPane.prototype.removeRestriction_ = function(editor) {
  this.restrictionEditors_.removeChild(editor, true);
  this.refreshEmptyNotice_();
};


/**
 * Shows or hides the message about no injection points, based on the
 * state of the list.
 * @private
 */
jsh.RestrictionPane.prototype.refreshEmptyNotice_ = function() {
  goog.style.setElementShown(this.emptyNotice_,
      !this.restrictionEditors_.hasChildren());
};
