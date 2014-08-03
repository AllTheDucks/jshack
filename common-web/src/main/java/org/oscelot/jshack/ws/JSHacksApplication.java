package org.oscelot.jshack.ws;

/**
 * Created by wiley on 31/07/14.
 */




        import java.util.HashSet;
        import java.util.Set;

        import javax.ws.rs.core.Application;

public class JSHacksApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(HacksWebService.class);
        classes.add(BbRoleWebService.class);
        classes.add(TempFilesWebService.class);
        return classes;
    }

}