package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.DTO.PaymentReceiptDTO;
import com.project.Entities.Payment;

public interface PaymentService {
	Optional<Payment> getPaymentById(int paymentId);
    List<Payment> getAllPayment();
    Payment addPayment(Payment payment);
    boolean updatePayment(Payment payment);
    void deletePayment(int paymentId);
    Optional<PaymentReceiptDTO> getPaymentDTO(int paymentId);
}
