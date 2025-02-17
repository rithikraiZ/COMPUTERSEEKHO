package com.project.Controllers;

import java.util.Optional;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.DTO.ResponseDTO;
import com.project.Entities.ClosureReason;
import com.project.Services.ClosureReasonService;

@RestController
@RequestMapping("/api/closureReason")
public class ClosureReasonController {
	
	@Autowired
	private ClosureReasonService closureReasonService;
	
	@GetMapping("/getById/{closureReasonId}")
	public ResponseEntity<ClosureReason> getClosureReasonById(@PathVariable int closureReasonId){
		Optional<ClosureReason> closureReason = closureReasonService.getClosureReasonById(closureReasonId);
		if(closureReason.isPresent()) {
			return new ResponseEntity<>(closureReason.get(),HttpStatus.OK);
		}
		else return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<ClosureReason>> getAllClosureReasons(){
		List<ClosureReason> closureReasons = closureReasonService.getAllClosureReasons();
		return new ResponseEntity<>(closureReasons, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addClosureReason(@RequestBody ClosureReason closureReason){
		closureReasonService.addClosureReason(closureReason);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("ClosureReason Added",new Date()));
	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateClosureReason(@RequestBody ClosureReason closureReason){
		boolean isUpdated = closureReasonService.updateClosureReason(closureReason);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("ClosureReason Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("ClosureReason Not Found",new Date()), HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{closureReasonId}")
	public ResponseEntity<ResponseDTO> deleteClosureReason(@PathVariable int closureReasonId){
		closureReasonService.deleteClosureReason(closureReasonId);
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO("ClosureReason Deleted",new Date()));
	}
}

