package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Receipt;
import com.project.Repositories.ReceiptRepository;

@Service
public class ReceiptServiceImpl implements ReceiptService  {

	@Autowired
	private ReceiptRepository receiptRepository;
	
	@Override
	public Optional<Receipt> getReceiptById(int receiptId) {
		return receiptRepository.findById(receiptId);
	}

	@Override
	public List<Receipt> getAllReceipts() {
		return receiptRepository.findAll();
	}

	@Override
	public Receipt addReceipt(Receipt receipt) {
		return receiptRepository.save(receipt);
	}

	@Override
	public boolean updateReceipt(Receipt receipt) {
		Optional<Receipt> foundReceipt = receiptRepository.findById(receipt.getReceiptId());
		if(foundReceipt.isPresent()) {
			receiptRepository.save(receipt);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteReceipt(int receiptId) {
			receiptRepository.deleteById(receiptId);
	}
}
