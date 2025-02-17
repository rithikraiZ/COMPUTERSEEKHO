package com.project.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "recruiter")
@Data
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruiter_id")
    private int recruiterId;

    @Column(name = "recruiter_name")
    @NotBlank(message = "Recruiter Name is compulsory")
    private String recruiterName;

    @Column(name = "recruiter_location")
    @NotBlank(message = "Recruiter Location is compulsory")
    @Size(min = 3, max = 50, message = "Location must be in between 3 and 50 characters")
    private String recruiterLocation;

    @Column(name = "recruiter_photo")
    private String recruiterPhoto;

    public int getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(int recruiterId) {
        this.recruiterId = recruiterId;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public String getRecruiterLocation() {
        return recruiterLocation;
    }

    public void setRecruiterLocation(String recruiterLocation) {
        this.recruiterLocation = recruiterLocation;
    }
}
