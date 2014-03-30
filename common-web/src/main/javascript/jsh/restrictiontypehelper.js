goog.provide('jsh.RestrictionTypeHelper');

goog.require('jsh.CourseAvailabilityRestrictionEditor');
goog.require('jsh.UrlRestrictionEditor');
goog.require('jsh.model.restrictionType');


/**
 * @type {Object}
 */
jsh.RestrictionTypeHelper.restrictionLookup = {};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    advanced] = {
  MenuLabel: 'Advanced',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    courseAvailability] = {
  MenuLabel: 'Course Availability',
  Editor: jsh.CourseAvailabilityRestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    courseRole] = {
  MenuLabel: 'Course Role',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    entitlement] = {
  MenuLabel: 'Entitlement',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    portalRole] = {
  MenuLabel: 'Portal Role',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    requestParameter] = {
  MenuLabel: 'Request Parameter',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    systemRole] = {
  MenuLabel: 'System Role',
  Editor: jsh.RestrictionEditor
};
jsh.RestrictionTypeHelper.restrictionLookup[jsh.model.restrictionType.
    URL] = {
  MenuLabel: 'URL',
  Editor: jsh.UrlRestrictionEditor
};


/**
 * @param {jsh.model.restrictionType} type
 * @return {string}
 */
jsh.RestrictionTypeHelper.getMenuLabel = function(type) {
  return jsh.RestrictionTypeHelper.restrictionLookup[type].MenuLabel;
};


/**
 * @param {jsh.model.restrictionType} type
 * @return {jsh.RestrictionEditor}
 */
jsh.RestrictionTypeHelper.getEditor = function(type) {
  return new jsh.RestrictionTypeHelper.restrictionLookup[type].Editor;
};
