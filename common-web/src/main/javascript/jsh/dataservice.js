goog.provide('jsh.DataService');

goog.require('goog.Uri.QueryData');
goog.require('goog.async.Deferred');
goog.require('jsh.model.Hack');



/**
 * Creates a DataService.
 * @param {string} contextRoot The application context root url.
 * @constructor
 * @extends {goog.Disposable}
 */
jsh.DataService = function(contextRoot) {
  goog.base(this);

  this.contextRoot = contextRoot;

  this.xhr_ = new goog.net.XhrIo();
};
goog.inherits(jsh.DataService, goog.Disposable);


/**
 * Gets a hack from the remote service.
 * @param {string} id The id of the Hack
 * @return {jsh.async.Deferred} The hack.
 */
jsh.DataService.prototype.getHack = function(id) {

  var deferred = new goog.async.Deferred();

  goog.events.listenOnce(this.xhr_, goog.net.EventType.COMPLETE,
      function(e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        if (xhr.isSuccess()) {
          deferred.callback(this.unpackHackJSON(xhr.getResponseJson()));
        } else {
          deferred.errback();
        }
      }, false, this);
  var data = goog.Uri.QueryData.createFromMap(new goog.structs.Map({
    hackId: id
  }));
  this.xhr_.send('ManageShells.action', 'POST', data.toString());

  return deferred;
};


/**
 * Converts a JSON representation of a hack to a hack model.
 * @param {Object} jsonData JSON object representing a hack.
 * @return {jsh.Hack} Hack object constructed from the jsonData.
 */
jsh.DataService.prototype.unpackHackJSON = function(jsonData) {
  var hack = new jsh.model.Hack();

  hack.name = jsonData['name'];
  hack.identifier = jsonData['identifier'];
  hack.description = jsonData['description'];
  hack.version = jsonData['version'];
  hack.targetVersionMin = jsonData['targetVersionMin'];
  hack.targetVersionMax = jsonData['targetVersionMax'];
  hack.developerName = jsonData['developerName'];
  hack.developerInstitution = jsonData['developerInstitution'];

  return hack;
};


/**
 * Disposes of the DataService.
 * @override
 */
jsh.DataService.prototype.disposeInternal = function() {
  this.xhr_.dispose();
  goog.base(this, 'disposeInternal');
};
