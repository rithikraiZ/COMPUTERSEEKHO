package com.project.Controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.project.Services.StudentService;
import com.project.DTO.ResponseDTO;
import com.project.DTO.StudentResponseDTO;
import com.project.Entities.Student;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/getById/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable int studentId) {
        Optional<Student> student = studentService.getStudentById(studentId);
        if (student.isPresent())
			return new ResponseEntity<>(student.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public List<StudentResponseDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping(value = "/add/{enquiryId}")
    public ResponseEntity<ResponseDTO> addStudent(@RequestBody Student student, @PathVariable int enquiryId) {
        Student student1 = studentService.addStudent(student, enquiryId);
        Map<String, Object> email = new HashMap<>();
        email.put("to", student1.getStudentEmail());
        email.put("studentName", student1.getStudentName());

        try {
            restTemplate.postForObject("http://localhost:8090/api/email/send", email, String.class);
        } catch (Exception e) {
            System.out.println("Problem sending the email");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Student Added",new Date()));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateStudent(@RequestBody Student student) {
        boolean isUpdated = studentService.updateStudent(student);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Student Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Student Not Found",new Date()), HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<ResponseDTO> deleteStudent(@PathVariable int studentId){
    	studentService.deleteStudent(studentId);
    	return ResponseEntity.ok().body(new ResponseDTO("Student Deleted",new Date()));
    }
    
    @GetMapping("/byCourseId/{courseId}")
    public ResponseEntity<List<Student>> findbyCourse(@PathVariable int courseId){
    	List<Student> students = studentService.findbyCourse(courseId);
    	if(students.isEmpty())
    		return ResponseEntity.notFound().build();
    	else
    		return ResponseEntity.ok().body(students);
    }

    @GetMapping("/byBatchId/{batchId}")
    public ResponseEntity<List<Student>> findByBatch(@PathVariable int batchId){
    	List<Student> students = studentService.findByBatch(batchId);
    	if(students.isEmpty())
    		return ResponseEntity.notFound().build();
    	else
    		return ResponseEntity.ok().body(students);
    }
}