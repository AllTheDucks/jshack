goog.provide('jsh.EditorController');

goog.require('goog.events');
goog.require('jsh.DataService');
goog.require('jsh.HackEditor');
goog.require('jsh.model.Hack');



/**
 * Creates an {@link jsh.EditorController}
 * @param {jsh.HackEditor} hackEditor the hack editor.
 * @param {jsh.DataService} dataService the data service.
 * @constructor
 */
jsh.EditorController = function(hackEditor, dataService) {

  this.hackEditor_ = hackEditor;

  this.dataService_ = dataService;

  goog.events.listen(this.hackEditor_, jsh.HackEditor.EventTypes.SAVE,
      this.handleSave, false, this);
};


/**
 *
 * @param {goog.events.Event!} e the event
 */
jsh.EditorController.prototype.handleSave = function(e) {
  this.dataService_.saveHack(e.target.getHackModel());
};
