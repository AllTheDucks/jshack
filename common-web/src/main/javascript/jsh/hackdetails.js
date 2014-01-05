goog.provide('jsh.HackDetailsArea');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.BaseEditor');
goog.require('jsh.soy.editor');



/**
 * @param {jsh.model.Hack!} hack the hack to get the details from.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {jsh.BaseEditor}
 * @constructor
 */
jsh.HackDetailsArea = function(hack, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.setModel(hack);
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
  this.hackNameInput = document.
      getElementsByName('hack.name', element)[0];
  this.hackDescInput = document.
      getElementsByName('hack.description', element)[0];
  this.hackIdInput = document.
      getElementsByName('hack.identifier', element)[0];
  this.hackVersionInput = document.
      getElementsByName('hack.version', element)[0];
  this.hackTargetVerMinInput = document.
      getElementsByName('hack.targetVersionMin', element)[0];
  this.hackTargetVerMaxInput = document.
      getElementsByName('hack.targetVersionMax', element)[0];

  goog.events.listen(this.hackNameInput,
      [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
        goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
  goog.events.listen(this.hackDescInput,
      [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
        goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
  goog.events.listen(this.hackIdInput,
      [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
        goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
};


/**
 *
 * @param {goog.events.Event!} e the event.
 */
jsh.HackDetailsArea.prototype.onRequiredInputChange = function(e) {
  var idVal = this.hackIdInput.value.trim();
  var newStateValid = (idVal && idVal !== '');
  if (!this.valid && newStateValid) {
    this.dispatchEvent({type:
          jsh.HackDetailsArea.EventType.REQUIRED_DETAILS_VALID});
  } else if (this.valid && !newStateValid) {
    this.dispatchEvent({type:
          jsh.HackDetailsArea.EventType.REQUIRED_DETAILS_INVALID});
  }
  this.valid = newStateValid;
};


/**
 * Events fired by the HackDetailsArea in response to input by the user.
 *
 * @enum {string}
 */
jsh.HackDetailsArea.EventType = {
  /** Dispatched after the required details have become valid. */
  REQUIRED_DETAILS_VALID: 'detailsvalid',

  /** Dispatched after the required details have become invalid. */
  REQUIRED_DETAILS_INVALID: 'detailsinvalid'
};

