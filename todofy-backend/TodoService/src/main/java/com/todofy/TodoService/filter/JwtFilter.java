package com.todofy.TodoService.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class JwtFilter extends GenericFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Parse and validate the token and set the user id from claims in the request header as an attribute.
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            throw new ServletException("Missing or Invalid Token");
        } else {
            String token = authHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey("hsuyajarus").parseClaimsJws(token).getBody();
            request.setAttribute("claims", claims);
            filterChain.doFilter(request, response);
        }
    }
}
