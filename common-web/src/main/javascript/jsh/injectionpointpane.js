goog.provide('jsh.InjectionPointPane');
goog.provide('jsh.InjectionPointPaneItem');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.structs.Map');
goog.require('goog.style');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.MenuItem');
goog.require('jsh.InjectionPointHelper');
goog.require('jsh.events.EventType');
goog.require('jsh.soy.editor');



/**
 * Component for selecting injection points.
 *
 * @param {Array.<jsh.model.injectionPoint>=} opt_injectionPoints initial
 * injection points
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.InjectionPointPane = function(opt_injectionPoints, opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {goog.structs.Map}
   * @private
   */
  this.referenceMap_ = new goog.structs.Map();
  for (var key in jsh.model.injectionPoint) {
    var value = jsh.model.injectionPoint[key];
    this.referenceMap_.set(value.toString(),
        new jsh.InjectionPointPane.References_(
        /** @type {jsh.model.injectionPoint} */(value)));
  }

  /**
   * @type {Array.<jsh.model.injectionPoint>}
   * @private
   */
  this.injectionPoints_ = opt_injectionPoints ? opt_injectionPoints : [];

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.injectionPointList_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.emptyNotice_ = null;


  /**
    * @type {goog.ui.MenuButton}
    */
  this.injectionPointMenuButton_;

  /**
   * @type {goog.ui.Menu}
   * @private
   */
  this.injectionPointMenu_ = null;
};
goog.inherits(jsh.InjectionPointPane, goog.ui.Component);


/**
 * @override
 */
jsh.InjectionPointPane.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.injectionPointPane);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.InjectionPointPane.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var listEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-injection-point-pane-content'), element);
  this.injectionPointList_ = new goog.ui.Component();
  this.injectionPointList_.render(listEl);

  this.emptyNotice_ = goog.dom.getElementByClass(
      goog.getCssName('jsh-empty-notice'), element);

  this.injectionPointMenu_ = new goog.ui.Menu();
  goog.array.forEach(this.referenceMap_.getValues(),
      function(ref, index, array) {
        var menuItem = ref.getMenuItem();
        this.injectionPointMenu_.addChild(menuItem, true);

        goog.events.listen(menuItem, goog.ui.Component.EventType.ACTION,
            goog.bind(this.addInjectionPoint, this, ref.injectionPoint));
      }, this);

  var prepopulatedPoints = this.injectionPoints_;
  this.injectionPoints_ = [];
  this.addInjectionPoints(prepopulatedPoints);

  this.injectionPointMenuButton_ = new goog.ui.MenuButton('Add Injection Point',
      this.injectionPointMenu_);
  this.injectionPointMenuButton_.render(goog.dom.getElementByClass(
      goog.getCssName('jsh-injection-point-button'), element));
};


/**
 * Add a list item for the injection point
 * @param {jsh.model.injectionPoint} injectionPoint the injection point
 * @private
 */
jsh.InjectionPointPane.prototype.addInjectionPoint_ =
    function(injectionPoint) {
  if (!goog.array.contains(this.injectionPoints_, injectionPoint)) {
    this.injectionPoints_.push(injectionPoint);
    var ref = this.referenceMap_.get(injectionPoint.toString());
    ref.getMenuItem().setEnabled(false);
    var listItem = ref.getListItem();
    this.injectionPointList_.addChild(listItem, true);
    if (!goog.events.hasListener(listItem,
        jsh.events.EventType.INJECTION_POINT_REMOVED)) {
      goog.events.listen(listItem,
          jsh.events.EventType.INJECTION_POINT_REMOVED, function(e) {
            e.preventDefault();
            var injectionPoint =
                /** @type {jsh.model.injectionPoint} */
                (e.target.injectionPoint);
            this.removeInjectionPoint(injectionPoint);
          }, false, this);
    }
    this.dispatchEvent(new goog.events.Event(
        jsh.events.EventType.INJECTION_POINT_ADDED));
  }
};


/**
 * Remove the list item for the injection point
 * @param {jsh.model.injectionPoint} injectionPoint the injection point
 * @private
 */
jsh.InjectionPointPane.prototype.removeInjectionPoint_ =
    function(injectionPoint) {
  if (goog.array.contains(this.injectionPoints_, injectionPoint)) {
    goog.array.remove(this.injectionPoints_, injectionPoint);
    var ref = this.referenceMap_.get(injectionPoint.toString());
    ref.getMenuItem().setEnabled(true);
    this.injectionPointList_.removeChild(ref.getListItem(), true);
    this.dispatchEvent(new goog.events.Event(
        jsh.events.EventType.INJECTION_POINT_REMOVED));
  }
};


/**
 * Add the injection point
 * @param {jsh.model.injectionPoint} injectionPoint
 */
jsh.InjectionPointPane.prototype.addInjectionPoint = function(injectionPoint) {
  this.addInjectionPoint_(injectionPoint);
  this.refreshEmptyNotice_();
};


/**
 * Remove the injection point
 * @param {jsh.model.injectionPoint} injectionPoint
 */
jsh.InjectionPointPane.prototype.removeInjectionPoint =
    function(injectionPoint) {
  this.removeInjectionPoint_(injectionPoint);
  this.refreshEmptyNotice_();
};


/**
 * Add the injection point
 * @param {Array.<jsh.model.injectionPoint>} injectionPoints
 */
jsh.InjectionPointPane.prototype.addInjectionPoints =
    function(injectionPoints) {
  goog.array.forEach(injectionPoints, function(elem, index, array) {
    this.addInjectionPoint_(elem);
  }, this);
  this.refreshEmptyNotice_();
};


/**
 * Remove the injection point
 * @param {Array.<jsh.model.injectionPoint>} injectionPoints
 */
jsh.InjectionPointPane.prototype.removeInjectionPoints =
    function(injectionPoints) {
  goog.array.forEach(injectionPoints, function(elem, index, array) {
    this.removeInjectionPoint_(elem);
  }, this);
  this.refreshEmptyNotice_();
};


/**
 * Shows or hides the message about no injection points, based on the
 * state of the list.
 * @private
 */
jsh.InjectionPointPane.prototype.refreshEmptyNotice_ = function() {
  goog.style.setElementShown(this.emptyNotice_, this.hasInjectionPoints());
};


/**
 * Does the list have any injection points in it?
 * @return {boolean}
 */
jsh.InjectionPointPane.prototype.hasInjectionPoints = function() {
  return this.injectionPoints_.length == 0;
};


/**
 * Removes all the injection points from the list.
 */
jsh.InjectionPointPane.prototype.resetInjectionPoints = function() {
  this.removeInjectionPoints(goog.array.clone(this.injectionPoints_));
};


/**
 *
 * @param {boolean} enabled
 */
jsh.InjectionPointPane.prototype.setEnabled = function(enabled) {
  this.injectionPointMenuButton_.setEnabled(enabled);
  this.injectionPointList_.forEachChild(function(item, i) {
    item.setEnabled(enabled);
  }, this);
};



/**
 * Item in the list of selected injection points.
 *
 * @param {jsh.model.injectionPoint} injectionPoint the injection point
 * this item represents.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.InjectionPointPaneItem = function(injectionPoint, opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {jsh.model.injectionPoint}
   */
  this.injectionPoint = injectionPoint;

  /** @type {goog.ui.Button} */
  this.removeBtn_;
};
goog.inherits(jsh.InjectionPointPaneItem, goog.ui.Component);


/**
 * @override
 */
jsh.InjectionPointPaneItem.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(jsh.soy.editor.injectionPointPaneItem);
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.InjectionPointPaneItem.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var contentEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-injection-point-pane-item-content'), element);

  goog.dom.appendChild(contentEl,
      jsh.InjectionPointHelper.getItemDom(this.injectionPoint));

  var closeEl = goog.dom.getElementByClass(
      goog.getCssName('jsh-injection-point-pane-item-close-button'), element);
  this.removeBtn_ = new goog.ui.Button('Remove',
      goog.ui.Css3ButtonRenderer.getInstance());
  this.removeBtn_.render(closeEl);

  goog.events.listen(this.removeBtn_, goog.ui.Component.EventType.ACTION,
      function() {
        this.dispatchEvent(new goog.events.Event(
            jsh.events.EventType.INJECTION_POINT_REMOVED, this));
      }, true, this);
};


/**
 *
 * @param {boolean} enabled
 */
jsh.InjectionPointPaneItem.prototype.setEnabled = function(enabled) {
  this.removeBtn_.setEnabled(enabled);
};



/**
 * Class for holding references to the various components related to an
 * injection point.
 * @param {jsh.model.injectionPoint} injectionPoint
 * @constructor
 * @private
 */
jsh.InjectionPointPane.References_ = function(injectionPoint) {
  /**
   * @type {jsh.model.injectionPoint}
   */
  this.injectionPoint = injectionPoint;

  /**
   * @type {jsh.InjectionPointPaneItem}
   * @private
   */
  this.listItem_ = null;

  /**
   * @type {goog.ui.MenuItem}
   * @private
   */
  this.menuItem_ = null;
};


/**
 * Gets the list item for this injection point. It will create it if necessary.
 * @return {jsh.InjectionPointPaneItem}
 */
jsh.InjectionPointPane.References_.prototype.getListItem = function() {
  if (this.listItem_ == null) {
    this.listItem_ = new jsh.InjectionPointPaneItem(this.injectionPoint);
  }
  return this.listItem_;
};


/**
 * Gets the menu item for this injection point. It will create it if necessary.
 * @return {goog.ui.MenuItem}
 */
jsh.InjectionPointPane.References_.prototype.getMenuItem = function() {
  if (this.menuItem_ == null) {
    this.menuItem_ = new goog.ui.MenuItem(jsh.InjectionPointHelper.getMenuLabel(
        this.injectionPoint));
  }
  return this.menuItem_;
};
