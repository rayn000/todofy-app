package com.todofy.TodoService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {

    @Id
    private String userId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String dateUserRegistered;
    private List<Todo> todoList;

    public User() {
    }

    public User(String userId, String email, String password, String firstName, String lastName, String dateUserRegistered, List<Todo> todoList) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateUserRegistered = dateUserRegistered;
        this.todoList = todoList;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateUserRegistered() {
        return dateUserRegistered;
    }

    public void setDateUserRegistered(String dateUserRegistered) {
        this.dateUserRegistered = dateUserRegistered;
    }

    public List<Todo> getTodoList() {
        return todoList;
    }

    public void setTodoList(List<Todo> todoList) {
        this.todoList = todoList;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", LastName='" + lastName + '\'' +
                ", dateUserRegistered='" + dateUserRegistered + '\'' +
                ", todoList=" + todoList +
                '}';
    }
}
