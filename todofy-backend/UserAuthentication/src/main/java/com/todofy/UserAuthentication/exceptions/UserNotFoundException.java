package com.todofy.UserAuthentication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT,reason = "Used Doesn't Exist in DataBase")
public class UserNotFoundException extends Exception{
}
