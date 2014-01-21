goog.provide('jsh.MimeTypeHelper');


/**
 *
 * @type {Object}
 */
jsh.MimeTypeHelper.fallback = {
  'iconClass': goog.getCssName('jsh-resourcelistitem-default')
};


/**
 *
 * @type {Object}
 */
jsh.MimeTypeHelper.mimeLookup = {
  'application/javascript': {
    'iconClass': goog.getCssName('jsh-resourcelistitem-js'),
    'aceMode': 'ace/mode/javascript'
  },
  'text/html': {
    'iconClass': goog.getCssName('jsh-resourcelistitem-html'),
    'aceMode': 'ace/mode/html'
  },
  'text/css': {
    'iconClass': goog.getCssName('jsh-resourcelistitem-css'),
    'aceMode': 'ace/mode/css'
  },
  'text': {
    'iconClass': goog.getCssName('jsh-resourcelistitem-text')
  },
  'image': {
    'iconClass': goog.getCssName('jsh-resourcelistitem-text')
  }
};


/**
 * Gets the CSS class to use when displaying a ResourceListItem for this mime
 * type.
 * @param {string} mimeType the mime type.
 * @return {string}
 */
jsh.MimeTypeHelper.getIconClass = function(mimeType) {
  return jsh.MimeTypeHelper.lookupAttribute_('iconClass', mimeType);
};


/**
 * Gets the Ace Editor mode to use for this mime type.
 * @param {string} mimeType the mime type.
 * @return {string}
 */
jsh.MimeTypeHelper.getAceMode = function(mimeType) {
  return jsh.MimeTypeHelper.lookupAttribute_('aceMode', mimeType);
};


/**
 * Lookup an attribute for a given mime type.
 * @param {string} attribute the attribute to lookup.
 * @param {string} mimeType the mime type.
 * @return {*}
 * @private
 */
jsh.MimeTypeHelper.lookupAttribute_ = function(attribute, mimeType) {
  var lookup = jsh.MimeTypeHelper.mimeLookup[mimeType];
  if (lookup) {
    var value = lookup[attribute];
    if (value) {
      return value;
    }
  }

  var genericType = mimeType.split('/')[0];
  var lookup = jsh.MimeTypeHelper.mimeLookup[genericType];
  if (lookup) {
    var value = lookup[attribute];
    if (value) {
      return value;
    }
  }

  return jsh.MimeTypeHelper.fallback[attribute];
};
