goog.provide('jsh.HackList');

goog.require('goog.dom');
goog.require('goog.dom.classlist');



/**
 * A component which renders a listing of the contents of a package
 *
 * @param {string} name the name of the hack being edited.
 * @param {string} id the identifier of the hack being edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.HackList = function(name, id, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.hackName_ = name;
  this.hackId_ = id;
};
goog.inherits(jsh.HackList, goog.ui.Component);


/**
 * Creates an initial DOM representation for the component.
 * @override
 */
jsh.HackList.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div',
      {'class': 'jsh-hacklist'}));
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
  goog.dom.setTextContent(hackNameElem, this.hackName_);

  var hackIdElem = goog.dom.createDom('div');
  goog.dom.classlist.add(hackIdElem,
      goog.getCssName('jsh-hacklist-hackid'));
  goog.dom.setTextContent(hackIdElem, this.hackId_);

  var resourceListElem = goog.dom.createDom('ul');
  goog.dom.classlist.add(resourceListElem,
      goog.getCssName('jsh-hacklist-resourcelist'));


  this.contentEl_ = resourceListElem;

  element.appendChild(hackNameElem);
  element.appendChild(hackIdElem);
  element.appendChild(resourceListElem);
};


/**
 * Returns a different element to the root one for this component. This will
 * result in child components being rendered into the contentEl_ element.
 * @override
 */
jsh.HackList.prototype.getContentElement = function() {
  return this.contentEl_;
};

