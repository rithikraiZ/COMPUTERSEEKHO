package com.project.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Receipt;
import com.project.Services.ReceiptService;

@RestController
@RequestMapping("/api/receipt")
public class ReceiptController {
	
	@Autowired
	private ReceiptService receiptService;
	
	@GetMapping("/getById/{receiptId}")
	public ResponseEntity<Receipt> getReceiptById(@PathVariable int receiptId){
		Optional<Receipt> receipt = receiptService.getReceiptById(receiptId);
		if (receipt.isPresent())
			return new ResponseEntity<>(receipt.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/all")
	public List<Receipt> getAllReceipts(){
		return receiptService.getAllReceipts();
	}
	
	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addReceipt(@RequestBody Receipt recept){
		receiptService.addReceipt(recept);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Receipt Added",new Date()));
	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateService(@RequestBody Receipt receipt){
		boolean isUpdated = receiptService.updateReceipt(receipt);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Receipt Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Receipt Not Found",new Date()), HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{receiptId}")
	public ResponseEntity<ResponseDTO> deleteReceipt(@PathVariable int receiptId){
		receiptService.deleteReceipt(receiptId);
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO("Receipt Deleted", new Date()));
	}
}
