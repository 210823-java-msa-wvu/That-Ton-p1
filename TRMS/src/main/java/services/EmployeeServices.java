package services;

import models.Employee;
import repositories.EmployeeRepo;
import repositories.hibernate.EmployeeHibernate;

import java.util.List;

public class EmployeeServices {

    EmployeeRepo employeeRepo = new EmployeeHibernate();

    public Employee searchEmployeeById(Integer id) {return employeeRepo.getById(id);}

    public List<Employee> getAllEmployees() {return employeeRepo.getAll();}

    public void updateEmployee(Employee r) {
        if (employeeRepo.getById(r.getEmployee_id()) != null){
            employeeRepo.update(r);
        } else {
            System.out.println("That reimbursement does not exist...");
        }
    }
}
