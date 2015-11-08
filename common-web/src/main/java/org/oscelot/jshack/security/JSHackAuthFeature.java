package org.oscelot.jshack.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import java.lang.reflect.Method;

/**
 * Created by Wiley Fuller on 5/03/15.
 * Copyright All the Ducks Pty. Ltd.
 */
public class JSHackAuthFeature implements DynamicFeature {
    final Logger logger = LoggerFactory.getLogger(JSHackAuthFeature.class);

    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context) {
        logger.debug("Context Class: {}", resourceInfo.getResourceClass().getName());
        logger.debug("Context Method: {}", resourceInfo.getResourceMethod().getName());
        Class c = resourceInfo.getResourceClass();
        Method m = resourceInfo.getResourceMethod();

        if (c.isAnnotationPresent(RequiresAuthentication.class) ||
                m.isAnnotationPresent(RequiresAuthentication.class)) {
            ConfigurableJSHackAuthFilter filter = new ConfigurableJSHackAuthFilter();
            context.register(filter);
        }
    }
}