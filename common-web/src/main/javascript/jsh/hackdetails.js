goog.provide('jsh.HackDetailsArea');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('jsh.soy');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @constructor
 */
jsh.HackDetailsArea = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.valid = true;
};
goog.inherits(jsh.HackDetailsArea, goog.ui.Component);


/**
 * @override
 */
jsh.HackDetailsArea.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(jsh.soy.hackDetailsArea);
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

  //  this.hackNameInput =
  //      document.getElementsByName('hack.name', element)[0];
  //  this.hackDescInput =
  //      document.getElementsByName('hack.description', element)[0];
  //  this.hackIdInput =
  //      document.getElementsByName('hack.identifier', element)[0];
  //  this.hackVersionInput =
  //      document.getElementsByName('hack.version', element)[0];
  //  this.hackTargetVerMinInput =
  //      document.getElementsByName('hack.targetVersionMin', element)[0];
  //  this.hackTargetVerMaxInput =
  //      document.getElementsByName('hack.targetVersionMax', element)[0];

};


/**
 * Called when component's element is known to be in the document.
 * @override
 */
jsh.HackDetailsArea.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  //goog.events.listen(this.hackNameInput,
  //    [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
  //      goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
  //goog.events.listen(this.hackDescInput,
  //    [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
  //      goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
  //goog.events.listen(this.hackIdInput,
  //    [goog.events.EventType.KEYUP, goog.events.EventType.PASTE,
  //      goog.events.EventType.CUT], this.onRequiredInputChange, false, this);
};

