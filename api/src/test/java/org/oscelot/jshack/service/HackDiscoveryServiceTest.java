package org.oscelot.jshack.service;

import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 8/12/13
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */
public class HackDiscoveryServiceTest {

    private HackDiscoveryService discoveryService;
    private JSHackDirectoryFactory directoryFactory;

    @Before
    public void setup() {
        discoveryService = new HackDiscoveryService();
        directoryFactory = mock(JSHackDirectoryFactory.class);
        discoveryService.setDirectoryFactory(directoryFactory);
    }

    @Test
    public void enumerateHacks_withNoHacks_returnsEmptyList() {
        when(directoryFactory.getHacksDir()).thenReturn(new File("api/src/test/data/zerohacks"));

        List<String> hackIdList = discoveryService.enumerateHackIds();

        assertNotNull(hackIdList);
        assertEquals(0, hackIdList.size());
    }

    @Test
    public void enumerateHacks_withSingleHack_returnsSingleElementList() {
        when(directoryFactory.getHacksDir()).thenReturn(new File("api/src/test/data/singlehack"));
        List<String> hackIdList = discoveryService.enumerateHackIds();

        assertNotNull(hackIdList);
        assertEquals(1, hackIdList.size());
        assertEquals("hackstreamtest", hackIdList.get(0));
    }

    @Test
    public void enumerateHacks_withMultipleHacks_returnsSingleElementList() {
        when(directoryFactory.getHacksDir()).thenReturn(new File("api/src/test/data/threehacks"));
        List<String> hackIdList = discoveryService.enumerateHackIds();

        assertNotNull(hackIdList);
        assertEquals(3, hackIdList.size());

        List<String> mustExist = new ArrayList<String>();
        mustExist.add("hackstreamtest1");
        mustExist.add("hackstreamtest2");
        mustExist.add("hackstreamtest3");
        assertTrue("All three hacks exist.", hackIdList.containsAll(mustExist));
    }
}
