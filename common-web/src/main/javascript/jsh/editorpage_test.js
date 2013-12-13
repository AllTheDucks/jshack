goog.require('goog.testing.jsunit');
goog.require('jsh.EditorPage');

var testStartsWith = function() {
  var page = new jsh.EditorPage();
  assertTrue('blah', goog.string.startsWith('abcd', ''));
};
