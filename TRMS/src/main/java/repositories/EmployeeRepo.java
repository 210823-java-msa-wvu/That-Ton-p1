package repositories;

import models.Employee;

import java.util.List;

public interface EmployeeRepo extends CrudRepository<Employee>{
    @Override
    Employee add(Employee employee);

    @Override
    Employee getById(Integer id);

    @Override
    List<Employee> getAll();

    @Override
    void update(Employee employee);

    @Override
    void delete(Integer id);
}
