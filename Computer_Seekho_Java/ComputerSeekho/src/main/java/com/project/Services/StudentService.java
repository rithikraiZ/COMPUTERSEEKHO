package com.project.Services;

import java.util.*;
import java.util.Optional;

import com.project.DTO.StudentResponseDTO;
import com.project.Entities.Student;

public interface StudentService {
	Optional<Student> getStudentById(int studentId);
	List<StudentResponseDTO> getAllStudents();
	Student addStudent(Student student, int enquiryId);
	boolean updateStudent(Student student);
	void deleteStudent(int studentId);
	List<Student> findbyCourse(int courseId);
	List<Student> findByBatch(int batchId);
}
