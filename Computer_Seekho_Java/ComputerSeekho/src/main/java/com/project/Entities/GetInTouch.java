package com.project.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Table(name = "get_in_touch")
@Data
public class GetInTouch {
    @Id
    @Column(name = "get_in_touch_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int GetInTouchId;

    @Column(name = "enquirer_name")
    private String enquirerName;

    @Column(name = "enquirer_email")
    @Email(message = "Invalid Email Address")
    private String enquirerEmail;

    @Column(name = "enquirer_phone")
    @Pattern(regexp = "\\d{10}", message = "Invalid Phone Number")
    private String enquirerPhone;

    @Column(name = "enquiry_message")
    private String enquiryMessage;

    @Column(name = "course_name")
    private String courseName;

    public int getGetInTouchId() {
        return GetInTouchId;
    }

    public void setGetInTouchId(int getInTouchId) {
        GetInTouchId = getInTouchId;
    }

    public String getEnquirerName() {
        return enquirerName;
    }

    public void setEnquirerName(String enquirerName) {
        this.enquirerName = enquirerName;
    }

    public String getEnquirerEmail() {
        return enquirerEmail;
    }

    public void setEnquirerEmail(String enquirerEmail) {
        this.enquirerEmail = enquirerEmail;
    }

    public String getEnquirerPhone() {
        return enquirerPhone;
    }

    public void setEnquirerPhone(String enquirerPhone) {
        this.enquirerPhone = enquirerPhone;
    }

    public String getEnquiryMessage() {
        return enquiryMessage;
    }

    public void setEnquiryMessage(String enquiryMessage) {
        this.enquiryMessage = enquiryMessage;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
