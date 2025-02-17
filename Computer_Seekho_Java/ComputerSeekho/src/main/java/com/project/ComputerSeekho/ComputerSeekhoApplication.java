package com.project.ComputerSeekho;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.project.*")
@EnableJpaRepositories(basePackages="com.project.*")
@ComponentScan(basePackages="com.project.*")
public class ComputerSeekhoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComputerSeekhoApplication.class, args);
	}
	
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/auth/signIn").allowedOrigins("http://localhost:5173");
//			}
//		};
//	}
}
