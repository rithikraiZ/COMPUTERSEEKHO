package com.project.Entities;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

 @Entity
@Table(name = "followup")
@Data
public class Followup implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "followup_id")
    private int followupId;

    @ManyToOne
    @JoinColumn(name = "enquiry_id", referencedColumnName = "enquiry_id")
    private Enquiry enquiry;

    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "staff_id")
    private Staff staff;

    @Column(name = "followup_date")
    private LocalDate followupDate;

    @Column(name = "followup_msg")
    private String followupMsg;

    @Column(name = "is_active")
    private boolean isActive;

    public void setFollowupId(int followupId){
        this.followupId = followupId;
    }

    public int getFollowupId(){
        return followupId;
    }

    public int getEnquiryId() {
        return enquiry.getEnquiryId();
    }

    public void setEnquiryId(int enquiryId) {
        this.enquiry.setEnquiryId(enquiryId);
    }

    public int getStaffId() {
        return staff.getStaffId();
    }

    public void setStaffId(int staffId) {
        this.staff.setStaffId(staffId);
    }

    public void setFollowupDate(LocalDate followupDate){
        this.followupDate = followupDate;
    }

    public LocalDate getFollowupDate(){
        return this.followupDate;
    }

    public void setFollowupMsg(String followupMsg){
        this.followupMsg = followupMsg;
    }

    public String getFollowupMsg(){
        return followupMsg;
    }

    public void setActive(boolean isActive){
        this.isActive = isActive;
    }

    public Boolean getActive(){
        return isActive;
    }   
}