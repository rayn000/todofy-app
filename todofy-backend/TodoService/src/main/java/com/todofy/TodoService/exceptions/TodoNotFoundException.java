package com.todofy.TodoService.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Use the@ResponseStatus annotation to set the exception message and status
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Todo does not exist")
public class TodoNotFoundException extends Exception {
}
