package com.todofy.TodoService.proxy;

import com.todofy.TodoService.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-authentication-service", url = "localhost:8084")
public interface RegisterProxy {
    @PostMapping("/authapi/register")
    public ResponseEntity registerUserInUserAuth(@RequestBody User user);

    @PutMapping("/authapi/update-user")
    public ResponseEntity updateUserInUserAuth(@RequestBody User user);

    @DeleteMapping("authapi/delete-user/{userId}")
    public ResponseEntity deleteUserInUserAuth(@PathVariable String userId);
}
