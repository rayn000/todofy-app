package com.todofy.UserAuthentication.security;

import com.todofy.UserAuthentication.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenGeneratorImpl implements GenerateJwtToken {

    @Override
    public String createToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        return generateToken(claims, user.getUserId());
    }

    public String generateToken(Map<String, Object> claims, String subject) {
        String jwtToken = Jwts.builder().setIssuer("Todofy")
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "hsuyajarus").compact();
        return jwtToken;
    }
}
