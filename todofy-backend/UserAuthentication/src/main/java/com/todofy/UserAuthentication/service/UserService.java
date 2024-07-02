package com.todofy.UserAuthentication.service;

import com.todofy.UserAuthentication.domain.User;
import com.todofy.UserAuthentication.exceptions.InvalidCredentialsException;
import com.todofy.UserAuthentication.exceptions.UserAlreadyExistException;
import com.todofy.UserAuthentication.exceptions.UserNotFoundException;

public interface UserService {

    User register(User user) throws UserAlreadyExistException;

    User userLogin(String userId, String password) throws InvalidCredentialsException;

    User updateUser(User user) throws UserNotFoundException;

    Boolean deleteUser(String userId) throws UserNotFoundException;
}
