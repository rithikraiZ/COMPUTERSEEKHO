package com.project.Entities;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "student")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
	private int studentId;
	
	@Column(name = "payment_due")
	private double paymentDue;

    @Column(name = "student_name", length = 30, nullable = false)
    private String studentName;

    @Column(name = "student_address", length = 60)
    private String studentAddress;

    @Column(name = "student_gender", length = 10)
    private String studentGender;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @Column(name = "student_dob")
    private LocalDate studentDob;

    @Column(name = "student_qualification", length = 20)
    private String studentQualification;

    @Column(name = "student_mobile")
	@Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String studentMobile;

	@Column(name = "student_email", length = 30, nullable = false)
	private String studentEmail;

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "batch_id")
    private Batch batch;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id")
    private Course course;

	public double getPaymentDue() {
		return paymentDue;
	}

	public void setPaymentDue(double paymentDue) {
		this.paymentDue = paymentDue;
	}
    
    // public int getStudentId() {
	// 	return studentId;
	// }

	// public void setStudentId(int studentId) {
	// 	this.studentId = studentId;
	// }

	// public String getStudentName() {
	// 	return studentName;
	// }

	// public void setStudentName(String studentName) {
	// 	this.studentName = studentName;
	// }

	// public String getStudentAddress() {
	// 	return studentAddress;
	// }

	// public void setStudentAddress(String studentAddress) {
	// 	this.studentAddress = studentAddress;
	// }

	// public String getStudentGender() {
	// 	return studentGender;
	// }

	// public void setStudentGender(String studentGender) {
	// 	this.studentGender = studentGender;
	// }

	// public String getPhotoUrl() {
	// 	return photoUrl;
	// }

	// public void setPhotoUrl(String photoUrl) {
	// 	this.photoUrl = photoUrl;
	// }

	// public LocalDate getStudentDob() {
	// 	return studentDob;
	// }

	// public void setStudentDob(LocalDate studentDob) {
	// 	this.studentDob = studentDob;
	// }

	// public String getStudentQualification() {
	// 	return studentQualification;
	// }

	// public void setStudentQualification(String studentQualification) {
	// 	this.studentQualification = studentQualification;
	// }

	// public String getStudentMobile() {
	// 	return studentMobile;
	// }

	// public void setStudentMobile(String studentMobile) {
	// 	this.studentMobile = studentMobile;
	// }

	// public Batch getBatch() {
	// 	return batch;
	// }

	// public void setBatch(Batch batch) {
	// 	this.batch = batch;
	// }

	// public Course getCourse() {
	// 	return course;
	// }

	// public void setCourse(Course course) {
	// 	this.course = course;
	// }

	// public String getStudentEmail() {
	// 	return studentEmail;
	// }

	// public void setStudentEmail(String studentEmail) {
	// 	this.studentEmail = studentEmail;
	// }

	// public int getCourseId() {
	// 	return course.getCourseId();
	// }

	// public int getBatchId() {
	// 	return batch.getBatchId();
	// }

	// public void setCourseId(int courseId) {
	// 	this.course.setCourseId(courseId);
	// }

	// public void setBatchId(int batchId) {
	// 	this.batch.setBatchId(batchId);
	// }
}