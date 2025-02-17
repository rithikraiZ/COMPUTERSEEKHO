package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.Receipt;

public interface ReceiptService {
	Optional<Receipt> getReceiptById(int ReceiptId);
	List<Receipt> getAllReceipts();
	Receipt addReceipt(Receipt receipt);
	boolean updateReceipt(Receipt receipt);
	void deleteReceipt(int ReceiptId);
	
}
