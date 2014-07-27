package org.oscelot.jshack.resources;

import blackboard.platform.context.Context;
import blackboard.platform.context.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.Restriction;
import org.oscelot.jshack.model.RestrictionType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by wiley on 20/07/14.
 */
public class ResourceRequestMatcherTest {

    ResourceRequestMatcher matcher;

    @Before
    public void setup() {

    }

    @Test
    public void getResources_withSingleResourceAndMatchingInjPoint_returnsSingleResource() {
        Hack hack = new Hack("myhack");
        HackResource resource = new HackResource();
        ArrayList<HackResource> resources = new ArrayList<>();
        ArrayList<String> injectionPoints = new ArrayList<>();
        injectionPoints.add("my.injection.point");
        resource.setInjectionPoints(injectionPoints);
        resources.add(resource);
        hack.setResources(resources);
        resource.setHack(hack);

        ArrayList<Hack> hacks = new ArrayList<>();
        hacks.add(hack);

        matcher = new ResourceRequestMatcher(hacks);

        List<HackResource> resList = matcher.getMatchingResources("my.injection.point", null);

        Assert.assertEquals(1, resList.size());
    }

    @Test
    public void getResources_withSingleResourceAndMismatchedInjPoint_returnsNoResources() {
        Hack hack = new Hack("myhack");
        HackResource resource = new HackResource();
        ArrayList<HackResource> resources = new ArrayList<>();
        ArrayList<String> injectionPoints = new ArrayList<>();
        injectionPoints.add("my.injection.point");
        resource.setInjectionPoints(injectionPoints);
        hack.setResources(resources);
        resource.setHack(hack);

        ArrayList<Hack> hacks = new ArrayList<>();
        hacks.add(hack);

        matcher = new ResourceRequestMatcher(hacks);

        List<HackResource> resList = matcher.getMatchingResources("your.injection.point", null);

        Assert.assertEquals(0, resList.size());
    }


    @Test
    public void getResources_withUrlRestrAndMatchingInjPoint_returnsResource() {
        Hack hack = new Hack("myhack");
        HackResource resource = newResource(null, null);
        resource.setInjectionPoints(Arrays.asList("my.injection.point"));
        resource.setRestrictions(Arrays.asList(newRestriction(RestrictionType.URL, ".*/myurl.*")));

        HackResource resource2 = newResource(null, null);
        resource2.setInjectionPoints(Arrays.asList("my.injection.point"));
        resource2.setRestrictions(Arrays.asList(newRestriction(RestrictionType.URL, ".*/notmyurl.*")));

        addResourcesToHack(hack, resource, resource2);

        Context ctx = Mockito.mock(Context.class);
        Mockito.when(ctx.getRequestUrl()).thenReturn("/myurl/myservlet/action");

        List<Hack> hacks = Arrays.asList(hack);

        matcher = new ResourceRequestMatcher(hacks);

        List<HackResource> resList = matcher.getMatchingResources("my.injection.point", ctx);

        Assert.assertTrue(resList.get(0).getRestrictions().get(0).getValue().contains("/myurl"));
        Assert.assertEquals(1, resList.size());
    }

    @Test
    public void getResources_withSameUrlRestrAndDiffInjPoint_returnsResource() {
        Hack hack = new Hack("myhack");
        HackResource resource = newResource(null, null);
        resource.setInjectionPoints(Arrays.asList("my.injection.point"));
        resource.setRestrictions(Arrays.asList(newRestriction(RestrictionType.URL, ".*/myurl.*")));

        HackResource resource2 = newResource(null, null);
        resource2.setInjectionPoints(Arrays.asList("different.injection.point"));
        resource2.setRestrictions(Arrays.asList(newRestriction(RestrictionType.URL, ".*/myurl.*")));

        addResourcesToHack(hack, resource, resource2);

        Context ctx = Mockito.mock(Context.class);
        Mockito.when(ctx.getRequestUrl()).thenReturn("/myurl/myservlet/action");

        List<Hack> hacks = Arrays.asList(hack);

        matcher = new ResourceRequestMatcher(hacks);

        List<HackResource> resList = matcher.getMatchingResources("my.injection.point", ctx);

        Assert.assertTrue(resList.get(0).getRestrictions().get(0).getValue().contains("/myurl"));
        Assert.assertEquals("my.injection.point", resList.get(0).getInjectionPoints().get(0));
        Assert.assertEquals(1, resList.size());
    }


    @Test
    public void getResources_singleResourceWithTwoInjPoints_matchesBoth() {
        Hack hack = new Hack("myhack");
        HackResource resource = newResource(null, null);
        resource.setInjectionPoints(Arrays.asList("my.injection.point", "different.injection.point"));
        resource.setRestrictions(Arrays.asList(newRestriction(RestrictionType.URL, ".*/myurl.*")));

        addResourcesToHack(hack, resource);

        Context ctx = Mockito.mock(Context.class);
        Mockito.when(ctx.getRequestUrl()).thenReturn("/myurl/myservlet/action");

        List<Hack> hacks = Arrays.asList(hack);

        matcher = new ResourceRequestMatcher(hacks);


        List<HackResource> resList = matcher.getMatchingResources("my.injection.point", ctx);
        Assert.assertTrue(resList.get(0).getRestrictions().get(0).getValue().contains("/myurl"));
        Assert.assertEquals(1, resList.size());


        resList = matcher.getMatchingResources("different.injection.point", ctx);
        Assert.assertTrue(resList.get(0).getRestrictions().get(0).getValue().contains("/myurl"));
        Assert.assertEquals(1, resList.size());
    }




    private HackResource newResource(String path, String mime) {
        HackResource resource = new HackResource();
        resource.setPath(path);
        resource.setMime(mime);
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
