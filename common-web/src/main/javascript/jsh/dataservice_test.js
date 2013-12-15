goog.require('goog.json');
goog.require('goog.net.XhrManager');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.net.XhrIoPool');
goog.require('jsh.DataService');
goog.require('jsh.model.Hack');


var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();
var xhrManager;
var xhrIo;

function setUp() {
  xhrManager = new goog.net.XhrManager(/*Retries: */0);
  xhrManager.xhrPool_ = new goog.testing.net.XhrIoPool();
  xhrIo = xhrManager.xhrPool_.getXhr();
}

function testGetHack_withValidIdentifier_returnsAHack() {
  var dataService = new jsh.DataService('', xhrManager);

  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addCallback(function(hack) {
    assertEquals('blah', hack.identifier);
    asyncTestCase.continueTesting();
  });

  xhrIo.simulateResponse(200, '{ "identifier": "blah" }');
}

function testGetHack_with404_callsErrback() {
  var dataService = new jsh.DataService('', xhrManager);

  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addErrback(function() {
    asyncTestCase.continueTesting();
  });

  xhrIo.simulateResponse(404, '');
}

function testGetHack_with500_callsErrback() {
  var dataService = new jsh.DataService('', xhrManager);

  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addErrback(function() {
    asyncTestCase.continueTesting();
  });

  xhrIo.simulateResponse(500, '');
}
