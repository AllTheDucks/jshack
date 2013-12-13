/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.platform.context.Context;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public abstract class CompiledRestriction {
    
    protected boolean inverse;
    
    public abstract boolean test(Context context);
    public abstract int getPriority();

    public boolean isInverse() {
        return inverse;
    }

    public void setInverse(boolean inverse) {
        this.inverse = inverse;
    }
    
}
