package repositories.hibernate;

import models.Department;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repositories.DepartmentRepo;
import utils.HibernateUtil;

import java.util.List;

public class DepartmentHibernate implements DepartmentRepo {
    @Override
    public Department add(Department department) {
        return null;
    }

    @Override
    public Department getById(Integer id) {
        //Get Session
        Session s = HibernateUtil.getSession();
        //Query the db
        Department d = s.get(Department.class, id);

        //Close our Connection
        s.close();
        return d;
    }

    @Override
    public List<Department> getAll() {
        Session s = HibernateUtil.getSession();
        //Create a query object
        String query = "from Department "; //this is HQL (Not Native SQL)
        Query<Department> q = s.createQuery(query, Department.class);
        List<Department> departments = q.getResultList();
        s.close();
        return departments;
    }

    @Override
    public void update(Department department) {

    }

    @Override
    public void delete(Integer id) {

    }
}
