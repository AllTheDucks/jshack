goog.provide('atd.ui.ModalUiContainer');

goog.require('goog.dom.classlist');
goog.require('goog.ui.Component');



/**
 * The Partially opaque overlay for displaying modal UI components.
 *
 * @param {goog.ui.Component!} appComponent The {@link goog.ui.Component}
 * element that is the root element of the application.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
atd.ui.ModalUiContainer = function(appComponent, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.app_ = appComponent;

  /**
   * @type {Element}
   */
  this.appEl_;

  /**
   * @type {Element}
   */
  this.overlayEl_;

  /**
   * @type {Element}
   */
  this.dialogEl_;

  /**
   * @type {goog.ui.Component}
   */
  this.currentDialog_;
};
goog.inherits(atd.ui.ModalUiContainer, goog.ui.Component);


/**
 * @override
 */
atd.ui.ModalUiContainer.prototype.createDom = function() {

  this.appEl_ = goog.dom.createDom('div', goog.getCssName('atd-modal-ui-app'));
  this.overlayEl_ = goog.dom.createDom('div',
      goog.getCssName('atd-modal-ui-overlay'));
  this.dialogEl_ = goog.dom.createDom('div',
      goog.getCssName('atd-modal-ui-dialog-container'));
  var rootEl = goog.dom.createDom('div',
      goog.getCssName('atd-modal-ui-container'),
      this.appEl_, this.overlayEl_, this.dialogEl_);

  this.addChild(this.app_, false);
  this.app_.render(this.appEl_);

  goog.style.setElementShown(this.overlayEl_, false);

  this.decorateInternal(rootEl);

};


/**
 * This method returns the element which "dialog" components will be added to.
 * @override
 */
atd.ui.ModalUiContainer.prototype.getContentElement = function() {
  return this.dialogEl_;
};


/**
 *
 * @param {goog.ui.Component!} dialog The dialog to be shown.
 */
atd.ui.ModalUiContainer.prototype.showDialog = function(dialog) {
  this.hideDialog();

  if (this.indexOfChild(dialog) == -1) {
    this.addChild(dialog, true);
    this.currentDialog_ = dialog;
  } else {
    goog.style.setElementShown(dialog.getElement(), true);
  }
  goog.dom.classlist.add(this.appEl_,
      goog.getCssName('atd-modal-ui-app-blur'));
  goog.style.setElementShown(this.overlayEl_, true);

};


/**
 *
 */
atd.ui.ModalUiContainer.prototype.hideDialog = function() {
  if (this.currentDialog_) {
    goog.style.setElementShown(this.currentDialog_.getElement(), false);
    goog.style.setElementShown(this.overlayEl_, false);
    goog.dom.classlist.remove(this.appEl_,
        goog.getCssName('atd-modal-ui-app-blur'));
  }
};
