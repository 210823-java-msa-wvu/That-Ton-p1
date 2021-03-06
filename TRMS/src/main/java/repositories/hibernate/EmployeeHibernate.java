package repositories.hibernate;

import models.Employee;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import repositories.EmployeeRepo;
import utils.HibernateUtil;

import java.util.List;

public class EmployeeHibernate implements EmployeeRepo {
    @Override
    public Employee add(Employee employee) {
        return null;
    }

    @Override
    public Employee getById(Integer id) {
        Session s = HibernateUtil.getSession();
        //Query the db
        Employee b = s.get(Employee.class, id);

        //Close our Connection
        s.close();
        return b;
    }

    @Override
    public List<Employee> getAll() {
        Session s = HibernateUtil.getSession();
        //Create a query object
        String query = "from Employee order by employee_id"; //this is HQL (Not Native SQL)
        Query<Employee> q = s.createQuery(query, Employee.class);
        List<Employee> employees = q.getResultList();
        s.close();
        return employees;
    }

    @Override
    public void update(Employee employee) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(employee);
            tx.commit();
        } catch (HibernateException e){
            e.printStackTrace();
            if(tx != null){
                tx.rollback();
            }
        }
    }

    @Override
    public void delete(Integer id) {

    }
}
