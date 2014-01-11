package org.oscelot.jshack.service;

import com.thoughtworks.xstream.mapper.CannotResolveClassException;
import org.junit.Before;
import org.junit.Test;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.model.ConfigEntry;
import org.oscelot.jshack.model.Hack;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

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

        when(streamFactory.getHackMetadataInputStream("MYHACK")).thenReturn(is);

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
//                "  <developers>\n" +
//                "    <developer>\n" +
//                "      <name>Wiley Fuller</name>\n" +
//                "      <institution>Swinburne University</institution>\n" +
//                "      <URL>http://www.swinburne.edu.au/</URL>\n" +
//                "      <email>wfuller@swin.edu.au</email>\n" +
//                "\t</developer>\n" +
//                "\t<developer>\n" +
//                "      <name>Shane Argo</name>\n" +
//                "      <institution>University of the Sunshine Coast</institution>\n" +
//                "      <URL>http://www.usc.edu.au/</URL>\n" +
//                "      <email>sargo@usc.edu.au</email>\n" +
//                "\t</developer>\n" +
//                "  </developers>\n" +
                "  <resources>\n" +
                "    <resource>\n" +
                "      <path>warning.gif</path>\n" +
                "      <mime>image/gif</mime>\n" +
                "    </resource>\n" +
                "    <resource>\n" +
                "      <path>cookies.js</path>\n" +
                "      <mime>text/javascript</mime>\n" +
                "    </resource>\n" +
                "\t<resource>\n" +
                "      <path>arrow.png</path>\n" +
                "      <mime>image/png</mime>\n" +
                "    </resource>\n" +
                "\t<resource>\n" +
                "      <path>scroller.js</path>\n" +
                "      <mime>text/javascript</mime>\n" +
                "    </resource>\n" +
                "\t<resource>\n" +
                "      <path>scroller.css</path>\n" +
                "      <mime>text/css</mime>\n" +
                "    </resource>\n" +
                "  </resources>\n" +
                "  <configEntryDefinitions>\n" +
                "\t<configEntryDefinition>\n" +
                "\t\t<identifier>unavailableText</identifier>\n" +
                "\t\t<name>Unavailable text</name>\n" +
                "\t\t<description>The text that appears in the bubble when a course is not availabile.</description>\n" +
                "\t\t<defaultValue>Your course is not available.</defaultValue>\n" +
                "\t</configEntryDefinition>\n" +
                "\t<configEntryDefinition>\n" +
                "\t\t<identifier>coursePropertiesButtonText</identifier>\n" +
                "\t\t<name>Course properties button text</name>\n" +
                "\t\t<description>The text on the button to take the user to the course properties page.</description>\n" +
                "\t\t<defaultValue>Change course availability</defaultValue>\n" +
                "\t</configEntryDefinition>\n" +
                "\t<configEntryDefinition>\n" +
                "\t\t<identifier>availabilityRadioButtonsIndicatorText</identifier>\n" +
                "\t\t<name>Availability Radio Buttons Indicator Text</name>\n" +
                "\t\t<description>The text that shows next to the arrow pointing to the radio buttons for changing a courses availability.</description>\n" +
                "\t\t<defaultValue>Make the course available here.</defaultValue>\n" +
                "\t</configEntryDefinition>\n" +
                "  </configEntryDefinitions>\n" +
                "  <snippetDefinitions>\n" +
                "\t  <snippetDefinition>\n" +
                "\t\t<identifier>notice</identifier>\n" +
                "\t\t<hooks>\n" +
                "\t\t\t<hook>tag.learningSystemPage.start</hook>\n" +
                "\t\t</hooks>\n" +
                "\t\t<restrictions>\n" +
                "\t\t\t<restriction>\n" +
                "\t\t\t\t<type>COURSE_AVAILABILITY</type>\n" +
                "\t\t\t\t<value>false</value>\n" +
                "\t\t\t\t<inverse>false</inverse>\n" +
                "\t\t\t</restriction>\n" +
                "\t\t\t<restriction>\n" +
                "\t\t\t\t<type>ENTITLEMENT</type>\n" +
                "\t\t\t\t<value>course.availability.MODIFY</value>\n" +
                "\t\t\t\t<inverse>false</inverse>\n" +
                "\t\t\t</restriction>\n" +
                "\t\t</restrictions>\n" +
                "\t  </snippetDefinition>\n" +
                "\t  <snippetDefinition>\n" +
                "\t\t<identifier>scroller</identifier>\n" +
                "\t\t  <hooks>\n" +
                "\t\t\t<hook>tag.learningSystemPage.start</hook>\n" +
                "\t\t  </hooks>\n" +
                "\t\t  <restrictions>\n" +
                "\t\t\t<restriction>\n" +
                "\t\t\t  <type>REQUEST_PARAMETER</type>\n" +
                "\t\t\t  <value>sentFromAvailabilityNotice=true</value>\n" +
                "\t\t\t  <inverse>false</inverse>\n" +
                "\t\t\t</restriction>\n" +
                "\t\t\t<restriction>\n" +
                "\t\t\t  <type>URL</type>\n" +
                "\t\t\t  <value>(.*/webapps/blackboard/cp/edit_course_properties\\.jsp|.*/webapps/blackboard/execute/cp/courseProperties)</value>\n" +
                "\t\t\t  <inverse>false</inverse>\n" +
                "\t\t\t</restriction>\n" +
                "\t\t  </restrictions>\n" +
                "\t  </snippetDefinition>\n" +
                "  </snippetDefinitions>\n" +
                "</hack>";
        ByteArrayInputStream is = getISForString(xml);

        when(streamFactory.getHackMetadataInputStream("availabilitynotice")).thenReturn(is);

        Hack returnedHack = service.getHackForId("availabilitynotice");
        assertEquals("availabilitynotice", returnedHack.getIdentifier());
        assertEquals(2, returnedHack.getSnippetDefinitions().size());
    }


    @Test(expected = CannotResolveClassException.class)
    public void getHackForId_withInvalidXML_throwsException() throws Exception {
        ByteArrayInputStream is = getISForString("<blah><identifier>MYHACK</identifier></blah>");

        when(streamFactory.getHackMetadataInputStream("MYHACK")).thenReturn(is);

        service.getHackForId("MYHACK");
    }

    @Test(expected = HackNotFoundException.class)
    public void getHackForId_fileNotFoundException_causesHackNotFoundException() throws Exception {
        when(streamFactory.getHackMetadataInputStream("MYHACK")).thenThrow(FileNotFoundException.class);

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
    public void persistHack_withValidHack_writesSuccessfully() {
        ByteArrayOutputStream hackOS = new ByteArrayOutputStream();

        when(streamFactory.getHackConfigOutputStream("MYHACK")).thenReturn(hackOS);

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

    public ByteArrayInputStream getISForString(String s) {
        return new ByteArrayInputStream(s.getBytes());
    }

}
