/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.model.restrictions;

import blackboard.persist.Id;
import blackboard.platform.context.Context;
import blackboard.platform.security.Entitlement;
import blackboard.platform.security.SecurityUtil;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class EntitlementRestriction extends CompiledRestriction {

    /**
     * The entitlement to check
     */
    protected Entitlement entitlement;
    
    @Override
    public boolean test(Context context) {
        boolean hasEntitlement = SecurityUtil.userHasEntitlement(getEntitlement());
        return hasEntitlement;
    }

    @Override
    public int getPriority() {
        return 3;
    }

    public String getEntitlementUID() {
        return getEntitlement().getEntitlementUid();
    }

    public void setEntitlementUID(String entitlementUID) {
        this.setEntitlement(new Entitlement(entitlementUID));
    }

    public Entitlement getEntitlement() {
        return entitlement;
    }

    public void setEntitlement(Entitlement entitlement) {
        this.entitlement = entitlement;
    }
    
    
    
}
