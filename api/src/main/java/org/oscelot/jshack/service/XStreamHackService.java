package org.oscelot.jshack.service;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.converters.collections.CollectionConverter;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.thoughtworks.xstream.mapper.ClassAliasingMapper;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.exceptions.HackPersistenceException;
import org.oscelot.jshack.model.*;
import org.oscelot.jshack.resources.HackResource;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.inject.Inject;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 29/11/13
 * Time: 8:13 AM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class XStreamHackService implements HackService {


    @Inject
    private HackStreamFactory streamFactory;

    @Override
    public Hack getHackForId(String hackId) {

        InputStream is = streamFactory.getHackMetadataInputStream(hackId);
        XStream xstream = getHackMetadataXstream();
        Hack hack = (Hack) xstream.fromXML(is);

        return hack;
    }

    @Override
    public List<ConfigEntry> getConfigEntriesForId(String hackId) {

        InputStream is = streamFactory.getHackConfigInputStream(hackId);
        XStream xstream = getConfigEntriesXstream();
        List<ConfigEntry> hackConfig = (List<ConfigEntry>)xstream.fromXML(is);

        return hackConfig;
    }

    @Override
    public void persistHack(Hack hack) {
        OutputStream hackOS = streamFactory.getHackMetadataOutputStream(hack.getIdentifier());

        XStream xstream = getHackMetadataXstream();
        xstream.toXML(hack, hackOS);
        try {
            hackOS.close();
        } catch (IOException e) {
            throw new HackPersistenceException(e);
        }

    }


    //TODO: Cache XStream object
    public XStream getHackMetadataXstream() {
        XStream xstream = new XStream(new DomDriver("UTF-8"));
        xstream.alias("hack", Hack.class);

        ClassAliasingMapper mapper = new ClassAliasingMapper(xstream.getMapper());
        mapper.addClassAlias("pattern", String.class);
        xstream.registerLocalConverter(Hack.class, "urlPatterns", new CollectionConverter(mapper));

        xstream.alias("restriction", Restriction.class);
        xstream.aliasField("restrictions", Hack.class, "restrictions");

        xstream.alias("configEntryDefinition", ConfigEntryDefinition.class);
        xstream.aliasField("configEntryDefinitions", Hack.class, "configEntryDefinitions");

        xstream.alias("snippetDefinition", SnippetDefinition.class);
        xstream.aliasField("snippetDefinitions", Hack.class, "snippetDefinitions");
        xstream.omitField(SnippetDefinition.class, "source");

        xstream.alias("hook", String.class);
        xstream.aliasField("hooks", Hack.class, "hooks");

        xstream.omitField(Hack.class, "enabled");

        xstream.alias("resource", HackResource.class);
        xstream.omitField(HackResource.class, "tempFileName");

        return xstream;
    }

    //TODO: Cache XStream object
    public XStream getConfigEntriesXstream() {
        XStream xstream = new XStream(new DomDriver("UTF-8"));
        xstream.alias("configEntries", List.class);

        ClassAliasingMapper mapper = new ClassAliasingMapper(xstream.getMapper());
        mapper.addClassAlias("configEntry", ConfigEntry.class);
        xstream.registerConverter(new CollectionConverter(mapper));

        return xstream;
    }

    public HackStreamFactory getStreamFactory() {
        return streamFactory;
    }

    public void setStreamFactory(HackStreamFactory streamFactory) {
        this.streamFactory = streamFactory;
    }
}
