package repositories.hibernate;

import models.User;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repositories.UserRepo;
import utils.HibernateUtil;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class UserHibernate implements UserRepo {
    @Override
    public User add(User user) {
        return null;
    }

    @Override
    public User getById(Integer id) {
        return null;
    }

    @Override
    public User getByUsername(String username) {
        //Let's use the Criteria Interface
        Session s = HibernateUtil.getSession();
        User u = null;
        try{
            // Get Criteria Builder from Session
            CriteriaBuilder criteriaBuilder = s.getCriteriaBuilder();
            //Create CriteriaQuery
            CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
            //Create Root Object
            Root<User> root = criteriaQuery.from(User.class);
            //Use Predicates to narrow down our query
            Predicate predicate = criteriaBuilder.equal(root.get("username"), username);
            // Bringing our Criteria Builder and our Criteria Query together....
            // select * from users where username = ?
            criteriaQuery.select(root).where(predicate);
            //Save that result into an Object
            u = s.createQuery(criteriaQuery).getSingleResult();
        } catch (HibernateException e){
            e.printStackTrace();
        }finally {
            s.close();
        }

        return u;
    }

    @Override
    public List<User> getAll() {
        Session s = HibernateUtil.getSession();
        //Create a query object
        String query = "from User"; //this is HQL (Not Native SQL)
        Query<User> q = s.createQuery(query, User.class);
        List<User> users = q.getResultList();
        s.close();
        return users;
    }

    @Override
    public void update(User user) {

    }

    @Override
    public void delete(Integer id) {

    }
}
