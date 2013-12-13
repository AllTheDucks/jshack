/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.platform.context.Context;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class URLRestriction extends CompiledRestriction {

    private Pattern URLPattern;
    
    @Override
    public boolean test(Context context) {
        Matcher m = URLPattern.matcher(context.getRequestUrl());
        return m.matches();
    }
    
    @Override
    public int getPriority() {
        return 1;
    }

    public Pattern getURLPattern() {
        return URLPattern;
    }

    public void setURLPattern(Pattern URLPattern) {
        this.URLPattern = URLPattern;
    }
    
    public String getURLPatternString() {
        return URLPattern.pattern();
    }

    public void setURLPatternString(String URLPatternString) {
        this.URLPattern = Pattern.compile(URLPatternString);
    }
    
}
