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

    }

}
