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

import org.mockito.Mock;
import org.mockito.Mockito;
import org.oscelot.jshack.model.ConfigEntry;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.Restriction;
import org.oscelot.jshack.model.RestrictionType;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.service.HackDiscoveryService;
import org.oscelot.jshack.service.HackManager;
import org.oscelot.jshack.service.HackManagerFactory;
import org.oscelot.jshack.service.HackService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
        HackManagerFactory.reset();
        hackManager = HackManagerFactory.getHackManager();
        cm = Mockito.mock(ContextManager.class);
        hackService = Mockito.mock(HackService.class);
        discoveryService = Mockito.mock(HackDiscoveryService.class);
        hackManager.setDiscoveryService(discoveryService);
        hackManager.setHackService(hackService);
        hook = new JspFramesetStartHook();
        hook.setContextManager(cm);
    }

    @Test
    public void getContent_withBasicHack_rendersContent() {
        Context ctx = mock(Context.class);
        when(cm.getContext()).thenReturn(ctx);
        Hack hack = new Hack("testhack");

        HackResource resource = newResource(null, null, "test content");
        resource.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));

        addResourcesToHack(hack, resource);


        when(discoveryService.enumerateHackIds()).thenReturn(Lists.newArrayList("testhack"));
        when(hackService.getHackForId("testhack")).thenReturn(hack);


        String content = hook.getContent();

        Assert.assertEquals("\n<!-- START HACK : testhack -->\ntest content\n<!-- END HACK : testhack -->\n", content);
    }


    @Test
    public void getContent_withMultipleInjectableItems_rendersContent() {
        Context ctx = mock(Context.class);
        when(cm.getContext()).thenReturn(ctx);
        Hack hack = new Hack("testhack");

        HackResource resource = newResource(null, null, "test content");
        resource.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));

        HackResource resource1 = newResource(null, null, "test content two");
        resource1.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));

        addResourcesToHack(hack, resource, resource1);


        when(discoveryService.enumerateHackIds()).thenReturn(Lists.newArrayList("testhack"));
        when(hackService.getHackForId("testhack")).thenReturn(hack);


        String content = hook.getContent();

        Assert.assertEquals("\n<!-- START HACK : testhack -->\ntest content\n<!-- END HACK : testhack -->\n" +
                "\n<!-- START HACK : testhack -->\ntest content two\n<!-- END HACK : testhack -->\n", content);
    }


    @Test
    public void getContent_hackWithNullConfigItem_rendersContent() {
        Context ctx = mock(Context.class);
        when(cm.getContext()).thenReturn(ctx);
        Hack hack = new Hack("testhack");

        HackResource resource = newResource(null, null, "${config.myconfig}");
        resource.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));

        addResourcesToHack(hack, resource);


        when(discoveryService.enumerateHackIds()).thenReturn(Lists.newArrayList("testhack"));
        when(hackService.getHackForId("testhack")).thenReturn(hack);


        String content = hook.getContent();

        Assert.assertEquals("\n<!-- START HACK : testhack -->\n${config.myconfig}\n<!-- END HACK : testhack -->\n", content);
    }


    @Test
    public void getContent_hackWithConfigItem_rendersContent() {
        Context ctx = mock(Context.class);
        when(cm.getContext()).thenReturn(ctx);
        Hack hack = new Hack("testhack");

        HackResource resource = newResource(null, null, "${config.myconfig}");
        resource.setInjectionPoints(Lists.newArrayList("jsp.frameset.start"));

        addResourcesToHack(hack, resource);

        ConfigEntry configEntry = new ConfigEntry("myconfig", "my value");

        when(discoveryService.enumerateHackIds()).thenReturn(Lists.newArrayList("testhack"));
        when(hackService.getHackForId("testhack")).thenReturn(hack);
        when(hackService.getConfigEntriesForId("testhack")).thenReturn(Arrays.asList(configEntry));


        String content = hook.getContent();

        Assert.assertEquals("\n<!-- START HACK : testhack -->\nmy value\n<!-- END HACK : testhack -->\n", content);
    }


    private HackResource newResource(String path, String mime, String content) {
        HackResource resource = new HackResource();
        resource.setPath(path);
        resource.setMime(mime);
        resource.setContent(content);
        return resource;
    }

    private Restriction newRestriction(RestrictionType type, String val) {
        Restriction res = new Restriction();
        res.setType(type);
        res.setValue(val);
        return res;
    }

    private void addResourcesToHack(Hack hack, HackResource... resources) {
        if (hack.getResources() == null) {
            hack.setResources(new ArrayList<HackResource>());
        }
        hack.getResources().addAll(Arrays.asList(resources));
        for (HackResource resource : resources) {
            resource.setHack(hack);
        }
    }
}
