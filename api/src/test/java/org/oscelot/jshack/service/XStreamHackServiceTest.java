package org.oscelot.jshack.service;

import com.thoughtworks.xstream.mapper.CannotResolveClassException;
import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.*;
import org.oscelot.jshack.resources.HackResource;
import org.xml.sax.SAXException;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;
import static org.custommonkey.xmlunit.XMLAssert.*;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 5/12/13
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */
public class XStreamHackServiceTest {

    private XStreamHackService service;
    private HackStreamFactory streamFactory;

    @Before
    public void setup() {
        service = new XStreamHackService();
        streamFactory = mock(FileHackStreamFactory.class);

        service.setStreamFactory(streamFactory);

    }

    @Test
    public void getHackForId_withValidMinimalXML_returnsAHackInstance() throws Exception {
        ByteArrayInputStream is = getISForString("<hack><identifier>MYHACK</identifier></hack>");

        when(streamFactory.getHackXMLInputStream("MYHACK")).thenReturn(is);

        Hack returnedHack = service.getHackForId("MYHACK");
        assertEquals("MYHACK", returnedHack.getIdentifier());
    }

    @Test
    public void getHackForId_withValidFullXML_returnsAHackInstance() throws Exception {
        String xml = "<hack>\n" +
                "  <name>Availability Notice</name>\n" +
                "  <identifier>availabilitynotice</identifier>\n" +
                "  <description>A banner that is inserted at the top of Course Pages, which notifies instructors that their course is not available to students.</description>\n" +
                "  <version>1.1</version>\n" +
                "  <targetVersionMin>9.1.8</targetVersionMin>\n" +
                "  <targetVersionMax>9.1.10</targetVersionMax>\n" +
                "  <developers>\n" +
                "    <developer>\n" +
                "      <name>Wiley Fuller</name>\n" +
                "      <institution>Swinburne University</institution>\n" +
                "      <url>http://www.swinburne.edu.au/</url>\n" +
                "      <email>wfuller@swin.edu.au</email>\n" +
                "  </developer>\n" +
                "  <developer>\n" +
                "      <name>Shane Argo</name>\n" +
                "      <institution>All the Ducks</institution>\n" +
                "      <url>http://www.alltheducks.com/</url>\n" +
                "      <email>shane@alltheducks.com</email>\n" +
                "  </developer>\n" +
                "  </developers>\n" +
                "  <resources>\n" +
                "    <resource>\n" +
                "      <injectionPoints>\n" +
                "        <injectionPoint>tag.learningSystemPage.start</injectionPoint>\n" +
                "      </injectionPoints>\n" +
                "      <restrictions>\n" +
                "        <restriction>\n" +
                "          <type>COURSE_AVAILABILITY</type>\n" +
                "          <value>false</value>\n" +
                "          <inverse>false</inverse>\n" +
                "        </restriction>\n" +
                "        <restriction>\n" +
                "          <type>ENTITLEMENT</type>\n" +
                "          <value>course.availability.MODIFY</value>\n" +
                "          <inverse>false</inverse>\n" +
                "        </restriction>\n" +
                "      </restrictions>\n" +
                "      <path>index.html</path>\n" +
                "      <mime>text/html</mime>\n" +
                "    </resource>\n" +
                "    <resource>\n" +
                "      <path>cookies.js</path>\n" +
                "      <mime>text/javascript</mime>\n" +
                "    </resource>\n" +
                "  <resource>\n" +
                "      <path>arrow.png</path>\n" +
                "      <mime>image/png</mime>\n" +
                "  </resource>\n" +
                "  <resource>\n" +
                "      <path>scroller.js</path>\n" +
                "      <mime>text/javascript</mime>\n" +
                "    </resource>\n" +
                "  <resource>\n" +
                "      <path>scroller.css</path>\n" +
                "      <mime>text/css</mime>\n" +
                "    </resource>\n" +
                "  </resources>\n" +
                "  <configEntryDefinitions>\n" +
                "  <configEntryDefinition>\n" +
                "    <identifier>unavailableText</identifier>\n" +
                "    <name>Unavailable text</name>\n" +
                "    <description>The text that appears in the bubble when a course is not availabile.</description>\n" +
                "    <defaultValue>Your course is not available.</defaultValue>\n" +
                "  </configEntryDefinition>\n" +
                "  <configEntryDefinition>\n" +
                "    <identifier>coursePropertiesButtonText</identifier>\n" +
                "    <name>Course properties button text</name>\n" +
                "    <description>The text on the button to take the user to the course properties page.</description>\n" +
                "    <defaultValue>Change course availability</defaultValue>\n" +
                "  </configEntryDefinition>\n" +
                "  <configEntryDefinition>\n" +
                "    <identifier>availabilityRadioButtonsIndicatorText</identifier>\n" +
                "    <name>Availability Radio Buttons Indicator Text</name>\n" +
                "    <description>The text that shows next to the arrow pointing to the radio buttons for changing a courses availability.</description>\n" +
                "    <defaultValue>Make the course available here.</defaultValue>\n" +
                "  </configEntryDefinition>\n" +
                "  </configEntryDefinitions>\n" +
                "</hack>";
        ByteArrayInputStream is = getISForString(xml);

        when(streamFactory.getHackXMLInputStream("availabilitynotice")).thenReturn(is);

        Hack returnedHack = service.getHackForId("availabilitynotice");
        assertEquals("availabilitynotice", returnedHack.getIdentifier());
        assertEquals(2, returnedHack.getDevelopers().size());
        assertEquals(5, returnedHack.getResources().size());
        assertEquals(1, returnedHack.getResources().get(0).getInjectionPoints().size());
    }

    @Test(expected = CannotResolveClassException.class)
    public void getHackForId_withInvalidXML_throwsException() throws Exception {
        ByteArrayInputStream is = getISForString("<blah><identifier>MYHACK</identifier></blah>");

        when(streamFactory.getHackXMLInputStream("MYHACK")).thenReturn(is);

        service.getHackForId("MYHACK");
    }

    @Test
    public void getHackConfigForId_withValidXML_returnsAListOfConfigEntries() {
        ByteArrayInputStream is = getISForString("<configEntries><configEntry><identifier>blah</identifier><value>myValue</value></configEntry></configEntries>");

        when(streamFactory.getHackConfigInputStream("MYHACK")).thenReturn(is);

        List<ConfigEntry> configEntries = service.getConfigEntriesForId("MYHACK");

        assertEquals("blah", configEntries.get(0).getIdentifier());
    }

    @Test(expected = CannotResolveClassException.class)
    public void getHackConfigForId_withInvalidXML_throwsException() {
        ByteArrayInputStream is = getISForString("<blah><configEntry><identifier>blah</identifier><value>myValue</value></configEntry></blah>");

        when(streamFactory.getHackConfigInputStream("MYHACK")).thenReturn(is);

        service.getConfigEntriesForId("MYHACK");
    }

    @Test
    public void persistHack_withSimpleValidHack_writesSuccessfully() {
        ByteArrayOutputStream hackOS = new ByteArrayOutputStream();

        when(streamFactory.getHackXMLOutputStream("MYHACK")).thenReturn(hackOS);

        Hack hack = new Hack();
        hack.setIdentifier("MYHACK");
        hack.setName("My Hack");

        service.persistHack(hack);

        String hackOutput = hackOS.toString();
        assertEquals("<hack>\n" +
                "  <name>My Hack</name>\n" +
                "  <identifier>MYHACK</identifier>\n" +
                "</hack>", hackOutput);
    }

    @Test
    public void persistHack_withMultipleDevelopers_writesSuccessfully() throws Exception {
        ByteArrayOutputStream hackOS = new ByteArrayOutputStream();

        when(streamFactory.getHackXMLOutputStream("MYHACK")).thenReturn(hackOS);

        Hack hack = new Hack();
        hack.setIdentifier("MYHACK");
        hack.setName("My Hack");
        Developer dev1 = new Developer("Wiley Fuller", "Swinburne University",
                "http://www.swinburne.edu.au/", "wfuller@swin.edu.au");
        Developer dev2 = new Developer("Shane Argo", "All the Ducks",
                "http://www.alltheducks.com/", "shane@alltheducks.com");
        ArrayList<Developer> devs = new ArrayList<Developer>();
        devs.add(dev1);
        devs.add(dev2);
        hack.setDevelopers(devs);

        service.persistHack(hack);

        String hackOutput = hackOS.toString();
        assertXMLEqual("<hack>\n" +
                "  <name>My Hack</name>\n" +
                "  <identifier>MYHACK</identifier>\n" +
                "  <developers>\n" +
                "    <developer>\n" +
                "      <name>Wiley Fuller</name>\n" +
                "      <institution>Swinburne University</institution>\n" +
                "      <url>http://www.swinburne.edu.au/</url>\n" +
                "      <email>wfuller@swin.edu.au</email>\n" +
                "    </developer>\n" +
                "    <developer>\n" +
                "      <name>Shane Argo</name>\n" +
                "      <institution>All the Ducks</institution>\n" +
                "      <url>http://www.alltheducks.com/</url>\n" +
                "      <email>shane@alltheducks.com</email>\n" +
                "    </developer>\n" +
                "  </developers>\n" +
                "</hack>", hackOutput);
    }

    @Test
    public void persistHack_withResources_writesSuccessfully() throws Exception {
        ByteArrayOutputStream hackOS = new ByteArrayOutputStream();

        when(streamFactory.getHackXMLOutputStream("MYHACK")).thenReturn(hackOS);

        Hack hack = new Hack();
        hack.setIdentifier("MYHACK");
        hack.setName("My Hack");
        HackResource resource = new HackResource("index.html", "tempfile.tmp","text/html");

        ArrayList<HackResource> resources = new ArrayList<HackResource>();
        resources.add(resource);
        hack.setResources(resources);

        ArrayList<String> injectionPoints = new ArrayList<String>();
        injectionPoints.add("tag.learningSystemPage.start");
        resource.setInjectionPoints(injectionPoints);

        ArrayList<Restriction> restrictions = new ArrayList<Restriction>();
        Restriction restriction1 = new Restriction(RestrictionType.COURSE_AVAILABILITY,
                "false", false);
        Restriction restriction2 = new Restriction(RestrictionType.ENTITLEMENT,
                "course.availability.MODIFY", false);
        restrictions.add(restriction1);
        restrictions.add(restriction2);
        resource.setRestrictions(restrictions);

        service.persistHack(hack);

        String hackOutput = hackOS.toString();
        assertXMLEqual("<hack>\n" +
                "  <name>My Hack</name>\n" +
                "  <identifier>MYHACK</identifier>\n" +
                "  <resources>\n" +
                "    <resource>\n" +
                "      <path>index.html</path>\n" +
                "      <mime>text/html</mime>\n" +
                "      <injectResource>false</injectResource>\n" +
                "      <injectionPoints>\n" +
                "        <injectionPoint>tag.learningSystemPage.start</injectionPoint>\n" +
                "      </injectionPoints>\n" +
                "      <restrictions>\n" +
                "        <restriction>\n" +
                "          <type>COURSE_AVAILABILITY</type>\n" +
                "          <value>false</value>\n" +
                "          <inverse>false</inverse>\n" +
                "        </restriction>\n" +
                "        <restriction>\n" +
                "          <type>ENTITLEMENT</type>\n" +
                "          <value>course.availability.MODIFY</value>\n" +
                "          <inverse>false</inverse>\n" +
                "        </restriction>\n" +
                "      </restrictions>\n" +
                "    </resource>\n" +
                "  </resources>\n" +
                "</hack>", hackOutput);
    }


    public ByteArrayInputStream getISForString(String s) {
        return new ByteArrayInputStream(s.getBytes());
    }

}
