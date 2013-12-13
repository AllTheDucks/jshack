// This file was automatically generated from jshack.soy.
// Please don't edit this file by hand.

if (typeof jsh == 'undefined') { var jsh = {}; }
if (typeof jsh.tpl == 'undefined') { jsh.tpl = {}; }


jsh.tpl.resourceItem = function(opt_data, opt_ignored) {
  return '<div class="jsh-resourceDiv"><table style="width:100%"><tr class="fileRow"><th><label>File:</label></th><td>' + soy.$$escapeHtml(opt_data.resource.path) + '<input type="hidden" name="' + soy.$$escapeHtml(opt_data.resource.path) + '"/><input type="hidden" name="tempFileName" value="' + soy.$$escapeHtml(opt_data.resource.tempFileName) + '"/></td></tr><tr class="mimeRow"><th><label>Mime Type:</label></th><td><input type="text" name="mime" value="' + soy.$$escapeHtml(opt_data.resource.mime) + '"></input></td></tr><tr title="Copy and paste this code into the snippet editor."><th>Example Ref:</th><td class="exampleRef"><b>&lt;[' + soy.$$escapeHtml(opt_data.resource.path) + ']&gt;</b></td></tr><tr><td colspan="2"><span style="float:right;"><a href="#" class="removeResourceLink"></a></span></td></tr></table></div>';
};


jsh.tpl.restrictionItem = function(opt_data, opt_ignored) {
  return '<div class="jsh-restrictionDiv"><table style="width:100%"><tr><td style="width:18em">Type:<select name="type"><option value="URL" ' + ((! opt_data.opt_restriction) ? 'checked="checked"' : '') + '>URL</option><option value="ENTITLEMENT">Entitlement</option><option value="ADVANCED">Advanced Expression</option><option value="COURSE_ROLE">Course Role</option><option value="SYSTEM_ROLE">System Role</option><option value="PORTAL_ROLE">Institution Role</option><option value="COURSE_AVAILABILITY" selected="true">Course Availability</option><option value="REQUEST_PARAMETER">Request Parameter</option></select><select name="inverse"><option value="false" selected="true">is</option><option value="true">is not</option></select></td><td style="width:4em">Value:</td><td><input type="text" name="value" style="width:100%;" value="false"></td><td style="width:10em;text-align: right;"><a href="#" class="removeRestrictionLink">Remove Restriction</a></td></tr></table></div>';
};


jsh.tpl.snippetTab = function(opt_data, opt_ignored) {
  return '<div class="jsh-tab ' + ((opt_data.opt_active) ? 'jsh-active-tab' : '') + '"><a href="#">' + soy.$$escapeHtml(opt_data.snippet.identifier) + '</a></div>';
};


jsh.tpl.createSnippetTab = function(opt_data, opt_ignored) {
  return '<div class="jsh-tab jsh-new-tab"><a href="#">New...</a></div>';
};
