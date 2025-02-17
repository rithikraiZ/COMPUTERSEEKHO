package com.project.Controllers;

import java.util.List;
import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

import com.project.Entities.Followup;
import com.project.Services.FollowupService;

// @RestController
// @RequestMapping("/api/followup")
public class FollowupController {
	
	// @Autowired
	public FollowupService followupService;
	
	@GetMapping("/all")
	public List<Followup> getAllFollowups(){
		return followupService.getAll();
	}
	
	@GetMapping("/getById/{followupId}")
	public ResponseEntity<Followup> getFollowupById(@PathVariable int followupId){
		Optional<Followup> foundFollowup = followupService.getFollowupById(followupId);
		
		if(foundFollowup.isPresent()) {
			return new ResponseEntity<>(foundFollowup.get(),HttpStatus.OK);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/add")
	public ResponseEntity<Followup> addFollowup(@RequestBody Followup followup){
		Followup followup1 = followupService.addFollowup(followup);
		return ResponseEntity.status(HttpStatus.CREATED).body(followup1);
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateFollowService(Followup followup){
		boolean isUpdated = followupService.updateFollowup(followup);
		if(isUpdated) {
			return new ResponseEntity<String>("Followup Updated",HttpStatus.OK);
		}
		return new ResponseEntity<String>("There was a problem updating the followup",HttpStatus.NOT_MODIFIED);
	}
	
	@DeleteMapping("/delete/{followupId}")
	public ResponseEntity<String> deleteFollowup(@PathVariable int followupId){
		followupService.deleteFollowUp(followupId);
		return ResponseEntity.ok().body("Followup Deleted");
	}
}
