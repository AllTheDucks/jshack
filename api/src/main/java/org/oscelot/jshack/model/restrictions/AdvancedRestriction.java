/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.platform.context.Context;
import org.apache.commons.jexl2.*;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class AdvancedRestriction extends CompiledRestriction {

    private Expression jexlExpression;
    private JexlEngine jexlEngine = new JexlEngine();
    
    @Override
    public boolean test(Context context) {
        JexlContext jexlContext = new MapContext();
        jexlContext.set("context", context);
        
        return ((Boolean)jexlExpression.evaluate(jexlContext)).booleanValue();
    }
    
    @Override
    public int getPriority() {
        return 10;
    }

    public Expression getJexlExpression() {
        return jexlExpression;
    }

    public void setJexlExpression(Expression jexlExpression) {
        this.jexlExpression = jexlExpression;
    }
    
    public String getExpression() {
        return jexlExpression.getExpression();
    }

    public void setExpression(String jexlExpression) {
        this.jexlExpression = jexlEngine.createExpression(jexlExpression);
    }
    
    
    
}
