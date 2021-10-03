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
    public Reimbursement add(Reimbursement reimbursement) {
        Session s = HibernateUtil.getSession();
        //I am going to use a try catch finally to make sure that our transaction only commits to the dB
        // so long as there are no exception thrown

        Transaction tx = null;
        try{
            tx = s.beginTransaction();
            s.save(reimbursement);
            tx.commit();
        }   catch(HandlerException e){
            e.printStackTrace();
            if(tx != null){
                tx.rollback();
            }
        } finally {
            s.close();
        }
        return reimbursement;
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
