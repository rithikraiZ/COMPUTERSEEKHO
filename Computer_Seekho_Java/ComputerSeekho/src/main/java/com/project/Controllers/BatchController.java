package com.project.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Batch;
import com.project.Services.BatchService;

@RestController
@RequestMapping("api/batch")
public class BatchController {
	
	@Autowired
	private BatchService batchService;
	
	@GetMapping("/getById/{batchId}")
	public ResponseEntity<Batch> getBatchById(@PathVariable int batchId){
		Optional<Batch> foundBatch = batchService.getBatchById(batchId);
		if(foundBatch.isPresent())
			return new ResponseEntity<>(foundBatch.get(),HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/all")
	public List<Batch> getAllBatches(){
		return batchService.getAllBatches();
	}
	
	@PostMapping(value = "/add", consumes = "application/json")
	public ResponseEntity<ResponseDTO> addBatch(@RequestBody Batch batch){
		batchService.addBatch(batch);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Batch Added",new Date()));

	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateBatch(@RequestBody Batch batch){
		boolean isUpdated = batchService.updateBatch(batch);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Batch Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Batch Not Found",new Date()), HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{batchId}")
	public ResponseEntity<ResponseDTO> deleteBatch(@PathVariable int batchId){
		batchService.deleteBatch(batchId);
		return ResponseEntity.ok().body(new ResponseDTO("Batch Deleted",new Date()));
	}
	
	@GetMapping("/getByName/{batchName}")
	public ResponseEntity<Batch> findByBatchName(@PathVariable String batchName){
		Optional<Batch> foundBatch = batchService.findByBatchName(batchName);
		if(foundBatch.isPresent())
			return new ResponseEntity<>(foundBatch.get(),HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@PutMapping("/activate/{batchIsActive}/{batchId}")
	public ResponseEntity<ResponseDTO> activateBatch(@PathVariable boolean batchIsActive, @PathVariable int batchId){
		batchService.activateBatch(batchIsActive, batchId);
		return ResponseEntity.ok().body(new ResponseDTO("Activation Toggled ",new Date()));
	}
}
