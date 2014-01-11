package org.oscelot.jshack.service;

import org.oscelot.jshack.model.ConfigEntry;
import org.oscelot.jshack.model.Hack;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: wiley
 * Date: 2/12/13
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */
public interface HackService {
    public Hack getHackForId(String hackId);
    public List<ConfigEntry> getConfigEntriesForId(String hackId);
    public void persistHack(Hack hack);
}
