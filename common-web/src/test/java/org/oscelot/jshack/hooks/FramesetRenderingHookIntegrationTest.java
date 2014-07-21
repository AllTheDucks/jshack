package org.oscelot.jshack.hooks;

import blackboard.platform.context.Context;
import blackboard.platform.context.ContextManager;
import blackboard.platform.context.impl.ContextImpl;
import blackboard.platform.context.impl.ContextWrapper;
import com.google.common.collect.Lists;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import static org.mockito.Mockito.*;

import org.oscelot.jshack.bb.TestContext;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.service.HackDiscoveryService;
import org.oscelot.jshack.service.HackManager;
import org.oscelot.jshack.service.HackManagerFactory;
import org.oscelot.jshack.service.HackService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wiley on 20/07/14.
 */

public class FramesetRenderingHookIntegrationTest {

    JSHackRenderingHook hook;
    HackManager hackManager;
    HackDiscoveryService discoveryService;
    HackService hackService;
    ContextManager cm;

    @Before
    public void setup() {
        hackManager = HackManagerFactory.getHackManager();
        cm = mock(ContextManager.class);
        hackService = mock(HackService.class);
        discoveryService = mock(HackDiscoveryService.class);
        hackManager.setDiscoveryService(discoveryService);
        hackManager.setHackService(hackService);
        hook = new JspFramesetStartHook();
        hook.setContextManager(cm);
    }

    @Test
    public void getContent_withBasicHack_rendersContent() {
        Context ctx = new TestContext();
        when(cm.getContext()).thenReturn(ctx);
        Hack hack = new Hack();
        hack.setIdentifier("testhack");
        HackResource resource = new HackResource();
        resource.setContent("test content");
        resource.setHack(hack);
        resource.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));
        List<HackResource> resList = new ArrayList<>();
        resList.add(resource);
        hack.setResources(resList);


        when(discoveryService.enumerateHackIds()).thenReturn(Lists.newArrayList("testhack"));
        when(hackService.getHackForId("testhack")).thenReturn(hack);


        String content = hook.getContent();

        Assert.assertEquals("\n<!-- START HACK : testhack -->\ntest content\n<!-- END HACK : testhack -->\n", content);
    }
}
