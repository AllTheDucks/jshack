goog.provide('jsh.events.EventType');


/**
 * Constants for event names.
 * @enum {string}
 */
jsh.events.EventType = {
  /** dispatched when a component enters an invalid state. */
  HACK_INVALID: 'hackinvalid',
  HACK_VALID: 'hackvalid',
  FILES_IMPORTED: 'filesimported',
  SAVE: 'save',
  RESOURCE_RENAMED: 'resourcerenamed',
  RESOURCE_NAME_EDITABLE: 'resourcenameeditable',
  RESOURCE_NAME_UNEDITABLE: 'resourcenameuneditable',
  RESOURCE_DELETED: 'resourcedeleted',
  INJECTION_POINT_ADDED: 'injectionpointadded',
  INJECTION_POINT_REMOVED: 'injectionpointremoved',
  REMOVE: 'remove'
};


/**
 * Constants for Data Request Event types.
 * @enum {string}
 */
jsh.events.DataRequestType = {
  SYSTEM_ROLES: 'systemroles',
  INSTITUTION_ROLES: 'institutionroles',
  COURSE_ROLES: 'courseroles'
};



/**
 * An event for sending a request for data from an external source.
 *
 * @param {jsh.events.DataRequestType} type the event type.
 * @param {function(?)} callback the success callback.
 * @param {function()=} opt_errback the error callback.
 * @extends {goog.events.Event}
 * @constructor
 */
jsh.events.DataRequestEvent = function(type, callback, opt_errback) {
  goog.base(this, type);

  /** @type {function(*)} */
  this.callback = callback;

  /** @type {function(*)} */
  this.errback = (opt_errback ? opt_errback : (function() {}));
};
goog.inherits(jsh.events.DataRequestEvent, goog.events.Event);

