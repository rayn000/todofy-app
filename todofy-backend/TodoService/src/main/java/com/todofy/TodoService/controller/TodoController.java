package com.todofy.TodoService.controller;

import com.todofy.TodoService.domain.Todo;
import com.todofy.TodoService.domain.User;
import com.todofy.TodoService.exceptions.TodoNotFoundException;
import com.todofy.TodoService.exceptions.UserAlreadyExistsException;
import com.todofy.TodoService.exceptions.UserNotFoundException;
import com.todofy.TodoService.service.TodoService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todoapi")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    private TodoService todoService;
    private ResponseEntity responseEntity;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /****************
     ***** USER *****
     ****************/

    // To register a new User //
    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            User user1 = todoService.registerUser(user);
            responseEntity = new ResponseEntity(user1, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            throw new UserAlreadyExistsException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To fetch the user //
    @GetMapping("/user/fetch-user")
    public ResponseEntity fetchUser(HttpServletRequest request) {
        try {
            Optional<User> user1 = todoService.fetchUser(getUserIdFromClaims(request));
            responseEntity = new ResponseEntity(user1, HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To update user details //
    @PutMapping("/user/update")
    public ResponseEntity updateUser(@RequestBody User user, HttpServletRequest request) throws UserNotFoundException {
        try {
            User user1 = todoService.updateUser(user, getUserIdFromClaims(request));
            responseEntity = new ResponseEntity(user1, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To delete a user //
    @DeleteMapping("/user/delete")
    public ResponseEntity deleteUser(HttpServletRequest request) throws UserNotFoundException {
        try {
            boolean flag = todoService.deleteUser(getUserIdFromClaims(request));
            responseEntity = new ResponseEntity(flag, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    /*****************
     ***** TODOS *****
     *****************/

    // To create a todo //
    @PostMapping("/user/add-todo")
    public ResponseEntity addTodo(@RequestBody Todo todo, HttpServletRequest request) throws UserNotFoundException {
        try {
            User todo1 = todoService.createTodo(todo, getUserIdFromClaims(request));
            responseEntity = new ResponseEntity<>(todo1, HttpStatus.CREATED);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To fetch all todos of the user //
    @GetMapping("user/fetch-todos")
    public ResponseEntity<?> fetchAllTodos(HttpServletRequest request) throws UserNotFoundException {
        try {
            List<Todo> todoList = todoService.fetchAllTodos(getUserIdFromClaims(request));
            responseEntity = new ResponseEntity(todoList, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To fetch only one todo of the user //
    @GetMapping("user/fetch-todo/{todoId}")
    public ResponseEntity<?> fetchTodoById(HttpServletRequest request, @PathVariable String todoId) throws TodoNotFoundException {
        try {
            Todo todo = todoService.fetchTodoById(getUserIdFromClaims(request), todoId);
            responseEntity = new ResponseEntity(todo, HttpStatus.OK);
        } catch (TodoNotFoundException e) {
            throw new TodoNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To update a todo //
    @PutMapping("/user/update-todo")
    public ResponseEntity updateTodo(@RequestBody Todo todo, HttpServletRequest request) throws TodoNotFoundException {
        try {
            responseEntity = new ResponseEntity<>(todoService.updateTodo(getUserIdFromClaims(request), todo), HttpStatus.OK);
        } catch (TodoNotFoundException e) {
            throw new TodoNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // To delete delete a todo //
    @DeleteMapping("user/delete-todo/{todoId}")
    public ResponseEntity<?> deleteOneTodo(HttpServletRequest request, @PathVariable String todoId) throws TodoNotFoundException {
        try {
            User todo = todoService.deleteTodo(getUserIdFromClaims(request), todoId);
            responseEntity = new ResponseEntity(todo, HttpStatus.OK);
        } catch (TodoNotFoundException e) {
            throw new TodoNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // method for Claims //
    private String getUserIdFromClaims(HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        String userId = claims.getSubject();
        return userId;
    }

}
