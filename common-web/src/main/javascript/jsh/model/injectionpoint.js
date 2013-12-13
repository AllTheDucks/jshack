/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 26/11/13
 * Time: 10:46 PM
 * To change this template use File | Settings | File Templates.
 */


goog.provides('jsh.model.injectionPoint');


/**
 * constants for the RenderingHook injection points
 * @enum {string}
 */
jsh.model.injectionPoint = {
  TopFrame: 'jsp.topFrame.start',
  EditModeToggle: 'tag.editModeViewToggle.start',
  LearningSystemPage: 'tag.learningSystemPage.start',
  Frameset: 'jsp.frameset.start'
};

