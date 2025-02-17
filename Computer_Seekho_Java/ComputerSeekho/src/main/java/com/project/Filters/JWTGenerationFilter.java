package com.project.Filters;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import javax.crypto.SecretKey;

import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.Configuration.SecurityConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTGenerationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
			throws ServletException, IOException {
		
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication != null) {
			SecretKey secretKey = Keys.hmacShaKeyFor(SecurityConstants.SECRET_KEY.getBytes(StandardCharsets.UTF_8));
			String jwtToken = Jwts.builder().setIssuer("Computer_Seekho").setSubject("JWT_AUTH_TOKEN")
					.claim("username", authentication.getName()).claim("authorities", populateAuthorities(authentication.getAuthorities()))
					.setIssuedAt(new Date())
					.setExpiration(new Date(new Date().getTime()+3000000))
					.signWith(secretKey).compact();
			
			response.setHeader(SecurityConstants.JWT_HEADER, jwtToken);
		}
		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
		return !request.getServletPath().equals("/auth/signIn");
	}
	
	private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
		List<String> authorityList = new ArrayList<>();
		for(GrantedAuthority authority: authorities) {
			authorityList.add(authority.getAuthority());
		}
		return String.join(",",authorityList);
	}

}
