package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DTO.PaymentReceiptDTO;
import com.project.Entities.Payment;
import com.project.Repositories.PaymentRepository;

@Service
public class PaymentServiceimpl implements PaymentService{
	@Autowired
	PaymentRepository paymentRepository;

	@Override
	public Optional<Payment> getPaymentById(int paymentId) {
		
		return paymentRepository.findById(paymentId);
	}

	@Override
	public List<Payment> getAllPayment() {
		
		return  paymentRepository.findAll();
	}

	@Override
	public Payment addPayment(Payment payment) {
		Payment payment1= paymentRepository.save(payment);
		paymentRepository.updatePaymentDue(payment.getAmount(), payment.getStudent().getStudentId());
		return payment1;
	}

	@Override
	public boolean updatePayment(Payment payment) {
		Optional<Payment> foundPayment = paymentRepository.findById(payment.getPaymentId());
		if(foundPayment.isPresent()) {
			paymentRepository.save(payment);
			return true;
		}
		else return false;
	}

	@Override
	public void deletePayment(int paymentId) {
		paymentRepository.deleteById(paymentId);
		
	}

	@Override
	public Optional<PaymentReceiptDTO> getPaymentDTO(int paymentId) {
		return paymentRepository.getPaymentDTO(paymentId);	
	}
}
