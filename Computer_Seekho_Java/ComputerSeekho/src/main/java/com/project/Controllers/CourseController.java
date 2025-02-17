package com.project.Controllers;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Course;
import com.project.Services.CourseService;

@RestController
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/getById/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Optional<Course> course = courseService.getCourseById(id);
        return ResponseEntity.status(HttpStatus.OK).body(course.get());
    }

    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Course Added", new Date()));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateCourse(@RequestBody Course course) {
        boolean isUpdated = courseService.updateCourse(course);
        if (isUpdated)
            return new ResponseEntity<>(new ResponseDTO(" Details Updated", new Date()), HttpStatus.OK);
        else
            return new ResponseEntity<>(new ResponseDTO(" Not Found", new Date()), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<ResponseDTO> deleteCourse(@PathVariable int courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.ok().body(new ResponseDTO("Course Deleted", new Date()));
    }

    @GetMapping("/name/{courseName}")
    public ResponseEntity<Course> getCourseByName(@PathVariable String courseName) {
        Optional<Course> course = courseService.findByCourseName(courseName);
        if (course.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(course.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
