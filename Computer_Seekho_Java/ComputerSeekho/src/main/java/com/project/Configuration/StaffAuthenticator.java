package com.project.Configuration;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.*;

import com.project.Entities.Staff;
import com.project.Services.StaffService;

@Component
public class StaffAuthenticator implements AuthenticationProvider {

	private static final Logger logger = LoggerFactory.getLogger(StaffAuthenticator.class);

	@Autowired
	StaffService staffService;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();

		List<SimpleGrantedAuthority> authorities = new ArrayList<>();

		Staff staff = staffService.getStaffByUsername(username).get();

		if (staff != null) {
			if (passwordEncoder.matches(password, staff.getStaffPassword())) {
				authorities.add(new SimpleGrantedAuthority(staff.getStaffRole()));
			}
			else
			{
				throw new BadCredentialsException("Invalid Password");
			}
		} else {
			throw new BadCredentialsException("User not found with username: " + username);
		}
		logger.info(staff.getStaffName()+ " logged in on " + new Date() + " with username: " + username);
		return new UsernamePasswordAuthenticationToken(username, password, authorities);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
