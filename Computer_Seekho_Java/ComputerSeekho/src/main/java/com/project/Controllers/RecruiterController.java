package com.project.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Recruiter;
import com.project.Services.RecruiterService;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {
    
    @Autowired
    private RecruiterService recruiterService;
    
    @GetMapping("/all")
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        return ResponseEntity.ok().body(recruiterService.getAllRecruiters());
    }

    @GetMapping("/getById/{recruiterId}")
    public ResponseEntity<Recruiter> getRecruiterById(@PathVariable int recruiterId) {
        Optional<Recruiter> recruiter = recruiterService.getRecruiterById(recruiterId);
        if (recruiter.isPresent())
            return ResponseEntity.ok().body(recruiter.get());
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addRecruiter(Recruiter recruiter) {
        recruiterService.addRecruiter(recruiter);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Recruiter Added",new Date()));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRecruiter(Recruiter recruiter) {
        boolean isUpdated = recruiterService.updateRecruiter(recruiter);
        if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Recruiter Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Recruiter Not Found",new Date()), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{recruiterId}")
    public ResponseEntity<ResponseDTO> deleteRecruiter(int recruiterId) {
        recruiterService.deleteRecruiter(recruiterId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO("Recruiter Deleted", new Date()));
    }
    
}
