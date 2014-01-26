goog.provide('jsh.ResourceListItem');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.ResourceListItemRenderer');
goog.require('jsh.model.HackResource');



/**
 * A component which renders a listing of the contents of a package
 *
 * @param {jsh.model.HackResource} resource a resource in the hack.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Control}
 * @constructor
 */
jsh.ResourceListItem = function(resource, opt_domHelper) {
  goog.base(this, null, null, opt_domHelper);

  /** @type {Element} */
  this.textEl_;

  /** @type {Element} */
  this.nameInput_;

  this.setModel(resource);

  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setAutoStates(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(jsh.ResourceListItem, goog.ui.Control);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListItem.prototype.createDom = function() {
  var resource = this.getModel();
  var resourceItem = goog.dom.createDom('div', 'jsh-resourcelistitem');

  var iconClass = jsh.MimeTypeHelper.getIconClass(resource.mime);
  this.textEl_ = goog.dom.createDom('div', { 'class': 'text' }, resource.path);
  this.nameInput_ = goog.dom.createDom('input', { 'class': 'nameInput' ,
    'style': 'display:none;', 'value': resource.path});

  goog.dom.classlist.add(resourceItem, iconClass);

  resourceItem.appendChild(goog.dom.createDom('div',
      { 'class': 'icon' }));
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
  goog.events.listen(this.textEl_, goog.events.EventType.MOUSEDOWN,
      function(e) {
        goog.style.setElementShown(this.nameInput_, true);
        goog.style.setElementShown(this.textEl_, false);
        this.nameInput_.click();
        e.stopPropagation();
      }, false, this);
  goog.events.listen(this.nameInput_,
      [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP],
      function(e) {
        e.stopPropagation();
      }, false, this);
  goog.events.listen(this.textEl_,
      [goog.events.EventType.MOUSEUP],
      function(e) {
        e.stopPropagation();
      }, false, this);
};


// Register the default renderer for goog.ui.Controls.
goog.ui.registry.setDefaultRenderer(jsh.ResourceListItem,
    jsh.ResourceListItemRenderer);
