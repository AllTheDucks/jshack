goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.SplitPane');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.tree.TreeControl');
goog.require('jsh.AceEditor');
goog.require('jsh.HackList');
goog.require('jsh.SplitPane');


var splitPaneHandleWidth = 5;


goog.events.listenOnce(window, goog.events.EventType.LOAD, function() {

  var mainEl = goog.dom.createDom('div', 'ide');
  goog.dom.appendChild(document.body, mainEl);

  var rootComponent = new goog.ui.Component();

  var toolbar = new goog.ui.Toolbar();

  var btnSave = goog.dom.createDom('div');
  btnSave.innerHTML = "<i class='fa fa-floppy-o icon'></i>" +
      "<span class='toolbar-text'>Save</span>";
  var btnSave = new goog.ui.ToolbarButton(btnSave);
  toolbar.addChild(btnSave, true);

  var btnClose = goog.dom.createDom('div');
  btnClose.innerHTML = "<i class='fa fa-power-off icon'></i>" +
      "<span class='toolbar-text'>Close</span>";
  var btnSave = new goog.ui.ToolbarButton(btnClose);
  toolbar.addChild(btnSave, true);


  var lhs = new goog.ui.Component();
  var editor = new jsh.AceEditor();
  var props = new goog.ui.Component();


  var innersplitpane = new jsh.SplitPane(editor, props,
      goog.ui.SplitPane.Orientation.VERTICAL);
  innersplitpane.setInitialSize(300);
  innersplitpane.setHandleSize(splitPaneHandleWidth);
  innersplitpane.setSecondComponentStatic(true);

  var outersplitpane = new jsh.SplitPane(lhs, innersplitpane,
      goog.ui.SplitPane.Orientation.HORIZONTAL);
  outersplitpane.setInitialSize(300);
  outersplitpane.setHandleSize(splitPaneHandleWidth);

  rootComponent.addChild(toolbar, true);
  rootComponent.addChild(outersplitpane, true);

  rootComponent.render(mainEl);

  innersplitpane.getElement().id = 'innersplitpane';
  outersplitpane.getElement().id = 'outersplitpane';

  lhs.addChild(new jsh.HackList(), true);


  var viewSizeMonitor = new goog.dom.ViewportSizeMonitor();
  var resizeInner = function() {
    var rhsheight = viewSizeMonitor.getSize().height -
        goog.style.getPosition(outersplitpane.getElement()).y;
    var rhswidth = viewSizeMonitor.getSize().width -
        outersplitpane.getFirstComponentSize() - splitPaneHandleWidth;
    innersplitpane.setSize(new goog.math.Size(rhswidth, rhsheight));
    editor.resize();
  };
  var resizeOuter = function() {
    var lhsheight = viewSizeMonitor.getSize().height -
        goog.style.getPosition(outersplitpane.getElement()).y;
    var lhswidth = viewSizeMonitor.getSize().width;
    outersplitpane.setSize(new goog.math.Size(lhswidth, lhsheight));
    resizeInner();
  };
  resizeOuter();
  goog.events.listen(viewSizeMonitor,
      goog.events.EventType.RESIZE, resizeOuter);
  goog.events.listen(outersplitpane,
      goog.ui.Component.EventType.CHANGE, resizeInner);
  goog.events.listen(innersplitpane,
      goog.ui.Component.EventType.CHANGE, goog.events.Event.stopPropagation);
});
