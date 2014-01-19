goog.provide('jsh.events.EventType');


/**
 * Constants for event names.
 * @enum {string}
 */
jsh.events.EventType = {
  /** dispatched when a component enters an invalid state. */
  HACK_INVALID: 'hackinvalid',
  HACK_VALID: 'hackvalid',
  FILES_SELECTED: 'fileselected'
};
