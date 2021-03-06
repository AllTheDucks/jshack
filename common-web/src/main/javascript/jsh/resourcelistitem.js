goog.provide('jsh.ResourceListItem');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.dom.selection');
goog.require('goog.events.Event');
goog.require('goog.style');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.ResourceListBaseItem');
goog.require('jsh.ResourceListItemRenderer');
goog.require('jsh.events.EventType');
goog.require('jsh.model.HackResource');



/**
 * A component which renders a listing of the contents of a package
 *
 * @param {jsh.model.HackResource} resource a resource in the hack.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {jsh.ResourceListBaseItem}
 * @constructor
 */
jsh.ResourceListItem = function(resource, opt_domHelper) {
  goog.base(this, opt_domHelper);

  /** @type {Element} */
  this.textEl_;

  /** @type {Element} */
  this.nameInput_;

  /** @type {goog.events.KeyHandler}
   * @private
   */
  this.keyHandler_;

  this.setModel(resource);
};
goog.inherits(jsh.ResourceListItem, jsh.ResourceListBaseItem);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListItem.prototype.createDom = function() {
  var resource = this.getModel();
  var resourceItem = goog.dom.createDom('div',
      goog.getCssName('jsh-resourcelistitem'));

  var iconClass = jsh.MimeTypeHelper.getIconClass(resource.mime);
  this.textEl_ = goog.dom.createDom('div', { 'class': goog.getCssName('text') },
      resource.path);
  this.nameInput_ = goog.dom.createDom('input', { 'class':
        goog.getCssName('nameInput'), 'style': 'display:none;',
    'value': resource.path});

  goog.dom.classlist.add(resourceItem, iconClass);

  resourceItem.appendChild(goog.dom.createDom('div',
      { 'class': goog.getCssName('icon') }));
  resourceItem.appendChild(this.textEl_);
  resourceItem.appendChild(this.nameInput_);

  this.decorateInternal(resourceItem);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceListItem.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * Called when the Control is known to be in the document.
 * @override
 */
jsh.ResourceListItem.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.events.listen(this.getElement(), goog.events.EventType.MOUSEUP,
      function(e) {
        if (this.isSelected()) {
          this.setNameEditable();
          e.stopPropagation();
        }
      }, false, this);

  goog.events.listen(this.nameInput_, goog.events.EventType.BLUR,
      this.setNameUneditable, false, this);

  goog.events.listen(this.nameInput_,
      [goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEDOWN],
      function(e) {
        e.stopPropagation();
      }, false, this);
};


/**
 * Sets the name editable. This should only be called if the ResourceItem is
 * already selected.
 */
jsh.ResourceListItem.prototype.setNameEditable = function() {

  goog.style.setElementShown(this.nameInput_, true);
  this.nameInput_.focus();
  goog.style.setElementShown(this.textEl_, false);
  goog.dom.selection.setStart(this.nameInput_, 0);
  var nameVal = this.nameInput_.value;
  var dotLocation = nameVal.lastIndexOf('.');
  goog.dom.selection.setEnd(this.nameInput_,
      dotLocation === -1 ? this.nameInput_.value.length : dotLocation);

  this.dispatchEvent(new goog.events.Event(
      jsh.events.EventType.RESOURCE_NAME_EDITABLE));
};


/**
 * Sets the name to its read-only state, and stores the modified value back
 * into the model.
 */
jsh.ResourceListItem.prototype.setNameUneditable = function() {
  goog.style.setElementShown(this.nameInput_, false);
  goog.style.setElementShown(this.textEl_, true);
  var resource = this.getModel();
  var newName = this.nameInput_.value;
  var oldName = resource.path;
  this.textEl_.innerText = newName;
  resource.path = newName;

  this.dispatchEvent(new goog.events.Event(
      jsh.events.EventType.RESOURCE_NAME_UNEDITABLE));
  if (newName != oldName) {
    this.dispatchEvent(new goog.events.Event(
        jsh.events.EventType.RESOURCE_RENAMED));
  }
};


/**
 * Returns the value that this resource item should be sorted on.
 * @return {?string}
 * @override
 */
jsh.ResourceListItem.prototype.getSortKey = function() {
  return /** @type {?string} */(this.getModel().path);
};
