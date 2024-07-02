package com.todofy.TodoService.repository;

import com.todofy.TodoService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository<User, String> {
}
