package com.project.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.PaymentType;
import com.project.Services.PaymentTypeService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/paymentType")
public class PaymentTypeController {

    @Autowired
    private PaymentTypeService paymentTypeService;


    @GetMapping("/all")
    public ResponseEntity<List<PaymentType>> getAllPayments() {
        return ResponseEntity.ok(paymentTypeService.getAllPaymentTypes());
    }
    
    @GetMapping("/getById/{id}")
    public ResponseEntity<PaymentType> getPaymentById(@PathVariable int id) {
        Optional<PaymentType> paymentType = paymentTypeService.getPaymentById(id);
        if (paymentType.isPresent()) {
            return ResponseEntity.ok(paymentType.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addPayment(@RequestBody PaymentType payment) {
        paymentTypeService.addPaymentType(payment);
        return ResponseEntity.ok(new ResponseDTO("Payment Type added successfully", new Date()));
    }
}
