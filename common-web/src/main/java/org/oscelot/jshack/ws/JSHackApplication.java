package org.oscelot.jshack.ws;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.spring.bridge.api.SpringBridge;
import org.jvnet.hk2.spring.bridge.api.SpringIntoHK2Bridge;
import org.oscelot.jshack.security.JSHackAuthFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.ws.rs.ApplicationPath;


@ApplicationPath("resources")
public class JSHackApplication extends ResourceConfig {
    final Logger logger = LoggerFactory.getLogger(JSHackApplication.class);

    @Inject
    public JSHackApplication(ServiceLocator serviceLocator, ServletContext servletContext) {

        // Register a Spring to HK2 Bridge so we can use our Spring beans in Jersey land.
        SpringBridge.getSpringBridge().initializeSpringBridge(serviceLocator);
        final WebApplicationContext springContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        SpringIntoHK2Bridge springBridge = serviceLocator.getService(SpringIntoHK2Bridge.class);
        springBridge.bridgeSpringBeanFactory(springContext);


        packages("org.oscelot.jshack.ws;org.oscelot.jshack.security");
        register(JacksonJsonProvider.class);
        register(JSHackAuthFeature.class);

        logger.info("Started JSHackApplication.");
    }


}