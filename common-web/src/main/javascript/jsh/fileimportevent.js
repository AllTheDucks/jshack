goog.provide('jsh.events.FileImportEvent');



/**
 * An event that is fired when files are imported.
 *
 * @param {Array.<File>} files
 * @extends {goog.events.Event}
 * @constructor
 */
jsh.events.FileImportEvent = function(files) {
  goog.base(this, jsh.events.EventType.FILES_IMPORTED);

  this.files = files;

};
goog.inherits(jsh.events.FileImportEvent, goog.events.Event);
