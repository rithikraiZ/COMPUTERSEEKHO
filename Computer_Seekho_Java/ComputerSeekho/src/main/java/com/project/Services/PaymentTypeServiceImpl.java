package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.PaymentType;
import com.project.Repositories.PaymentTypeRepository;

@Service
public class PaymentTypeServiceImpl implements PaymentTypeService {

    @Autowired
    private PaymentTypeRepository paymentTypeRepository;

    @Override
    public List<PaymentType> getAllPaymentTypes() {
        return paymentTypeRepository.findAll();
    }

    @Override
    public Optional<PaymentType> getPaymentById(Integer paymentId) {
        return paymentTypeRepository.findById(paymentId);
    }

    @Override
    public PaymentType addPaymentType(PaymentType paymentType) {
        return paymentTypeRepository.save(paymentType);
    }
}
