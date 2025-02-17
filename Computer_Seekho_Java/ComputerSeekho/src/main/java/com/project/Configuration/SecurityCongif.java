package com.project.Configuration;

import java.util.Collections;

import org.springframework.context.annotation.*;
import org.springframework.lang.NonNull;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.project.Filters.JWTGenerationFilter;
import com.project.Filters.JWTValidationFilter;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityCongif {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception{
		security.csrf(csrf->csrf.disable());
		security.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.NEVER));
		
		security.addFilterAfter(new JWTGenerationFilter(), BasicAuthenticationFilter.class);
		security.addFilterBefore(new JWTValidationFilter(), BasicAuthenticationFilter.class);
		
		security.authorizeHttpRequests(auth->auth.requestMatchers("/staff/signIn").authenticated()
				// .requestMatchers("/staff/all").hasAnyRole("NON_TEACHING","TEACHING")
		.requestMatchers("/**").permitAll());
		security.formLogin(Customizer.withDefaults());
		security.httpBasic(Customizer.withDefaults());
		
		security.cors(csrf->csrf.configurationSource(new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(@NonNull HttpServletRequest request) {
				CorsConfiguration config = new CorsConfiguration();
				config.setAllowedOriginPatterns(Collections.singletonList("*"));
				config.setAllowedMethods(Collections.singletonList("*"));
				config.setAllowedHeaders(Collections.singletonList("*"));
				config.setAllowCredentials(true);
				config.setExposedHeaders(Collections.singletonList("Authorization"));
				config.setMaxAge(3600L);
				return config;
			}
		}));
		return security.build();
	}
	
	
	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
}
