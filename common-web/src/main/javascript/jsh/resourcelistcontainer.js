goog.provide('jsh.ResourceListContainer');

goog.require('goog.array');
goog.require('goog.ui.Container');



/**
 * The Container for all the resource list items on the left hand side of the
 * editor.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Container}
 * @constructor
 */
jsh.ResourceListContainer = function(opt_domHelper) {
  goog.base(this, null, null, opt_domHelper);

  /**
   * @type {number}
   * @private
   */
  this.selectedItemIndex_ = -1;

  /**
   * Keeps track of the item currently being renamed, if any.
   * @type {jsh.ResourceListItem}
   * @private
   */
  this.renamingItem_ = null;
};
goog.inherits(jsh.ResourceListContainer, goog.ui.Container);


/**
 * @override
 */
jsh.ResourceListContainer.prototype.createDom = function() {
  var el = this.dom_.createDom('div', goog.getCssName('jsh-resourcelistarea'));
  this.decorateInternal(el);

};


/**
 * @override
 */
jsh.ResourceListContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this, goog.ui.Component.EventType.SELECT,
      this.handleItemSelect);

  this.getHandler().listen(this, jsh.events.EventType.RESOURCE_NAME_EDITABLE,
      function(e) {
        this.renamingItem_ = e.target;
      }, false, this);

  this.getHandler().listen(this, jsh.events.EventType.RESOURCE_NAME_UNEDITABLE,
      function() {
        this.renamingItem_ = null;
      }, false, this);

  this.getHandler().listen(this, jsh.events.EventType.RESOURCE_RENAMED,
      function() {
        this.sortChildren();
      }, false, this);

  this.getHandler().listen(this.getKeyHandler(),
      goog.events.KeyHandler.EventType.KEY, function(e) {
        if (e.keyCode == goog.events.KeyCodes.ENTER && this.renamingItem_) {
          e.stopPropagation();
          this.renamingItem_.setNameUneditable();
        }
      }, true, this);
};


/**
 * Decorates an existing HTML DIV element..
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 * @override
 */
jsh.ResourceListContainer.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 *
 * @param {goog.events.Event!} e The event.
 */
jsh.ResourceListContainer.prototype.handleItemSelect = function(e) {
  var item = /** @type {jsh.ResourceListBaseItem} */(e.target);
  if (item) {
    this.setSelectedChild(item, false);
  }
};


/**
 * Set the currently selected child.
 * @param {jsh.ResourceListBaseItem!} child The child to set as selected
 * @param {boolean=} opt_reselect Set the item as selected.
 */
jsh.ResourceListContainer.prototype.setSelectedChild =
    function(child, opt_reselect) {
  var index = /** @type {number} */(this.indexOfChild(child));
  this.setSelectedChildByIndex(index, opt_reselect);
};


/**
 * Set the currently selected child.
 * @return {jsh.ResourceListBaseItem}
 */
jsh.ResourceListContainer.prototype.getSelectedChild = function() {
  var index = /** @type {jsh.ResourceListBaseItem}*/
      (this.getChildAt(this.selectedItemIndex_));
  return index;
};


/**
 * Sets the currently selected child, by index.
 * @param {number} index The index of the item to select
 * @param {boolean=} opt_reselect Set the item as selected.
 */
jsh.ResourceListContainer.prototype.setSelectedChildByIndex =
    function(index, opt_reselect) {
  var child = this.getChildAt(index);
  if (child) {
    var selectedItem = this.getSelectedChild();
    if (selectedItem) {
      selectedItem.setSelected(false);
    }
    this.selectedItemIndex_ = index;

    if (opt_reselect !== false) {
      child.setSelected(true);
    }
  }
};


/**
 * Gets the index of the currently selected child.
 * @return {number}
 */
jsh.ResourceListContainer.prototype.getSelectedIndex = function() {
  return this.selectedItemIndex_;
};


/**
 * Selects the next child in the list.
 */
jsh.ResourceListContainer.prototype.selectNextChild = function() {
  this.setSelectedChildByIndex(this.getSelectedIndex() + 1);
};


/**
 * Selects the previous child in the list.
 */
jsh.ResourceListContainer.prototype.selectPrevChild = function() {
  this.setSelectedChildByIndex(this.getSelectedIndex() - 1);
};


/**
 * Sorts the resource list.
 */
jsh.ResourceListContainer.prototype.sortChildren = function() {
  var selectedChild = this.getSelectedChild();

  var children = /** @type {Array.<jsh.ResourceListBaseItem>} */
      (this.removeChildren(true));
  goog.array.sort(children, jsh.ResourceListContainer.sortChildrenCompare_);
  for (var i = 0; i < children.length; i++) {
    this.addChild(children[i], true);
  }

  if (selectedChild) {
    this.setSelectedChild(selectedChild);
  }
};


/**
 *
 * @param {jsh.ResourceListBaseItem} left
 * @param {jsh.ResourceListBaseItem} right
 * @return {?}
 * @private
 */
jsh.ResourceListContainer.sortChildrenCompare_ = function(left, right) {
  var leftSort = left.getSortKey();
  var rightSort = right.getSortKey();

  if (leftSort == null) {
    return -1;
  } else if (rightSort == null) {
    return 1;
  } else {
    return goog.string.numerateCompare(leftSort, rightSort);
  }
};
