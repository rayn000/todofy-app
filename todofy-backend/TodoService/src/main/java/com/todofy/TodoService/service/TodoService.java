package com.todofy.TodoService.service;

import com.todofy.TodoService.domain.Todo;
import com.todofy.TodoService.domain.User;
import com.todofy.TodoService.exceptions.TodoListEmptyException;
import com.todofy.TodoService.exceptions.TodoNotFoundException;
import com.todofy.TodoService.exceptions.UserAlreadyExistsException;
import com.todofy.TodoService.exceptions.UserNotFoundException;

import java.util.List;
import java.util.Optional;

public interface TodoService {

    /*
     **** User *****
     */
    User registerUser(User user) throws UserAlreadyExistsException;

    Optional<User> fetchUser(String userId) throws Exception;

    User updateUser(User user, String userId) throws UserNotFoundException, UserAlreadyExistsException;

    boolean deleteUser(String userId) throws UserNotFoundException;

    /*
     **** Todos *****
     */
    User createTodo(Todo todo, String userId) throws UserNotFoundException;

    List<Todo> fetchAllTodos(String userId) throws Exception;

    Todo fetchTodoById(String userId, String todoId) throws UserNotFoundException, TodoNotFoundException, TodoListEmptyException;

    List<Todo> updateTodo(String userId, Todo todofromuser) throws UserNotFoundException, TodoNotFoundException, TodoListEmptyException;

    User deleteTodo(String userId, String todoId) throws UserNotFoundException, TodoListEmptyException, TodoNotFoundException;
}
