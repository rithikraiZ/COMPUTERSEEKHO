package com.project.Controllers;

import java.util.Optional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.project.DTO.PaymentReceiptDTO;
import com.project.DTO.ResponseDTO;
import com.project.Entities.Payment;
import com.project.Services.PaymentService;
import com.project.Services.StudentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

	@Autowired
	private StudentService studentService;

	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("/getById/{paymentId}")
	public ResponseEntity<Payment> getPaymentById(@PathVariable int paymentId) {
		Optional<Payment> payment = paymentService.getPaymentById(paymentId);
		if (payment.isPresent())
			return new ResponseEntity<>(payment.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping("/all")
	public List<Payment> getAllPayment() {
		return paymentService.getAllPayment();
	}

	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addPayment(@RequestBody Payment payment) {
		int studentId = payment.getStudent().getStudentId();
		double balanceFees = studentService.getStudentById(studentId).get().getPaymentDue();
		if(balanceFees - payment.getAmount() < 0){
			return new ResponseEntity<>(new ResponseDTO("Invalid payment amount"), HttpStatus.NOT_ACCEPTABLE);
		}
		
		Payment payment1 = paymentService.addPayment(payment);
		Optional<PaymentReceiptDTO> paymentReceiptDTO = paymentService.getPaymentDTO(payment1.getPaymentId());

		Map<String, Object> transferObject = new HashMap<>();
		if (paymentReceiptDTO.isPresent()) {
			PaymentReceiptDTO prdto = paymentReceiptDTO.get();

			System.out.println(prdto.getStudentEmail());
			transferObject.put("email", prdto.getStudentEmail());
			transferObject.put("amount", String.valueOf(prdto.getAmount()));
			transferObject.put("date", prdto.getPaymentDate().toString());
			transferObject.put("Type", prdto.getPaymentTypeDesc());
			transferObject.put("studentName", prdto.getStudentName());
			transferObject.put("paymentId", String.valueOf(payment1.getPaymentId()));
		}
		try {
			restTemplate.postForObject("http://localhost:8090/api/email/emailpayment", transferObject, String.class);

		} catch (Exception e) {
			System.err.println("An error occurred while sending the email: " + e.getMessage());
		}
		if (paymentReceiptDTO != null) {
			return new ResponseEntity<>(new ResponseDTO("Payment receipt is being sent..."),
					HttpStatus.CREATED);
		}
		return ResponseEntity.internalServerError().body(new ResponseDTO("There was a problem in the payment process"));
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updatePayment(@RequestBody Payment payment) {
		boolean isUpdated = paymentService.updatePayment(payment);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO(" Details Updated", new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO(" Not Found", new Date()), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{paymentId}")
	public ResponseEntity<ResponseDTO> deletePayment(@PathVariable int paymentId) {
		paymentService.deletePayment(paymentId);
		return new ResponseEntity<>(new ResponseDTO("Payment Details Deleted", new Date()), HttpStatus.OK);
	}
}
