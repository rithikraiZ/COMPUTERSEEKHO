package com.project.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Services.MailSender;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private MailSender mailSender;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, Object> body) {

        try {
            String to = (String) body.get("to");
            String studentName = (String) body.get("studentName");
            mailSender.sendMail(to, studentName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Problem sending the email");
        }
        return ResponseEntity.ok("Email sent successfully");
    }

    @PostMapping("/emailpayment")
	public ResponseEntity<String> sendEmailPayment(@RequestBody Map<String, Object> emailRequest) {
		try {
			mailSender.sendReceiptEmail(emailRequest);
            System.out.println("Mail receipt send");
			return ResponseEntity.status(HttpStatus.OK).body("Email sent successfully");
		} 
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
		}
	}

}
