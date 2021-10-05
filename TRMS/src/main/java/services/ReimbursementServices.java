package services;

import models.Employee;
import models.Reimbursement;
import repositories.EmployeeRepo;
import repositories.JDBC.ReimbursementJDBC;
import repositories.ReimbursementRepo;
import repositories.hibernate.EmployeeHibernate;
import repositories.hibernate.ReimbursementHibernate;

import java.util.List;

public class ReimbursementServices {

    ReimbursementRepo reimbursementRepo = new ReimbursementHibernate();

    public Reimbursement getReimbursementById(Integer id) {return reimbursementRepo.getById(id);}

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementRepo.getAll();
    }

    public Reimbursement createReimbursement (Reimbursement r) {
        return reimbursementRepo.add(r);
    }

    public void updateReimbursement(Reimbursement r) {
        if (reimbursementRepo.getById(r.getId()) != null){
            reimbursementRepo.update(r);
        } else {
            System.out.println("That reimbursement does not exist...");
        }
    }

    public void deleteReimbursement(Integer id) {
        if (reimbursementRepo.getById(id) != null)
            reimbursementRepo.delete(id);
        else
            System.out.println("That reimbursement did not exist");
    }


}
