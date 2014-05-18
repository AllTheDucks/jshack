package org.oscelot.jshack.ws;

import java.util.List;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.resources.HackResource;
import org.oscelot.jshack.service.HackManager;
import org.oscelot.jshack.service.HackResourceService;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

/**
 * Created by wiley on 18/05/14.
 */
public class HacksWebServiceTest {
    private HackManager hackManager;
    private HackResourceService resourceService;
    private HacksWebService hackWS;

    @Before
    public void setup() {
        resourceService = mock(HackResourceService.class);
        hackManager = mock(HackManager.class);
        hackWS = new HacksWebService();

        hackWS.setHackManager(hackManager);
        hackWS.setHackResourceService(resourceService);

    }

    @Test
    public void createHack_withOutResources_savesSuccessfully() {
        Hack hack = new Hack();

        hackWS.createHack(hack);

        verify(hackManager).persistHack(hack);
        verify(resourceService, never()).persistResource(any(HackResource.class));
    }


    @Test
    public void createHack_withOneResource_savesSuccessfully() {
        Hack hack = new Hack();
        List<HackResource> resources = new ArrayList<HackResource>();
        HackResource resource = new HackResource();
        resources.add(resource);
        hack.setResources(resources);

        hackWS.createHack(hack);

        verify(hackManager).persistHack(hack);
        verify(resourceService).persistResource(resource);
        verifyNoMoreInteractions(resourceService);
    }

    @Test
    public void createHack_withMultipleResources_savesSuccessfully() {
        Hack hack = new Hack();
        List<HackResource> resources = new ArrayList<HackResource>();
        HackResource resource1 = new HackResource();
        HackResource resource2 = new HackResource();
        HackResource resource3 = new HackResource();
        resources.add(resource1);
        resources.add(resource2);
        resources.add(resource3);
        hack.setResources(resources);

        hackWS.createHack(hack);

        verify(hackManager).persistHack(hack);
        verify(resourceService).persistResource(resource1);
        verify(resourceService).persistResource(resource2);
        verify(resourceService).persistResource(resource3);
        verifyNoMoreInteractions(resourceService);
    }

}
