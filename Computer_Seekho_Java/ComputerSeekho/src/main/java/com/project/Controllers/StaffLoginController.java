package com.project.Controllers;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.DTO.ResponseDTO;

@RestController
@RequestMapping("/auth")
public class StaffLoginController {
	@PostMapping("/signIn")
	ResponseEntity<ResponseDTO> signIn(){
		return ResponseEntity.ok(new ResponseDTO("Logged In Successfully", new Date()));
	}
}
