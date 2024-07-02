package com.todofy.UserAuthentication.controller;

import com.todofy.UserAuthentication.domain.User;
import com.todofy.UserAuthentication.exceptions.InvalidCredentialsException;
import com.todofy.UserAuthentication.exceptions.UserAlreadyExistException;
import com.todofy.UserAuthentication.exceptions.UserNotFoundException;
import com.todofy.UserAuthentication.security.GenerateJwtToken;
import com.todofy.UserAuthentication.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/authapi")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private UserService userService;
    private GenerateJwtToken generateJwtToken;
    private ResponseEntity responseEntity;

    @Autowired
    public UserController(UserService userService, GenerateJwtToken generateJwtToken) {
        this.userService = userService;
        this.generateJwtToken = generateJwtToken;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) throws UserAlreadyExistException {
        try {
            userService.register(user);
            responseEntity = new ResponseEntity(user, HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            throw new UserAlreadyExistException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) throws InvalidCredentialsException {
        Map<String, Object> loginResult = new HashMap<>();
        try {
            User retrievedUser = userService.userLogin(user.getUserId(), user.getPassword());
            if (retrievedUser == null) {
                throw new InvalidCredentialsException();
            }
            String token = generateJwtToken.createToken(user);
            loginResult.put("message", "User sign in successful");
            loginResult.put("token", token);
            responseEntity = new ResponseEntity(loginResult, HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PutMapping("/update-user")
    public ResponseEntity updateUser(@RequestBody User user) throws UserNotFoundException {
        try {
            responseEntity = new ResponseEntity(userService.updateUser(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity deleteUser(@PathVariable String userId) throws UserNotFoundException {
        try {
            responseEntity = new ResponseEntity(userService.deleteUser(userId), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

}
