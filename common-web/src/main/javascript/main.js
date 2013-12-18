goog.require('jsh.HackEditor');


var splitPaneHandleWidth = 5;


goog.events.listenOnce(window, goog.events.EventType.LOAD, function() {

  var mainEl = goog.dom.createDom('div', 'ide');
  goog.dom.appendChild(document.body, mainEl);


  var editor = new jsh.HackEditor();
  editor.decorate(mainEl);

});
