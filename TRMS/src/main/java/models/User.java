package models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employee_id;
    private String username;
    private String password;
    private String title;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User(Integer employee_id, String username, String password, String title) {
        this.employee_id = employee_id;
        this.username = username;
        this.password = password;
        this.title = title;
    }

    public User(Integer employee_id, String username, String password) {
        this.employee_id = employee_id;
        this.username = username;
        this.password = password;
    }


    public Integer getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(Integer employee_id) {
        this.employee_id = employee_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "employee_id=" + employee_id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}