goog.provide('jsh.DataService');

goog.require('goog.Uri.QueryData');
goog.require('goog.async.Deferred');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrManager');
goog.require('jsh.model.Hack');



/**
 * Creates a DataService.
 * @param {string} contextRoot The application context root url.
 * @param {goog.net.XhrManager=} opt_xhrManager The XhrManager used to process
 *     Xhr requests.
 * @constructor
 * @extends {goog.Disposable}
 */
jsh.DataService = function(contextRoot, opt_xhrManager) {
  goog.base(this);

  this.contextRoot_ = contextRoot;

  this.wsUrl_ = this.contextRoot_ + '/ws/hacks/';

  this.xhrManager_ = opt_xhrManager ?
      opt_xhrManager :
      new goog.net.XhrManager();

  this.requestMap_ = {};

  this.requestCounter_ = 0;

  goog.events.listen(this.xhrManager_, goog.net.EventType.COMPLETE,
      this.handleXhrResponse, false, this);
};
goog.inherits(jsh.DataService, goog.Disposable);


/**
 * Gets a hack from the remote service.
 * @param {string} id The id of the Hack
 * @return {jsh.async.Deferred} The hack.
 */
jsh.DataService.prototype.getHack = function(id) {
  var requestId = this.requestCounter_++;
  var deferred = new goog.async.Deferred();
  var callback = this.unpackHackJSON;
  var dataServiceReq = new jsh.DataService.Request(deferred, callback);

  this.requestMap_[requestId] = dataServiceReq;

  this.xhrManager_.send(requestId, this.wsUrl_ + id, 'GET');

  return dataServiceReq.deferred;
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
  this.xhrManager_.dispose();
  goog.base(this, 'disposeInternal');
};


/**
 * @param {goog.net.XhrManager.Event} event The xhr response event.
 */
jsh.DataService.prototype.handleXhrResponse = function(event) {
  var request = this.requestMap_[event.id];
  delete this.requestMap_[event.id];

  var xhr = event.xhrIo;
  if (xhr.isSuccess()) {
    request.deferred.callback(request.callback(xhr.getResponseJson()));
  } else {
    request.deferred.errback();
  }
};



/**
 * A pending request to the remote server.
 * @param {goog.async.Deferred} deferred the deferred for the client code
 * @param {function} callback function to convert the returned data
 * @constructor
 */
jsh.DataService.Request = function(deferred, callback) {
  this.deferred = deferred;
  this.callback = callback;
};
