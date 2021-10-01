package models;

import javax.persistence.*;

@Entity
@Table(name="departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(name = "dep_head_name")
    private String dep_head_name;

    @Column(name = "dep_name")
    private String dep_name;

    public Department() {
    }

    public Department(int id, String dep_head_name, String dep_name) {
        this.id = id;
        this.dep_head_name = dep_head_name;
        this.dep_name = dep_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDep_head_name() {
        return dep_head_name;
    }

    public void setDep_head_name(String dep_head_name) {
        this.dep_head_name = dep_head_name;
    }

    public String getDep_name() {
        return dep_name;
    }

    public void setDep_name(String dep_name) {
        this.dep_name = dep_name;
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", dep_head_name='" + dep_head_name + '\'' +
                ", dep_name='" + dep_name + '\'' +
                '}';
    }
}
