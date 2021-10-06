package repositories;

import models.Reimbursement;

import java.util.List;

public interface ReimbursementRepo extends CrudRepository<Reimbursement>{

    Reimbursement add(Reimbursement reimbursement);

    Reimbursement getById(Integer id);

    List<Reimbursement> getAll();

    void update(Reimbursement reimbursement);

    void delete(Integer id);
}
