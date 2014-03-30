define("ace/mode/advancedrestriction", ["require", "exports", "module", "ace/lib/oop", "ace/mode/javascript", "ace/tokenizer"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");

  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
  var AdvancedRestrictionHighlightRules = function() {

    var keywords = (
        "or|and|eq|ne|lt|gt|le|ge|div|mod|not|null|new|var|return"
        );

    var buildinConstants = ("null|Infinity|NaN|undefined");

    var langClasses = (
        "context"
        );

    var keywordMapper = this.createKeywordMapper({
      "keyword": keywords,
      "constant.language": buildinConstants,
      "support.function": langClasses
    }, "identifier");

    this.$rules = {
      "start" : [
        {
          token : "comment",
          regex : "\\/\\/.*$"
        },
        {
          token : "comment", // multi line comment
          regex : "\\/\\*",
          next : "comment"
        }, {
          token : "string.regexp",
          regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
        }, {
          token : "string", // single line
          regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        }, {
          token : "string", // single line
          regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        }, {
          token : "constant.numeric", // hex
          regex : "0[xX][0-9a-fA-F]+\\b"
        }, {
          token : "constant.numeric", // float
          regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
          token : "constant.language.boolean",
          regex : "(?:true|false)\\b"
        }, {
          token : keywordMapper,
          // TODO: Unicode escape sequences
          // TODO: Unicode identifiers
          regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
          token : "keyword.operator",
          regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
        }, {
          token : "lparen",
          regex : "[[({]"
        }, {
          token : "rparen",
          regex : "[\\])}]"
        }, {
          token : "text",
          regex : "\\s+"
        }
      ],
      "comment" : [
        {
          token : "comment", // closing comment
          regex : ".*?\\*\\/",
          next : "start"
        }, {
          token : "comment", // comment spanning whole line
          regex : ".+"
        }
      ]
    };
  };
  oop.inherits(AdvancedRestrictionHighlightRules, TextHighlightRules);

  var CStyleFoldMode = require("./folding/cstyle").FoldMode

  var FoldMode = exports.FoldMode = function() {};
  oop.inherits(FoldMode, CStyleFoldMode);

  (function() {
    this.foldingStartMarker = /(\{|\[|\()[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*(\}|\]\))|^[\s\*]*(\*\/)/;
  }).call(FoldMode.prototype);


  var JavaScriptMode = require("./javascript").Mode;
  var Tokenizer = require("../tokenizer").Tokenizer;

  var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = AdvancedRestrictionHighlightRules;
    this.foldingRules = new FoldMode();
  };
  oop.inherits(Mode, JavaScriptMode);

  (function() {

    this.createWorker = function(session) {
      return null;
    };

    this.$id = "ace/mode/advancedrestriction";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
