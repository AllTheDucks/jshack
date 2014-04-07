goog.provide('jsh.HackDetailsArea');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
goog.require('jsh.soy.editor');



/**
 * The Panel which contains all the controls for editing the details of a hack.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.BaseEditor}
 * @constructor
 */
jsh.HackDetailsArea = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = false;
};
goog.inherits(jsh.HackDetailsArea, jsh.BaseEditor);


/**
 * @override
 */
jsh.HackDetailsArea.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.editor.hackDetailsArea);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.HackDetailsArea.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * Called when component's element is known to be in the document.
 * @override
 */
jsh.HackDetailsArea.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var element = this.getElement();
  this.hackNameInput = goog.dom.getElementByClass('hack-name', element);
  this.hackDescInput = goog.dom.getElementByClass('hack-description', element);
  this.hackIdentifierInput = goog.dom.getElementByClass('hack-identifier',
      element);
  this.hackVersionInput = goog.dom.getElementByClass('hack-version', element);
  this.hackTargetVerMinInput = goog.dom.getElementByClass(
      'hack-targetVersionMin', element);
  this.hackTargetVerMaxInput = goog.dom.getElementByClass(
      'hack-targetVersionMax', element);

  goog.events.listen(this.hackNameInput,
      goog.events.EventType.BLUR, function() {
        this.validateRequiredField_(this.hackNameInput);
      }, false, this);
  goog.events.listen(this.hackIdentifierInput,
      goog.events.EventType.BLUR, function() {
        this.validateRequiredField_(this.hackIdentifierInput);
      }, false, this);
};


/**
 * Checks whether all the hackdetails are valid.
 * @return {boolean}
 */
jsh.HackDetailsArea.prototype.isValid = function() {
  var idVal = this.hackIdentifierInput.value.trim();
  var nameVal = this.hackNameInput.value.trim();
  var isValid = (idVal && (idVal !== '') && nameVal && (nameVal !== ''));

  return isValid;
};


/**
 * Validates all the fields and toggles and visual identifier for the user.
 */
jsh.HackDetailsArea.prototype.validateFields = function() {
  this.validateRequiredField_(this.hackIdentifierInput);
  this.validateRequiredField_(this.hackNameInput);
};


/**
 * Validates a specific form fields and toggles the visual identifier.
 * @param {Element!} element The form field element to validate.
 * @private
 */
jsh.HackDetailsArea.prototype.validateRequiredField_ = function(element) {
  var val = element.value.trim();

  var visualIdentifer = goog.dom.getNextElementSibling(element);

  if (val === '') {
    goog.dom.classlist.add(visualIdentifer,
        goog.getCssName('required-input-show'));
  } else {
    goog.dom.classlist.remove(visualIdentifer,
        goog.getCssName('required-input-show'));
  }
};

