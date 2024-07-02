package com.todofy.UserAuthentication.service;

import com.todofy.UserAuthentication.domain.User;
import com.todofy.UserAuthentication.exceptions.InvalidCredentialsException;
import com.todofy.UserAuthentication.exceptions.UserAlreadyExistException;
import com.todofy.UserAuthentication.exceptions.UserNotFoundException;
import com.todofy.UserAuthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) throws UserAlreadyExistException {
        if (userRepository.findById(user.getUserId()).isPresent()) {
            throw new UserAlreadyExistException();
        }
        return userRepository.save(user);
    }

    @Override
    public User userLogin(String userId, String password) throws InvalidCredentialsException {
        User fetchedUser = userRepository.findByUserIdAndPassword(userId, password);
        if (fetchedUser == null) {
            throw new InvalidCredentialsException();
        }
        return fetchedUser;
    }

    @Override
    public User updateUser(User user) throws UserNotFoundException {
        if (userRepository.findById(user.getUserId()).isEmpty()) {
            throw new UserNotFoundException();
        }
        return userRepository.save(user);
    }

    @Override
    public Boolean deleteUser(String userId) throws UserNotFoundException {
        if (userRepository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        }
        userRepository.deleteById(userId);
        return true;
    }
}
