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
  INJECTION_POINT_ADDED: 'injectionpointadded',
  INJECTION_POINT_REMOVED: 'injectionpointremoved',
  REMOVE: 'remove',
  SYSTEM_ROLE_RESTRICTION_EDITOR_ADDED: 'systemrolerestrictioneditoradded',
  COURSE_ROLE_RESTRICTION_EDITOR_ADDED: 'courserolerestrictioneditoradded',
  INSTITUION_ROLE_RESTRICTION_EDITOR_ADDED:
      'institutionrolerestrictioneditoradded'
};
