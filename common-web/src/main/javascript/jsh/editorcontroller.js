goog.provide('jsh.EditorController');

goog.require('goog.events');
goog.require('goog.fs.FileReader');
goog.require('jsh.DataService');
goog.require('jsh.HackEditor');
goog.require('jsh.MimeTypeHelper');
goog.require('jsh.MimeTypeHelper.DataType');
goog.require('jsh.events.EventType');
goog.require('jsh.model.Hack');



/**
 * Creates an {@link jsh.EditorController}
 *
 * @param {jsh.HackEditor} hackEditor the hack editor.
 * @param {jsh.DataService} dataService the data service.
 * @constructor
 */
jsh.EditorController = function(hackEditor, dataService) {

  this.hackEditor_ = hackEditor;

  this.dataService_ = dataService;

  goog.events.listen(this.hackEditor_, jsh.events.EventType.SAVE,
      this.handleSave, false, this);

  goog.events.listen(this.hackEditor_, jsh.events.EventType.FILES_IMPORTED,
      this.handleFilesImported, false, this);
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


/**
 * Handle when files are selected for importing.
 * @param {goog.events.Event} e the event
 */
jsh.EditorController.prototype.handleFilesImported = function(e) {
  var files = /** @type {Array.<File>} */ (e.target.files);
  for (var i = 0, currFile; currFile = files[i]; i++) {
    if (jsh.MimeTypeHelper.getDataType(currFile.type) ==
        jsh.MimeTypeHelper.DataType.TEXT) {
      var textCallback = goog.bind(function(file, text) {
        var resource = new jsh.model.HackResource();
        resource.path = file.name;
        resource.mime = file.type;
        resource.content = text;
        this.hackEditor_.addResourceListItem(resource);
      }, this, currFile);
      goog.fs.FileReader.readAsText(currFile, 'UTF-8').
          addCallback(textCallback);

    } else {
      var binCallback = goog.bind(function(file, tempFileName) {
        var resource = new jsh.model.HackResource();
        resource.path = file.name;
        resource.mime = file.type;
        resource.tempFileName = tempFileName;

        this.hackEditor_.addResourceListItem(resource);
      }, this, currFile);
      this.dataService_.sendFile(currFile).addCallback(binCallback);
    }
  }
};
