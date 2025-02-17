package com.project.Filters;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.Configuration.SecurityConstants;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTValidationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
			throws ServletException, IOException {

		String jwtToken = request.getHeader(SecurityConstants.JWT_HEADER);
		if (jwtToken != null) {
			try {
				jwtToken = jwtToken.substring(7);
				SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.SECRET_KEY.getBytes(StandardCharsets.UTF_8));
				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();

				String userName = String.valueOf(claims.get("username"));
				String authorities = (String) claims.get("authorities");

				Authentication authentication = new UsernamePasswordAuthenticationToken(userName, null,
						AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} catch (Exception e) {
				throw new BadCredentialsException("JWT TOKEN INVALID");
			}
		}
		filterChain.doFilter(request, response);
	}
	
	@Override
	protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
		return request.getServletPath().equals("/auth/signIn");
	}

}
