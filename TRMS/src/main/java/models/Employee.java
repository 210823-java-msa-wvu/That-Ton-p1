package models;

import javax.persistence.*;

@Entity
@Table(name="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int employee_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "supervisor_name")
    private String sup_name;

    @Column(name = "head_name")
    private String head_name;

    @Column(name = "dep_id")
    private Integer dept_id;

    @Column(name = "available_reimbursement")
    private Double available;

    @Column(name = "awarded_reimbursement")
    private Double awarded;

    @Column(name = "pending_reimbursement")
    private Double pending;

    public Employee() {
    }

    public Employee(int employee_id, String first_name, String last_name, String sup_name, String head_name, Integer dept_id) {
        this.employee_id = employee_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.sup_name = sup_name;
        this.head_name = head_name;
        this.dept_id = dept_id;
    }

    public Employee(int employee_id, String first_name, String last_name, String sup_name, String head_name, Integer dept_id, Double available, Double awarded, Double pending) {
        this.employee_id = employee_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.sup_name = sup_name;
        this.head_name = head_name;
        this.dept_id = dept_id;
        this.available = available;
        this.awarded = awarded;
        this.pending = pending;
    }

    public int getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(int employee_id) {
        this.employee_id = employee_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getSup_name() {
        return sup_name;
    }

    public void setSup_name(String sup_name) {
        this.sup_name = sup_name;
    }

    public String getHead_name() {
        return head_name;
    }

    public void setHead_name(String head_name) {
        this.head_name = head_name;
    }

    public Integer getDept_id() {
        return dept_id;
    }

    public void setDept_id(Integer dept_id) {
        this.dept_id = dept_id;
    }

    public Double getAvailable() {
        return available;
    }

    public void setAvailable(Double available) {
        this.available = available;
    }

    public Double getAwarded() {
        return awarded;
    }

    public void setAwarded(Double awarded) {
        this.awarded = awarded;
    }

    public Double getPending() {
        return pending;
    }

    public void setPending(Double pending) {
        this.pending = pending;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employee_id=" + employee_id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", sup_name='" + sup_name + '\'' +
                ", head_name='" + head_name + '\'' +
                ", dept_id=" + dept_id +
                ", available=" + available +
                ", awarded=" + awarded +
                ", pending=" + pending +
                '}';
    }
}
