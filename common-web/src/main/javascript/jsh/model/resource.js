/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 26/11/13
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */


goog.provide('jsh.model.HackResource');



/**
 *
 * @constructor
 */
jsh.model.HackResource = function() {
  /** @type {string} */
  this.path;
  /** @type {string} */
  this.tempFileName;
  /** @type {string} */
  this.mime;
  /** @type {Array.<jsh.model.InjectionPoint>} */
  this.injectionPoints;
  /** @type {Array.<jsh.model.Restriction>} */
  this.restrictions;
  /** @type {string} */
  this.content;
  /** @type {string} */
  this.url;
};
