package com.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Receipt;

@Repository
@Transactional
public interface ReceiptRepository extends JpaRepository<Receipt, Integer>{
	
}
