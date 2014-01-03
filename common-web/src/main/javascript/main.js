goog.require('jsh.HackEditor');
goog.require('jsh.model.Hack');
goog.require('jsh.model.HackResource');


var splitPaneHandleWidth = 5;


goog.events.listenOnce(window, goog.events.EventType.LOAD, function() {

  var mainEl = goog.dom.createDom('div', 'ide');
  goog.dom.appendChild(document.body, mainEl);

  var hack = new jsh.model.Hack();
  hack.name = 'Gradebook Column Protector';
  hack.identifier = 'gbcolprotect';
  hack.resources = new Array();

  var cssRes = new jsh.model.HackResource();
  cssRes.mime = 'text/css';
  cssRes.path = 'gbcolprotect.css';
  hack.resources.push(cssRes);

  var jsRes = new jsh.model.HackResource();
  jsRes.mime = 'application/javascript';
  jsRes.path = 'gbcolprotect.js';
  hack.resources.push(jsRes);

  var pngRes = new jsh.model.HackResource();
  pngRes.mime = 'image/png';
  pngRes.path = 'lock.png';
  hack.resources.push(pngRes);

  var editor = new jsh.HackEditor(hack);
  editor.decorate(mainEl);

});
