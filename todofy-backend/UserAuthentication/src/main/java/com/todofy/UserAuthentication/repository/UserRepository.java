package com.todofy.UserAuthentication.repository;

import com.todofy.UserAuthentication.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    public User findByUserIdAndPassword(String userId, String password);
}
