package org.oscelot.jshack.model;

public class BbRole {

    private String id;
    private String name;

    public BbRole() {};
    public BbRole(String id, String name) {
        this.setId(id);
        this.setName(name);
    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
