package com.project.Controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Staff;
import com.project.Services.StaffService;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

	@Autowired
	private StaffService staffService;
	
	@GetMapping("/all")
	public List<Staff> getAllStaffMembers(){
		return staffService.getAllStaffMembers();
	}
	
	@GetMapping("/allTeaching")
	public List<Staff> getAllTeachingStaffs(){
		return staffService.getAllTeachingStaff();
	}
	
	@GetMapping("/getById/{staffId}")
	public  ResponseEntity<Staff> getStaffById(@PathVariable int staffId){
		Optional<Staff> staff = staffService.getStaffById(staffId);
		if (staff.isPresent())
			return new ResponseEntity<>(staff.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addStaff(@RequestBody Staff staff){
		staffService.addStaff(staff);
		return ResponseEntity.ok().body(new ResponseDTO("Staff Added", new Date()));
	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateAlbum(@RequestBody Staff staff) {
		boolean isUpdated = staffService.updateStaff(staff);
		if (isUpdated)
			return ResponseEntity.ok().body(new ResponseDTO("Staff Updated", new Date()));
		else
			return ResponseEntity.ok().body(new ResponseDTO("There was a problem updating the staff", new Date()));
	}
	
	@DeleteMapping("/delete/{staffId}")
	public ResponseEntity<ResponseDTO> deleteAlbum(@PathVariable int staffId) {
		staffService.deleteStaff(staffId);
		return ResponseEntity.ok().body(new ResponseDTO("Staff Deleted", new Date()));
	}
	
	@DeleteMapping("/deleteByUsername/{staffUsername}")
	public ResponseEntity<ResponseDTO> deleteByStaffUsername(@PathVariable String staffUsername) {
		staffService.deleteByStaffUsername(staffUsername);
		return ResponseEntity.ok().body(new ResponseDTO("Staff Deleted", new Date()));
	}

	@PutMapping("/updateUserNamePassword/{staffId}")
	public ResponseEntity<ResponseDTO> updateStaffUserNamePassword(@RequestBody Staff staff, @PathVariable int staffId) {
		boolean isUpdated = staffService.updateStaffUserNamePassword(staff.getStaffUsername(), staff.getStaffPassword(), staffId);
		if (isUpdated)
			return ResponseEntity.ok().body(new ResponseDTO("Staff Updated", new Date()));
		else
			return ResponseEntity.ok().body(new ResponseDTO("There was a problem updating the staff", new Date()));
	}
	
	@GetMapping("/getByUsername/{staffUsername}")
	public ResponseEntity<Staff> getStaffByUsername(@PathVariable String staffUsername){
		Optional<Staff> staff = staffService.getStaffByUsername(staffUsername);
		if (staff.isPresent())
			return new ResponseEntity<>(staff.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping("/getIdByName/{staffUsername}")
	public ResponseEntity<ResponseDTO> getStaffIdByStaffUsername(@PathVariable String staffUsername){
		int id = staffService.getStaffIdByStaffUsername(staffUsername);
		return ResponseEntity.ok(new ResponseDTO(new Integer(id).toString(id), new Date()));
	}
}
