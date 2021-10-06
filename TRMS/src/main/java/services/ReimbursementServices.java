package services;

import models.Employee;
import models.Reimbursement;
import repositories.EmployeeRepo;
import repositories.ReimbursementRepo;
import repositories.hibernate.EmployeeHibernate;
import repositories.hibernate.ReimbursementHibernate;

import java.util.ArrayList;
import java.util.List;

public class ReimbursementServices {

    ReimbursementRepo reimbursementRepo = new ReimbursementHibernate();

    public Reimbursement getReimbursementById(Integer id) {return reimbursementRepo.getById(id);}

    public List<Reimbursement> getAllRequestsByEmployeeId(int eid) {
        List<Reimbursement> requests = reimbursementRepo.getAll();
        List<Reimbursement> result = new ArrayList<Reimbursement>();

        for(Reimbursement r : requests) {
            if(r.getEmployee_id() == eid) {
                result.add(r);
            }
        }
        return result;
    }

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
