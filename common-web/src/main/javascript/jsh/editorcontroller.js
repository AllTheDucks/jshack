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
  var hack = new jsh.model.Hack();

  var ed = e.target;
  hack.name = ed.getHackName();
  hack.identifier = ed.getHackIdentifier();
  //  hack.description = ed.hackDetails.hackNameInput.value;
  //  hack.version = ed.hackDetails.hackNameInput.value;
  //  hack.targetVersionMin = ed.hackDetails.hackNameInput.value;
  //  hack.targetVersionMax = ed.hackDetails.hackNameInput.value;
  //  hack.developerName = ed.hackDetails.hackNameInput.value;
  //  hack.developerInstitution = ed.hackDetails.hackNameInput.value;

  this.dataService_.saveHack(hack);
};
