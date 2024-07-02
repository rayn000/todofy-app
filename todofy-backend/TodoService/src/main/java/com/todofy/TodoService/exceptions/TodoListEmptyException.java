package com.todofy.TodoService.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Todo List is Empty")
public class TodoListEmptyException extends Exception{
}
