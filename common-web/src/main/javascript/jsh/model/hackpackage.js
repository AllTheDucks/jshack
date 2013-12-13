/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 26/11/13
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

goog.provides('jsh.model.HackPackage');

goog.require('jsh.model.HackResource');



/**
 *
 * @constructor
 */
jsh.model.HackPackage = function() {
  /** @type {string} */
  this.name;
  /** @type {string} */
  this.identifier;
  /** @type {string} */
  this.description;
  /** @type {string} */
  this.version;
  /** @type {string} */
  this.targetVersionMin;
  /** @type {string} */
  this.targetVersionMax;
  /** @type {string} */
  this.developerName;
  /** @type {string} */
  this.developerInstitution;
  /** @type {string} */
  this.developerURL;
  /** @type {string} */
  this.developerEmail;
  /** @type {goog.date.DateTime} */
  this.lastUpdated;
  /** @type {Array.<jsh.model.HackResource>} */
  this.resources;
};
