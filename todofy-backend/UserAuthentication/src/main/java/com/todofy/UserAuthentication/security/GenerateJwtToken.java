package com.todofy.UserAuthentication.security;

import com.todofy.UserAuthentication.domain.User;

public interface GenerateJwtToken {
    String createToken(User user);
}
