package com.todofy.UserAuthentication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT,reason = "User Already Exist In The Database")
public class UserAlreadyExistException extends Exception{
}
