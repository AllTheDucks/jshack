goog.provide('jsh.HackList');

goog.require('goog.dom');
goog.require('goog.dom.classlist');



/**
 * A component which renders a listing of the contents of a package
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.HackList = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(jsh.HackList, goog.ui.Component);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.HackList.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.HackList.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  goog.dom.classlist.add(element, goog.getCssName('jsh-hacklist'));

  var hackNameElem = goog.dom.createDom('div');
  goog.dom.classlist.add(hackNameElem,
      goog.getCssName('jsh-hacklist-hackname'));
  goog.dom.setTextContent(hackNameElem, 'Gradebook Column Protector');

  var hackIdElem = goog.dom.createDom('div');
  goog.dom.classlist.add(hackIdElem,
      goog.getCssName('jsh-hacklist-hackid'));
  goog.dom.setTextContent(hackIdElem, 'gbcolprotect');

  var resourceListElem = goog.dom.createDom('ul');
  goog.dom.classlist.add(resourceListElem,
      goog.getCssName('jsh-hacklist-resourcelist'));

  var css = goog.dom.createDom('li');
  goog.dom.classlist.add(css,
      goog.getCssName('jsh-hacklist-resource'));
  goog.dom.classlist.add(css,
      goog.getCssName('jsh-hacklist-resource-css'));
  css.appendChild(goog.dom.createDom('div',
      { 'class': 'icon' }));
  css.appendChild(goog.dom.createDom('div',
      { 'class': 'text' }, 'gbcolprotect.css'));

  var js = goog.dom.createDom('li');
  goog.dom.classlist.add(js,
      goog.getCssName('jsh-hacklist-resource'));
  goog.dom.classlist.add(js,
      goog.getCssName('jsh-hacklist-resource-js'));
  js.appendChild(goog.dom.createDom('div',
      { 'class': 'icon'}));
  js.appendChild(goog.dom.createDom('div',
      { 'class': 'text' }, 'gbcolprotect.js'));

  var png = goog.dom.createDom('li');
  goog.dom.classlist.add(png,
      goog.getCssName('jsh-hacklist-resource'));
  goog.dom.classlist.add(png,
      goog.getCssName('jsh-hacklist-resource-png'));
  png.appendChild(goog.dom.createDom('div',
      { 'class': 'icon' }));
  png.appendChild(goog.dom.createDom('div',
      { 'class': 'text' }, 'lock.png'));

  resourceListElem.appendChild(css);
  resourceListElem.appendChild(js);
  resourceListElem.appendChild(png);

  element.appendChild(hackNameElem);
  element.appendChild(hackIdElem);
  element.appendChild(resourceListElem);
};
