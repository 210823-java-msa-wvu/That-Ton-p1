package repositories;

import models.Reimbursement;
import models.User;

import java.util.List;

public interface ReimbursementRepo extends CrudRepository{

    User add(Reimbursement reimbursement);

    User getById(Integer id);

    List<Reimbursement> getAll();

    void update(Reimbursement reimbursement);

    void delete(Integer id);
}
