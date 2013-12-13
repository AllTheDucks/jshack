goog.provide('jsh.EditorPage');

goog.require('goog.ui.Component');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('jsh.HackDetailsArea');
goog.require('jsh.ResourceEditor');
goog.require('jsh.events.EventType');



/**
 * The main controller type class that represents the editor page,
 * and mediates between the gui components, the client-side model,
 * and initiates server-side actions.
 * @constructor
 */
jsh.EditorPage = function() {
  this.hackDetailsArea = new jsh.HackDetailsArea();
  this.resourceTabBar = new goog.ui.TabBar();
  this.resourceTabBar.addChild(new goog.ui.Tab('hello'), true);
  this.resourceEditors = new goog.ui.Component();
  this.resourceTabBar.setSelectedTabIndex(0);
};


/**
 * Renders all the required components into the HTML page.
 */
jsh.EditorPage.prototype.render = function() {

  this.hackDetailsArea.decorate(goog.dom.getElement('stepcontent1'));
  goog.events.listen(this.hackDetailsArea,
      [jsh.events.EventType.HACK_INVALID, jsh.events.EventType.HACK_VALID],
      this.onInvalidHack, false, this);

  var hackResourcesEl = goog.dom.getElement('hack-resources');
  this.resourceTabBar.render(hackResourcesEl);

  //todo should wrap this in the closure stylesheet stuff...
  var resourceEdCont = goog.dom.createDom('div', 'goog-tab-content');

  goog.dom.appendChild(hackResourcesEl, resourceEdCont);

  this.resourceEditors.decorate(resourceEdCont);
  var editor = new jsh.ResourceEditor({mime: 'text/javascript'});
  this.resourceEditors.addChild(editor, true);

};
