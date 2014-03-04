goog.provide('jsh.RestrictionTypeHelper');

goog.require('jsh.CourseAvailabilityRestrictionEditor');
goog.require('jsh.model.restrictionType');


/**
 * @type {Object}
 */
jsh.RestrictionTypeHelper.restrictionLookup = {};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    Advanced] = {
  'MenuLabel': 'Advanced',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    CourseAvailability] = {
  'MenuLabel': 'Course Availability',
  'Editor': jsh.CourseAvailabilityRestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    CourseRole] = {
  'MenuLabel': 'Course Role',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    Entitlement] = {
  'MenuLabel': 'Entitlement',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    PortalRole] = {
  'MenuLabel': 'Portal Role',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    RequestParameter] = {
  'MenuLabel': 'Request Parameter',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    SystemRole] = {
  'MenuLabel': 'System Role',
  'Editor': jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    URL] = {
  'MenuLabel': 'URL',
  'Editor': jsh.RestrictionEditor
};


/**
 * @param {jsh.model.restrictionType} type
 * @return {string}
 */
jsh.RestrictionTypeHelper.getMenuLabel = function(type) {
  return jsh.RestrictionTypeHelper.restrictionLookup[type]['MenuLabel'];
};


/**
 * @param {jsh.model.restrictionType} type
 * @return {jsh.RestrictionEditor}
 */
jsh.RestrictionTypeHelper.getEditor = function(type) {
  return new jsh.RestrictionTypeHelper.restrictionLookup[type]['Editor'];
};
