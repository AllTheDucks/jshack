goog.provide('jsh.DataService');

goog.require('goog.Uri.QueryData');
goog.require('goog.async.Deferred');
goog.require('goog.json');
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

  /**
   * The application context root url.
   * @type {string}
   * @private
   */
  this.contextRoot_ = contextRoot;

  /**
   * The url of the remote service for hacks.
   * @type {string}
   * @private
   */
  this.hacksWSUrl_ = this.contextRoot_ + '/ws/hacks/';

  /**
   * The url of the remote service for temporary files.
   * @type {string}
   * @private
   */
  this.tempFilesWSUrl_ = this.contextRoot_ + '/ws/tempfiles/';

  /**
   * Used to manage all Xhr requests by this service.
   * @type {goog.net.XhrManager=}
   * @private
   */
  this.xhrManager_ = opt_xhrManager ?
      opt_xhrManager :
      new goog.net.XhrManager();

  /**
   * Stores DataService.Requests for retrieval when the Xhr completes.
   * @type {{jsh.DataService.Request}}
   * @private
   */
  this.requestMap_ = {};

  /**
   * Keeps track of the number of requests made for use as a unique identifier.
   * @type {number}
   * @private
   */
  this.requestCounter_ = 0;

  goog.events.listen(this.xhrManager_, goog.net.EventType.COMPLETE,
      this.handleXhrResponse_, false, this);
};
goog.inherits(jsh.DataService, goog.Disposable);


/**
 * Gets a hack from the remote service.
 * @param {string} id The id of the Hack
 * @return {goog.async.Deferred} The hack.
 */
jsh.DataService.prototype.getHack = function(id) {
  var dataServiceReq = new jsh.DataService.Request(
      new goog.async.Deferred(),
      this.unpackHackJSON);

  var requestId = this.putRequest_(dataServiceReq);

  this.xhrManager_.send(requestId, this.hacksWSUrl_ + id, 'GET');

  return dataServiceReq.deferred;
};


/**
 * Persist hack to server.
 * @param {jsh.model.Hack} hack the hack
 * @return {goog.async.Deferred} The hack.
 */
jsh.DataService.prototype.saveHack = function(hack) {
  var dataServiceReq = new jsh.DataService.Request(
      new goog.async.Deferred(),
      this.unpackHackJSON
      );

  var requestId = this.putRequest_(dataServiceReq);

  var json = this.packHackJSON(hack);

  if (hack.lastUpdatedDate == null) {
    this.xhrManager_.send(requestId, this.hacksWSUrl_, 'POST', json,
        {'Content-Type': 'application/json'});
  } else {
    this.xhrManager_.send(requestId, this.hacksWSUrl_ + hack.identifier, 'PUT',
        json, {'Content-Type': 'application/json'});
  }

  return dataServiceReq.deferred;
};


/**
 * Send the file to to the server and store it temporarily.
 * Returns the temporary file name.
 * @param {Blob!} blob
 * @return {goog.async.Deferred}
 */
jsh.DataService.prototype.sendFile = function(blob) {
  var dataServiceReq = new jsh.DataService.Request(
      new goog.async.Deferred(),
      function(tempFileName) {
        console.log('Temp File Name: ' + tempFileName);
      });

  var requestId = this.putRequest_(dataServiceReq);

  this.xhrManager_.send(requestId, this.tempFilesWSUrl_, 'POST', blob,
      {'Content-Type': 'application/octet-stream'});

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
 * Serializes a hack for posting to the server.
 * @param {jsh,model.Hack!} hack the hack
 * @return {string}
 */
jsh.DataService.prototype.packHackJSON = function(hack) {
  var jsonData = {};

  jsonData['name'] = hack.name;
  jsonData['identifier'] = hack.identifier;
  jsonData['description'] = hack.description;
  jsonData['version'] = hack.version;
  jsonData['targetVersionMin'] = hack.targetVersionMin;
  jsonData['targetVersionMax'] = hack.targetVersionMax;
  jsonData['developerName'] = hack.developerName;
  jsonData['developerInstitution'] = hack.developerInstitution;

  return goog.json.serialize(jsonData);
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
 * Handles the Xhr responses generated by the XhrManager.
 * @param {goog.net.XhrManager.Event} event The xhr response event.
 * @private
 */
jsh.DataService.prototype.handleXhrResponse_ = function(event) {
  var request = this.lookupRequest_(event.id);

  var xhr = event.xhrIo;
  if (xhr.isSuccess()) {
    var contentType = xhr.getResponseHeader('Content-Type');
    if (contentType == 'application/json') {
      request.deferred.callback(request.callback(xhr.getResponseJson()));
    } else if (contentType == 'text/plain') {
      request.deferred.callback(request.callback(xhr.getResponseText()));
    } else {
      console.log('Unknown Content-Type: ' + contentType);
    }
  } else {
    request.deferred.errback();
  }
};


/**
 * Puts a DataService.Request into a map for retrieval when the Xhr
 * completes.
 * @param {jsh.DataService.Request} dataServiceReq The Request to be stored.
 * @return {number} Returns the unique id of this request.
 * @private
 */
jsh.DataService.prototype.putRequest_ = function(dataServiceReq) {
  var requestId = this.requestCounter_++;
  this.requestMap_[requestId] = dataServiceReq;

  return requestId;
};


/**
 * Retrieves and the DataService.Request. The Request can only be retrieved
 * once.
 * @param {number} id The id of the Request to retrieve.
 * @return {jsh.DataService.Request}
 * @private
 */
jsh.DataService.prototype.lookupRequest_ = function(id) {
  var request = this.requestMap_[id];
  delete this.requestMap_[id];

  return request;
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
