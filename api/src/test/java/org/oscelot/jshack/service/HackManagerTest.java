package org.oscelot.jshack.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.resources.ResourceManager;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 5/12/13
 * Time: 9:36 PM
 * To change this template use File | Settings | File Templates.
 */
public class HackManagerTest {

    private HackManager hackManager;
    private HackService hackService;
    private HackDiscoveryService hackDiscoveryService;
    private HackResourceService resourceService;
    private ResourceManager resourceManager;

    @Before
    public void setup() {
        hackDiscoveryService = mock(HackDiscoveryService.class);
        hackService = mock(HackService.class);
        resourceService = mock(HackResourceService.class);
        hackManager = new HackManager();
        resourceManager = Mockito.mock(ResourceManager.class);
        hackManager.setHackService(hackService);
        hackManager.setDiscoveryService(hackDiscoveryService);
        hackManager.setHackResourceService(resourceService);
        hackManager.setResourceManager(resourceManager);
    }

    @Test
    public void getHackById_forExistingHack_returnsHackSuccessfully() {

        Hack myHack = new Hack();
        myHack.setIdentifier("MYHACK");
        List<String> hackIds = new ArrayList<String>();
        hackIds.add("MYHACK");

        when(hackService.getHackForId("MYHACK")).thenReturn(myHack);
        when(hackDiscoveryService.enumerateHackIds()).thenReturn(hackIds);


        hackManager.loadHacks();
        Hack returnedHack = hackManager.getHackById("MYHACK");

        assertEquals(myHack.getIdentifier(), returnedHack.getIdentifier());

    }

    @Test(expected = HackNotFoundException.class)
    public void getHackById_forNonExistentHack_throwsException() {
        hackManager.getHackById("MYHACK");
    }

    @Test
    public void persistHack_withoutResources_savesSuccessfully() {
        Hack hack = new Hack();

        hackManager.persistHack(hack);

        verify(resourceService, never()).persistResource(anyString(), any(HackResource.class));
    }


    @Test
    public void persistHack_withOneResource_savesSuccessfully() {
        String id = "MYHACK";
        Hack hack = new Hack();
        hack.setIdentifier(id);
        List<HackResource> resources = new ArrayList<HackResource>();
        HackResource resource = new HackResource();
        resource.setContent("dummy content");
        resources.add(resource);
        hack.setResources(resources);

        hackManager.persistHack(hack);

        verify(resourceService).persistResource("MYHACK", resource);
        verifyNoMoreInteractions(resourceService);
    }

    @Test
    public void persistHack_withMultipleResources_savesSuccessfully() {
        String id = "MYHACK";
        Hack hack = new Hack();
        hack.setIdentifier(id);
        List<HackResource> resources = new ArrayList<HackResource>();
        HackResource resource1 = new HackResource();
        resource1.setContent("dummy content");
        HackResource resource2 = new HackResource();
        resource2.setContent("dummy content");
        HackResource resource3 = new HackResource();
        resource3.setContent("dummy content");
        resources.add(resource1);
        resources.add(resource2);
        resources.add(resource3);
        hack.setResources(resources);

        hackManager.persistHack(hack);

        verify(resourceService).persistResource(id, resource1);
        verify(resourceService).persistResource(id, resource2);
        verify(resourceService).persistResource(id, resource3);
        verifyNoMoreInteractions(resourceService);
    }


    @Test
    public void getHacks_firstTimeWith2Hacks_returns2Hacks() {
        Hack hackOne = new Hack();
        hackOne.setIdentifier("MYHACK");
        Hack hackTwo = new Hack();
        hackTwo.setIdentifier("ANOTHERHACK");

        List<String> hackIds = new ArrayList<String>();
        hackIds.add("MYHACK");
        hackIds.add("ANOTHERHACK");

        when(hackService.getHackForId("MYHACK")).thenReturn(hackOne);
        when(hackService.getHackForId("ANOTHERHACK")).thenReturn(hackTwo);
        when(hackDiscoveryService.enumerateHackIds()).thenReturn(hackIds);

        List<Hack> hacks = hackManager.getHacks();

        assertEquals(2, hacks.size());

    }

}
