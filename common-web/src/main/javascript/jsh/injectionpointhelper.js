goog.provide('jsh.InjectionPointHelper');

goog.require('jsh.model.injectionPoint');


/**
 * @type {Object}
 */
jsh.InjectionPointHelper.injectionPointLookup = {};
jsh.InjectionPointHelper.injectionPointLookup[
    jsh.model.injectionPoint.EditModeToggle] = {
  MenuLabel: 'Edit Mode Toggle (tag.editModeViewToggle.start)',
  ItemDom: goog.soy.renderAsElement(
      jsh.soy.editor.injectionPointPaneItemEditModeToggle)
};
jsh.InjectionPointHelper.injectionPointLookup[
    jsh.model.injectionPoint.Frameset] = {
  MenuLabel: 'Frameset (jsp.frameset.start)',
  ItemDom: goog.soy.renderAsElement(
      jsh.soy.editor.injectionPointPaneItemFrameset)
};
jsh.InjectionPointHelper.injectionPointLookup[
    jsh.model.injectionPoint.LearningSystemPage] = {
  MenuLabel: 'Learning System Page (tag.learningSystemPage.start)',
  ItemDom: goog.soy.renderAsElement(
      jsh.soy.editor.injectionPointPaneItemLearningSystemPage)
};
jsh.InjectionPointHelper.injectionPointLookup[
    jsh.model.injectionPoint.TopFrame] = {
  MenuLabel: 'Top Frame (jsp.topFrame.start)',
  ItemDom: goog.soy.renderAsElement(
      jsh.soy.editor.injectionPointPaneItemTopFrame)
};


/**
 * @param {jsh.model.injectionPoint} injectionPoint
 * @return {string}
 */
jsh.InjectionPointHelper.getMenuLabel = function(injectionPoint) {
  return jsh.InjectionPointHelper.injectionPointLookup[injectionPoint].
      MenuLabel;
};


/**
 * @param {jsh.model.injectionPoint} injectionPoint
 * @return {Element}
 */
jsh.InjectionPointHelper.getItemDom = function(injectionPoint) {
  return jsh.InjectionPointHelper.injectionPointLookup[injectionPoint].
      ItemDom;
};
