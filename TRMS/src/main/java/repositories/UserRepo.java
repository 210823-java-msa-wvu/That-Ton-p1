package repositories;

import models.User;
import java.util.List;

public interface UserRepo extends CrudRepository<User>{

    User add(User user);

    User getById(Integer id);

    User getByUsername(String username);

    List<User> getAll();

    void update(User user);

    void delete(Integer id);
}
