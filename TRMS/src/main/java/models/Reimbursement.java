package models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee_id;

    @Column(name = "event_type")
    private String event_type;

    @Column(name = "location")
    private String location;

    @Column(name = "description")
    private String description;

    @Column(name="start_date")
    private LocalDate start_date;

    @Column(name="end_date")
    private LocalDate end_date;

    @Column(name = "grade_type")
    private String grade_type;

    @Column(name = "grade")
    private String grade;

    @Column(name = "sup_approval")
    private boolean sup_approval;

    @Column(name = "head_approval")
    private boolean head_approval;

    @Column(name = "benco_approval")
    private boolean benco_approval;

    public Reimbursement() {
    }

    public Reimbursement(int id, Employee employee_id, String event_type, String location, String description, LocalDate start_date, LocalDate end_date, String grade_type, String grade, boolean sup_approval, boolean head_approval, boolean benco_approval) {
        this.id = id;
        this.employee_id = employee_id;
        this.event_type = event_type;
        this.location = location;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.grade_type = grade_type;
        this.grade = grade;
        this.sup_approval = sup_approval;
        this.head_approval = head_approval;
        this.benco_approval = benco_approval;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Employee getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(Employee employee_id) {
        this.employee_id = employee_id;
    }

    public String getEvent_type() {
        return event_type;
    }

    public void setEvent_type(String event_type) {
        this.event_type = event_type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public String getGrade_type() {
        return grade_type;
    }

    public void setGrade_type(String grade_type) {
        this.grade_type = grade_type;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public boolean isSup_approval() {
        return sup_approval;
    }

    public void setSup_approval(boolean sup_approval) {
        this.sup_approval = sup_approval;
    }

    public boolean isHead_approval() {
        return head_approval;
    }

    public void setHead_approval(boolean head_approval) {
        this.head_approval = head_approval;
    }

    public boolean isBenco_approval() {
        return benco_approval;
    }

    public void setBenco_approval(boolean benco_approval) {
        this.benco_approval = benco_approval;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "id=" + id +
                ", employee_id=" + employee_id +
                ", event_type='" + event_type + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", grade_type='" + grade_type + '\'' +
                ", grade='" + grade + '\'' +
                ", sup_approval=" + sup_approval +
                ", head_approval=" + head_approval +
                ", benco_approval=" + benco_approval +
                '}';
    }
}
