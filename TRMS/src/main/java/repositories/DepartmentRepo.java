package repositories;

import models.Department;

import java.util.List;

public interface DepartmentRepo extends CrudRepository<Department>{
    @Override
    Department add(Department department);

    @Override
    Department getById(Integer id);

    @Override
    List<Department> getAll();

    @Override
    void update(Department department);

    @Override
    void delete(Integer id);
}
