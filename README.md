# That-Ton-p1
# Tution Reimbursement
Project Description
TRMS, or Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications.

## Technologies Used
- Java 
- Maven 
- PostgreSQL 
- Hibernate 
- Servlet
- Log4j 
- AWS RDS
- HTML/CSS
- Javascript
## Features
List of implemented features:
- Each employee is allowed to claim up to $1000 in tuition reimbursement. Event types have different standard reimbursement coverage: University Courses 80%, Seminars 60%, Certification Preparation Classes 75%, Certification 100%, Technical Training 90%, Other 30%. After a Benefits Coordinator (BenCo) has approved a reimbursement, the reimbursement is pending until a passing grade or presentation over the event is provided. The monetary amount available for an employee to reimburse is defined by the following equation: AvailableReimbursement = TotalReimbursement ($1000) – PendingReimbursements – AwardedReimbursements. If the projected reimbursement for an event exceeds the available reimbursement amount, it is adjusted to the amount available.
- Using localstorage to save the user's information after log in, it will be removed after log out.
- Employee can submit a form to request reimbursement for an event's tuition.
- The direct supervisor must provide approval for tuition reimbursement. If supervisor reject, manager & benco will not able to make decision for this request.
- The manager must provide approval for tuition reimbursement. If manager reject, benco will not be able to make decision for this request.
- Benco must provide approval for tuition reimbursement. Benco also can adjust the reimbursement amount, but the amount will not exceed the available amount of that employee. 

## Getting Started
To clone the project: git clone https://github.com/210823-java-msa-wvu/That-Ton-p1.git

Then to run the Java program, use SmartTomcat configuration, then go to http://localhost:8080/TRMS/static/index.html to begin.
