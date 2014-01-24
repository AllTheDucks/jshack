goog.require('goog.Uri');
goog.require('jsh.EditorController');
goog.require('jsh.HackEditor');
goog.require('jsh.model.Hack');
goog.require('jsh.model.HackResource');


var splitPaneHandleWidth = 5;


goog.events.listenOnce(window, goog.events.EventType.LOAD, function() {

  var mainEl = goog.dom.createDom('div', 'ide');
  goog.dom.appendChild(document.body, mainEl);

  var editor = new jsh.HackEditor();
  editor.decorate(mainEl);

  var dataService = new jsh.DataService('/jshack-test-web');

  var controller = new jsh.EditorController(editor, dataService);

  var uri = new goog.Uri(window.location);


  var hackId = /** @type {string} */(uri.getQueryData().get('hackid'));

  if (hackId) {
    controller.loadHackById(hackId);
  }

});
