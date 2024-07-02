package com.todofy.TodoService.service;

import com.todofy.TodoService.domain.Todo;
import com.todofy.TodoService.domain.User;
import com.todofy.TodoService.exceptions.TodoListEmptyException;
import com.todofy.TodoService.exceptions.TodoNotFoundException;
import com.todofy.TodoService.exceptions.UserAlreadyExistsException;
import com.todofy.TodoService.exceptions.UserNotFoundException;
import com.todofy.TodoService.proxy.RegisterProxy;
import com.todofy.TodoService.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;
    private RegisterProxy registerProxy;

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository, RegisterProxy registerProxy) {
        this.todoRepository = todoRepository;
        this.registerProxy = registerProxy;
    }

    /****************
     ***** USER *****
     ****************/

    // To register a new User //
    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        if (todoRepository.findById(user.getUserId()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        User savedUser = todoRepository.save(user);
        if (!savedUser.getUserId().isEmpty() && !savedUser.getPassword().isEmpty()) {
            registerProxy.registerUserInUserAuth(user);
        }
        return savedUser;
    }

    // To fetch the user //
    @Override
    public Optional<User> fetchUser(String userId) throws Exception {
        Optional<User> fetchedUser = todoRepository.findById(userId);
        if (fetchedUser == null) {
            throw new Exception();
        }
        return fetchedUser;
    }

    // To update user details //
    @Override
    public User updateUser(User user, String userId) throws UserNotFoundException {
        User initialUserInfo = todoRepository.findById(userId).get();
        if (initialUserInfo == null) {
            throw new UserNotFoundException();
        }

        if (user.getPassword() != "") {
            initialUserInfo.setPassword(user.getPassword());
        }
        if (user.getEmail() != "") {
            initialUserInfo.setEmail(user.getEmail());
        }
        if (user.getFirstName() != "") {
            initialUserInfo.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != "") {
            initialUserInfo.setLastName(user.getLastName());
        }

        // To update user information in UserAuthentication service
        if (!initialUserInfo.getUserId().isEmpty()) {
            registerProxy.updateUserInUserAuth(user);
        }

        return todoRepository.save(initialUserInfo);
    }

    // To delete a user //
    @Override
    public boolean deleteUser(String userId) throws UserNotFoundException {
        if (todoRepository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        }
        // To delete user in UserAuthentication service
        registerProxy.deleteUserInUserAuth(userId);

        todoRepository.deleteById(userId);
        return true;
    }

    /*****************
     ***** TODOS *****
     *****************/

    // To create a todo //
    @Override
    public User createTodo(Todo todo, String userId) throws UserNotFoundException {
        if (todoRepository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        }
        User user = todoRepository.findById(userId).get();
        if (user.getTodoList() == null) {
            user.setTodoList(Arrays.asList(todo));
        } else {
            List<Todo> todoList = user.getTodoList();
            todoList.add(todo);
            user.setTodoList(todoList);
        }
        return todoRepository.save(user);
    }

    // To fetch all todos of the user //
    @Override
    public List<Todo> fetchAllTodos(String userId) throws UserNotFoundException, TodoListEmptyException {
        User fetchedUser = todoRepository.findById(userId).get();
        if (todoRepository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        } else {
            List<Todo> todoList = fetchedUser.getTodoList();
            if (todoList == null) {
                throw new TodoListEmptyException();
            } else {
                return todoList;
            }
        }
    }

    // To fetch only one todo of the user //
    @Override
    public Todo fetchTodoById(String userId, String todoId) throws UserNotFoundException, TodoListEmptyException, TodoNotFoundException {
        Todo fetchedTodo = null;
        User fetchedUser = todoRepository.findById(userId).get();
        if (todoRepository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        } else {
            List<Todo> todoList = fetchedUser.getTodoList();
            if (todoList == null) {
                throw new TodoListEmptyException();
            } else {
                boolean todoFound = false;
                for (Todo todo : todoList) {
                    if (todo.getTodoId().equals(todoId)) {
                        todoFound = true;
                        fetchedTodo = todo;
                        break;
                    }
                }
                if (!todoFound) {
                    throw new TodoNotFoundException();
                }
            }
        }
        return fetchedTodo;
    }

    // To update a todo //
    @Override
    public List<Todo> updateTodo(String userId, Todo todoFromUser) throws UserNotFoundException, TodoListEmptyException, TodoNotFoundException {
        Todo modifyTodo = null;

        User fetchedUser = todoRepository.findById(userId).get();
        if (fetchedUser == null) {
            throw new UserNotFoundException();
        }
        List<Todo> todoList = fetchedUser.getTodoList();
        if (todoList == null) {
            throw new TodoListEmptyException();
        }
        boolean todoFound = false;
        for (Todo todo : todoList) {
            if (todo.getTodoId().startsWith(todoFromUser.getTodoId())) {
                todoFound = true;
                modifyTodo = todo;

                break;
            }
        }

        if (!todoFound) {
            throw new TodoNotFoundException();
        }

        if (todoFromUser.getTodoContent() != "") {
            modifyTodo.setTodoContent(todoFromUser.getTodoContent());
        }
        if (todoFromUser.getPriority() != "") {
            modifyTodo.setPriority(todoFromUser.getPriority());
        }
        if (todoFromUser.getCategory() != "") {
            modifyTodo.setCategory(todoFromUser.getCategory());
        }
        if (todoFromUser.getDueDate() != "") {
            modifyTodo.setDueDate(todoFromUser.getDueDate());
        }
        modifyTodo.setCompleted(todoFromUser.isCompleted());
        modifyTodo.setArchive(todoFromUser.isArchive());

        todoRepository.save(fetchedUser);
        return todoList;

    }

    // To delete delete a todo //
    @Override
    public User deleteTodo(String userId, String todoId) throws UserNotFoundException, TodoListEmptyException, TodoNotFoundException {
        User fetcheduser = todoRepository.findById(userId).get();
        if (fetcheduser == null) {
            throw new UserNotFoundException();
        }
        List<Todo> todoList = fetcheduser.getTodoList();
        if (todoList == null) {
            throw new TodoListEmptyException();
        }
        boolean todoRemoved = false;
        for (Todo todo : todoList) {
            if (todo.getTodoId().startsWith(todoId)) {
                todoList.remove(todo);
                todoRemoved = true;
                break;
            }
        }
        if (!todoRemoved) {
            throw new TodoNotFoundException();
        } else {
            fetcheduser.setTodoList(todoList);
        }
        return todoRepository.save(fetcheduser);
    }
}
