goog.provide('jsh.ResourceListItem');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
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
  goog.base(this, opt_domHelper);

  this.setModel(resource);
};
goog.inherits(jsh.ResourceListItem, goog.ui.Control);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.ResourceListItem.prototype.createDom = function() {
  var resource = this.getModel();
  var resourceItem = goog.dom.createDom('li', 'jsh-resourcelistitem');

  var iconClass;
  switch (resource.mime) {
    case 'image/png':
      iconClass = goog.getCssName('jsh-resourcelistitem-png');
      break;
    case 'text/css':
      iconClass = goog.getCssName('jsh-resourcelistitem-css');
      break;
    case 'application/javascript':
      iconClass = goog.getCssName('jsh-resourcelistitem-js');
      break;
    default:
      iconClass = goog.getCssName('jsh-resourcelistitem-default');
  }
  goog.dom.classlist.add(resourceItem, iconClass);

  resourceItem.appendChild(goog.dom.createDom('div',
      { 'class': 'icon' }));
  resourceItem.appendChild(goog.dom.createDom('div',
      { 'class': 'text' }, resource.path));

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
