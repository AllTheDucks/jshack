goog.provide('jsh.AceEditor');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');



/**
 * A Closure wrapper for the Ace Editor.
 *
 * @param {jsh.model.HackResource=} opt_resource the resource to be edited.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */
jsh.AceEditor = function(opt_resource, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.editable = true;
};
goog.inherits(jsh.AceEditor, goog.ui.Component);


/**
 * Creates the div in which the Ace editor is placed
 *
 * @override
 */
jsh.AceEditor.prototype.createDom = function() {
  var el = goog.dom.createDom('div', goog.getCssName('ace-editor-container'));
  this.decorateInternal(el);
};


/**
 * Decorates an existing HTML DIV element as an Ace editor.
 *
 * @param {Element} element The DIV element to decorate.
 * @override
 */
jsh.AceEditor.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  this.editorElement = goog.dom.createDom('div', goog.getCssName('ace-editor'));

  goog.dom.appendChild(element, this.editorElement);
};


/**
 * Executed when the Ace component is inserted into the page.
 *
 * @override
 */
jsh.AceEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  if (this.editable) {
    this.aceEditor = ace.edit(this.editorElement);
    this.aceEditor.setTheme('ace/theme/clouds_midnight');

    jsh.AceEditor.enableAutoComplete();
    this.aceEditor.setOptions({
      'enableBasicAutocompletion': true,
      'enableSnippets': true
    });
  }
};


/**
 * Resize the internal Ace editor to fit the component.
 */
jsh.AceEditor.prototype.resize = function() {
  this.aceEditor.resize();
};


/**
 * return the actual ace editor
 * @return {Object}
 */
jsh.AceEditor.prototype.getAce = function() {
  return this.aceEditor;
};


/**
 * @type {?ace.RequiredObject}
 * @private
 */
jsh.AceEditor.langTools_ = null;


/**
 * Enables the auto complete features of the Ace editor.
 */
jsh.AceEditor.enableAutoComplete = function() {
  if (jsh.AceEditor.langTools_ == null) {
    jsh.AceEditor.langTools_ = ace.require('ace/ext/language_tools');
  }
};


/**
 * @param {{getCompletions: function(ace.AceEditor, ace.AceSession, number,
 * string, function(Object, Array.<{name: string, value:string, score: number,
 * meta: string}>))}!} completer
 */
jsh.AceEditor.addCompleter = function(completer) {
  jsh.AceEditor.enableAutoComplete();
  jsh.AceEditor.langTools_.addCompleter(completer);
};

