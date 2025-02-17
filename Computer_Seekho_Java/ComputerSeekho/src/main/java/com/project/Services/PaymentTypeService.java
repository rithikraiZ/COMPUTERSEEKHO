package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.PaymentType;

public interface PaymentTypeService {
    List<PaymentType> getAllPaymentTypes();
    Optional<PaymentType> getPaymentById(Integer id);
    PaymentType addPaymentType(PaymentType payment);

}
