/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.hooks;

import blackboard.platform.context.Context;
import blackboard.platform.context.ContextManagerFactory;
import blackboard.servlet.renderinghook.RenderingHook;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.oscelot.jshack.JSHackManager;
import org.oscelot.jshack.JSHackManagerFactory;
import org.oscelot.jshack.model.HackInstance;
import org.oscelot.jshack.model.Hack;
import org.oscelot.jshack.model.Snippet;
import org.oscelot.jshack.resources.ResourceManager;
import org.oscelot.jshack.resources.ResourceManagerFactory;

/**
 * Base class for the JSHack rendering hook implementations.
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public abstract class JSHackRenderingHook implements RenderingHook {

    @Override
    public abstract String getKey();
    protected JSHackManager hackManager;

    @Override
    public String getContent() {
        Hack currPkg = null;
        try {
            hackManager = getHackManager();
            StringBuilder output = new StringBuilder();

            Context context = ContextManagerFactory.getInstance().getContext();
            if (context == null) {
                return "";
            }

            Collection<Snippet> snippets = hackManager.getMatchingSnippets(this.getKey(), context);

            if (snippets != null) {
                for (Snippet snippet : snippets) {
                    Hack hack = snippet.getHackInstance().getHack();
                    StringBuilder sb = new StringBuilder("\n<!-- START HACK : ");
                    sb.append(hack.getIdentifier());
                    sb.append(" -->\n");
                    sb.append(renderSnippet(snippet, context));
                    sb.append("\n<!-- END HACK : ");
                    sb.append(hack.getIdentifier());
                    sb.append(" -->\n");
                    
                    output.append(sb.toString());
                }
            }

            return output.toString();
        } catch (Exception ex) {
            Logger.getLogger(this.getClass().getCanonicalName()).log(Level.SEVERE, 
                    "Exception while processing JS Hacks. Problem with Package: " +
                    (currPkg == null ? "UNKNOWN" : currPkg.getIdentifier()), ex);
            ex.printStackTrace();
            return "<!-- ERROR RENDERING JS HACK - See Logs for details. -->";
        }
    }

    /**
     * Gets the current HackManager instance, or if null, gets an instance from
     * the Factory.
     *
     * @return the current HackManager instance.
     */
    protected JSHackManager getHackManager() {
        if (hackManager == null) {
            hackManager = JSHackManagerFactory.getHackManager();
        }
        return hackManager;
    }
    
    protected String renderSnippet(Snippet snippet, Context context) throws Exception {
        HackInstance hack = snippet.getHackInstance();
        VelocityContext vc = new VelocityContext();
        ResourceManager resourceManager = ResourceManagerFactory.getResourceManager();
        vc.put("resources", resourceManager.getResourceUrlMap(hack.getHack().getIdentifier()));
        vc.put("context", context);
        vc.put("config", hack.getConfigEntriesMap());
        StringWriter sw = new StringWriter();

        try {
            Velocity.evaluate(vc, sw, "JSHack", resourceManager.translateResourceShorthand(snippet.getSnippetDefinition().getSource()));
        } catch (IOException ex) {
            Logger.getLogger(JSHackRenderingHook.class.getName()).log(Level.SEVERE, null, ex);
            return "Error in JSHackRenderingHook. See Log for details. (" + ex.getMessage() + ")";
        }
        return sw.toString();
    }
    
}