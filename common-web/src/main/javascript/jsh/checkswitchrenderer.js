

/**
 * @fileoverview Alternative renderer for {@link goog.ui.Checkbox}s.
 *
 */

goog.provide('jsh.CheckSwitchRenderer');

goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Role');
goog.require('goog.a11y.aria.State');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.ui.CheckboxRenderer');



/**
 * Alternative renderer for {@link goog.ui.Checkbox}s.  Renders a checkbox as
 * an iOS style sliding switch.
 * @constructor
 * @extends {goog.ui.CheckboxRenderer}
 */
jsh.CheckSwitchRenderer = function() {
  goog.base(this);
};
goog.inherits(jsh.CheckSwitchRenderer, goog.ui.CheckboxRenderer);
goog.addSingletonGetter(jsh.CheckSwitchRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
jsh.CheckSwitchRenderer.CSS_CLASS = goog.getCssName('jsh-checkswitch');


/** @override */
jsh.CheckSwitchRenderer.prototype.createDom = function(checkbox) {
  var dom_ = checkbox.getDomHelper();
  var element = dom_.createDom(
      'span', this.getClassNames(checkbox).join(' '),
      dom_.createDom('div', goog.getCssName('jsh-checkswitch-inner')),
      dom_.createDom('div', goog.getCssName('jsh-checkswitch-checkedlabel'),
      'is'),
      dom_.createDom('div', goog.getCssName('jsh-checkswitch-handle'),
          dom_.createDom('div',
              goog.getCssName('jsh-checkswitch-uncheckedlabel'), 'is not')));

  var state = checkbox.getChecked();
  this.setCheckboxState(element, state);

  return element;
};


/** @override */
jsh.CheckSwitchRenderer.prototype.getCssClass = function() {
  return jsh.CheckSwitchRenderer.CSS_CLASS;
};
