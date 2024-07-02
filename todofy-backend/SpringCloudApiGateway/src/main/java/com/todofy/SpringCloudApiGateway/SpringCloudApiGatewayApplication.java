package com.todofy.SpringCloudApiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SpringCloudApiGatewayApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudApiGatewayApplication.class, args);
	}
}
