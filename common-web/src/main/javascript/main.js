goog.require('atd.ui.ModalUiContainer');
goog.require('goog.Uri');
goog.require('goog.events.FileDropHandler');
goog.require('goog.ui.Component');
goog.require('jsh.EditorController');
goog.require('jsh.FileDropArea');
goog.require('jsh.HackEditor');
goog.require('jsh.model.Hack');
goog.require('jsh.model.HackResource');


var splitPaneHandleWidth = 5;


goog.events.listenOnce(window, goog.events.EventType.LOAD, function() {

  var fileDropArea = new jsh.FileDropArea();
  var editor = new jsh.HackEditor();
  var modalUiContainer = new atd.ui.ModalUiContainer(editor);

  modalUiContainer.render(document.body);

  var dataService = new jsh.DataService('/jshack-test-web',
      window['jshackToken']);

  var controller = new jsh.EditorController(editor, dataService);

  var uri = new goog.Uri(window.location);


  var hackId = /** @type {string} */(uri.getQueryData().get('hackid'));

  if (hackId) {
    controller.loadHackById(hackId);
  }


});
