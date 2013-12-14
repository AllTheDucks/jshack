/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 26/11/13
 * Time: 10:47 PM
 * To change this template use File | Settings | File Templates.
 */

goog.provide('jsh.model.Restriction');
goog.provide('jsh.model.restrictionType');



/**
 *
 * @constructor
 */
jsh.model.Restriction = function() {

  /** @type {jsh.model.restrictionType} */
  this.type;
  /** @type {string} */
  this.value;
  /** @type {boolean} */
  this.isInverse;

};


/**
 * constants for the restriction types
 * @enum {string}
 */
jsh.model.restrictionType = {
  Advanced: 'Advanced',
  CourseAvailability: 'CourseAvailability',
  CourseRole: 'CourseRole',
  Entitlement: 'Entitlement',
  PortalRole: 'PortalRole',
  RequestParameter: 'RequestParameter',
  SystemRole: 'SystemRole',
  URL: 'URL'
};
