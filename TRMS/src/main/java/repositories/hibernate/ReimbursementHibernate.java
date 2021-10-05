package repositories.hibernate;

import com.sun.xml.internal.ws.handler.HandlerException;
import models.Reimbursement;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import repositories.ReimbursementRepo;
import utils.HibernateUtil;

import java.util.List;

public class ReimbursementHibernate implements ReimbursementRepo {


    @Override
    public Reimbursement add(Reimbursement rei) {
        Session sess = HibernateUtil.getSession();

        try {
            sess.beginTransaction();
            rei.setId((int) sess.save(rei));
            sess.getTransaction().commit();
        } catch (HibernateException e) {
            e.printStackTrace();
            sess.getTransaction().rollback();
            rei = null;
        } finally {
            sess.close();
        }

        return rei;
    }

    @Override
    public Reimbursement getById(Integer id) {
        Session s = HibernateUtil.getSession();
        //Query the db
        Reimbursement b = s.get(Reimbursement.class, id);

        //Close our Connection
        s.close();
        return b;
    }

    @Override
    public List<Reimbursement> getAll() {
        Session s = HibernateUtil.getSession();
        //Create a query object
        String query = "from Reimbursement "; //this is HQL (Not Native SQL)
        Query<Reimbursement> q = s.createQuery(query, Reimbursement.class);
        List<Reimbursement> reimbursements = q.getResultList();
        s.close();
        return reimbursements;
    }

    @Override
    public void update(Reimbursement reimbursement) {
        Transaction tx = null;
        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.update(reimbursement);
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
        Transaction tx = null;

        try(Session s = HibernateUtil.getSession()){
            tx = s.beginTransaction();
            s.delete(id);
            tx.commit();
        }catch(HibernateException e){
            e.printStackTrace();
            if(tx != null){
                tx.rollback();
            }
        }
    }
}
