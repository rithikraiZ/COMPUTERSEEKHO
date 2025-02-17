package com.project.Controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.DTO.ResponseDTO;
import com.project.Entities.GetInTouch;
import com.project.Services.GetInTouchService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/getInTouch")
public class GetInTouchController{
    
    @Autowired
    private GetInTouchService getInTouchService;

    @GetMapping("/all")
    public ResponseEntity<List<GetInTouch>> getAllGetInTouch(){
        return ResponseEntity.ok(getInTouchService.getAllGetInTouch());
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addTemporaryEnquiry(@RequestBody GetInTouch getInTouch) {
        getInTouchService.addGetInTouch(getInTouch);
        return ResponseEntity.ok(new ResponseDTO("GetInTouch added successfully", new Date()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteGetinTouch(@PathVariable int id){
        getInTouchService.deleteGetInTouch(id);
        return ResponseEntity.ok(new ResponseDTO("temporary enquiry deleted", new Date()));
    }
    
}
