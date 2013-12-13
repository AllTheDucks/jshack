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
public class RequestParameterRestriction extends CompiledRestriction {

    private String parameterName;
    private Pattern parameterValuePattern;
    
    @Override
    public boolean test(Context context) {
        String parameterValue = context.getRequestParameter(parameterName);
        
        if(parameterValue == null) {
            //Parameter doesn't exist.
            return false;
        } else if (parameterValuePattern == null) {
            //Parameter does exist, and we don't care what it looks like.
            return true;
        }
        
        Matcher m = parameterValuePattern.matcher(parameterValue);
        return m.matches();
    }
    
    @Override
    public int getPriority() {
        return 2;
    }

    public String getParameterName() {
        return parameterName;
    }

    public void setParameterName(String parameterName) {
        this.parameterName = parameterName;
    }

    public Pattern getParameterValuePattern() {
        return parameterValuePattern;
    }

    public void setParameterValuePattern(Pattern parameterValuePattern) {
        this.parameterValuePattern = parameterValuePattern;
    }
    
    public String getParameterValuePatternString() {
        return parameterValuePattern.pattern();
    }

    public void setParameterValuePatternString(String parameterValuePatternString) {
        if(parameterValuePatternString != null && !parameterValuePatternString.equals("")) {
            this.parameterValuePattern = Pattern.compile(parameterValuePatternString);
        }
    }
    
}
