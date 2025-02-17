package com.project.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DTO.StudentResponseDTO;
import com.project.Entities.*;
import com.project.Repositories.*;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private ClosureReasonService closureReasonService;

	@Autowired
	private EnquiryRepository enquiryRepository;

	@Override
	public Optional<Student> getStudentById(int studentId) {
		return studentRepository.findById(studentId);
	}

	@Override
	public List<StudentResponseDTO> getAllStudents() {
		return studentRepository.findAll().stream()
				.map(student -> new StudentResponseDTO(student.getStudentId(), student.getPhotoUrl(),
						student.getStudentName(), student.getStudentEmail(), student.getStudentMobile(),
						student.getCourse().getCourseName(), student.getBatch().getBatchName(),student.getPaymentDue()))
				.collect(Collectors.toList());
	}

	@Override
	public Student addStudent(Student student, int enquiryId) {
    	Student student2 = studentRepository.save(student);
		studentRepository.updatePaymentDue(student2.getStudentId());
		closureReasonService.addClosureReason(new ClosureReason(student2.getStudentName(),"Student Admitted to the institute"));
		enquiryRepository.deactivateEnquiry(enquiryId);
		return student2;
	}

	@Override
	public boolean updateStudent(Student student) {
		Optional<Student> foundStudent = studentRepository.findById(student.getStudentId());
		if (foundStudent.isPresent()) {
			studentRepository.save(student);
			return true;
		} else
			return false;
	}

	@Override
	public void deleteStudent(int studentId) {
		studentRepository.deleteById(studentId);
	}

	@Override
	public List<Student> findbyCourse(int courseId) {
		return studentRepository.findbyCourse(courseId);
	}

	@Override
	public List<Student> findByBatch(int batchId) {
		return studentRepository.findByBatch(batchId);
	}
}
