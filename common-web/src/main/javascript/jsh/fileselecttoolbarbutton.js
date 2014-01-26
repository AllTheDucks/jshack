goog.provide('jsh.FileSelectToolbarButton');


goog.require('goog.soy');
goog.require('goog.ui.ToolbarButton');
goog.require('jsh.events.FileImportEvent');
goog.require('jsh.soy.editor');



/**
 * JSHacks Toolbar button which triggers a file select.
 *
 * @param {string!} text the text to display on the button
 * @param {string!} iconClass the font-awesome iconClass class
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.ToolbarButton}
 * @constructor
 */
jsh.FileSelectToolbarButton = function(text, iconClass, opt_domHelper) {
  var el = goog.soy.renderAsElement(jsh.soy.editor.fileSelectToolbarButton,
      {text: text, iconClass: iconClass});

  goog.base(this, el, null, opt_domHelper);
};
goog.inherits(jsh.FileSelectToolbarButton, goog.ui.ToolbarButton);


/**
 * Called when component's element is known to be in the document.
 * @override
 */
jsh.FileSelectToolbarButton.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.fileSelectEl = goog.dom.getElementByClass(
      goog.getCssName('toolbar-file-select'), this.getElement());

  goog.events.listen(this,
      goog.ui.Component.EventType.ACTION,
      function() {
        this.fileSelectEl.click();
      }, false, this);

  goog.events.listen(this.fileSelectEl,
      goog.events.EventType.CHANGE,
      function(evt) {
        var fileEvt = new jsh.events.FileImportEvent(evt.target.files);
        this.dispatchEvent(fileEvt);
      }, false, this);
};
