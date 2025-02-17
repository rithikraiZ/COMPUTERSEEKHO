package com.project.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.DTO.PaymentReceiptDTO;
import com.project.Entities.*;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Modifying
    @Query  (value = """
            update student s set payment_due = payment_due-?1 where student_id = ?2 
            """, nativeQuery = true)
    void updatePaymentDue(double amount, int paymentId);

    @Query("SELECT new com.project.DTO.PaymentReceiptDTO(s.studentName, s.studentEmail, p.amount, p.paymentDate, pt.paymentTypeDesc) " +
    "FROM Payment p " +
    "JOIN p.student s " +
    "JOIN p.paymentType pt " +
    "WHERE p.paymentId = ?1")
    Optional<PaymentReceiptDTO> getPaymentDTO(int id);
}
