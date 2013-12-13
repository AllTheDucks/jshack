package org.oscelot.jshack.service;

import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.Hack;

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

    @Before
    public void setup() {
        hackDiscoveryService = mock(HackDiscoveryService.class);
        hackService = mock(HackService.class);
        hackManager = new HackManager();

        hackManager.setHackService(hackService);
        hackManager.setDiscoveryService(hackDiscoveryService);

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
}
