package models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

@Entity
@Table(name="reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "event_type")
    private String event_type;

    @Column(name = "location")
    private String event_location;

    @Column(name = "description")
    private String event_description;

    @Column(name="start_date")
    private String start_date;

    @Column(name="end_date")
    private String end_date;

    @Column(name = "grade_type")
    private String grade_type;

    @Column(name = "grade")
    private String grade;

    @Column(name = "reimbursement_amount")
    private Double amount;

    @Column(name = "sup_approval")
    private boolean sup_approval;

    @Column(name = "head_approval")
    private boolean head_approval;

    @Column(name = "benco_approval")
    private boolean benco_approval;

    public Reimbursement() {
    }

    public Reimbursement(Integer employeeId, String event_type, String event_location, String event_description, String start_date, String end_date, String grade_type, String grade, Double amount, boolean sup_approval, boolean head_approval, boolean benco_approval) {
        this.employeeId = employeeId;
        this.event_type = event_type;
        this.event_location = event_location;
        this.event_description = event_description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.grade_type = grade_type;
        this.grade = grade;
        this.amount = amount;
        this.sup_approval = sup_approval;
        this.head_approval = head_approval;
        this.benco_approval = benco_approval;
    }

    public Reimbursement(int id, Integer employeeId, String event_type, String event_location, String event_description, String start_date, String end_date, String grade_type, String grade, Double amount, boolean sup_approval, boolean head_approval, boolean benco_approval) {
        this.id = id;
        this.employeeId = employeeId;
        this.event_type = event_type;
        this.event_location = event_location;
        this.event_description = event_description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.grade_type = grade_type;
        this.grade = grade;
        this.amount = amount;
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

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getEvent_type() {
        return event_type;
    }

    public void setEvent_type(String event_type) {
        this.event_type = event_type;
    }

    public String getEvent_location() {
        return event_location;
    }

    public void setEvent_location(String event_location) {
        this.event_location = event_location;
    }

    public String getEvent_description() {
        return event_description;
    }

    public void setEvent_description(String event_description) {
        this.event_description = event_description;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
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
                ", employeeId=" + employeeId +
                ", event_type='" + event_type + '\'' +
                ", event_location='" + event_location + '\'' +
                ", event_description='" + event_description + '\'' +
                ", start_date='" + start_date + '\'' +
                ", end_date='" + end_date + '\'' +
                ", grade_type='" + grade_type + '\'' +
                ", grade='" + grade + '\'' +
                ", amount=" + amount +
                ", sup_approval=" + sup_approval +
                ", head_approval=" + head_approval +
                ", benco_approval=" + benco_approval +
                '}';
    }
}
