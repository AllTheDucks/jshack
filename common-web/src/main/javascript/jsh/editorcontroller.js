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
  var request = this.dataService_.saveHack(e.target.getHackModel());
  request.addCallback(this.hackEditor_.updateEditorState, this.hackEditor_);
  //todo: addErrback
};


/**
 * Load a hack from the dataservice into the editor.
 * @param {string} hackId The id of the hack to load.
 */
jsh.EditorController.prototype.loadHackById = function(hackId) {
  var request = this.dataService_.getHack(hackId);
  request.addCallback(this.hackEditor_.updateEditorState, this.hackEditor_);
  //todo: addErrback
};
