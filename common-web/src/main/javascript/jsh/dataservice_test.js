goog.require('goog.json');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.net.XhrIo');
goog.require('jsh.DataService');
goog.require('jsh.model.Hack');


var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();

function setUp() {
  goog.net.XhrIo = goog.testing.net.XhrIo;
}

function testGetHack_withValidIdentifier_returnsAHack() {
  var dataService = new jsh.DataService('');
  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addCallback(function(hack) {
    assertEquals('blah', hack.identifier);
    asyncTestCase.continueTesting();
  });

  dataService.xhr_.simulateResponse(200, '{ "identifier": "blah" }');
}

function testGetHack_with404_callsErrback() {
  var dataService = new jsh.DataService('');
  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addErrback(function() {
    asyncTestCase.continueTesting();
  });

  dataService.xhr_.simulateResponse(404, '');
}

function testGetHack_with500_callsErrback() {
  var dataService = new jsh.DataService('');
  var result = dataService.getHack('blah');

  asyncTestCase.waitForAsync('Waiting for callback to complete...');

  result.addErrback(function() {
    asyncTestCase.continueTesting();
  });

  dataService.xhr_.simulateResponse(500, '');
}
