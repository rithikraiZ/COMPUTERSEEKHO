package com.project.DTO;

import java.time.LocalDate;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PaymentReceiptDTO {
    private String studentName;
    private String studentEmail;
    private double amount;
    private LocalDate paymentDate;
    private String paymentTypeDesc;

    public PaymentReceiptDTO(String studentName, String studentEmail, double amount, LocalDate paymentDate, String paymentTypeDesc) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentTypeDesc = paymentTypeDesc;
    }

    // public PaymentReceiptDTO(){}

    // Getters & Setters
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public double getAmount() { return amount; }
    public LocalDate getPaymentDate() { return paymentDate; }
    public String getPaymentTypeDesc() { return paymentTypeDesc;}

}
