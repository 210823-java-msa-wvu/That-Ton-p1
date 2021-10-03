package services;

import models.Employee;
import repositories.EmployeeRepo;
import repositories.hibernate.EmployeeHibernate;

import java.util.List;

public class EmployeeServices {

    EmployeeRepo employeeRepo = new EmployeeHibernate();

    public Employee searchEmployeeById(Integer id) {return employeeRepo.getById(id);}

    public List<Employee> getAllEmployees() {return employeeRepo.getAll();}
}
