package com.project.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.project.Entities.Enquiry;

public interface EnquiryService {
	Optional<Enquiry> getEnquiryById(int enquiryId);
    List<Enquiry> getAllEnquiries();
    Enquiry addEnquiry(Enquiry enquiry);
    boolean updateEnquiry(Enquiry enquiry);
    void deleteEnquiry(int enquiryId);
	List<Enquiry> getEnquiryByDate(LocalDate enquiryDate);
    List<Enquiry> getbystaff(String staffUsername);
    int updateEnquirerQuery(String enquirerQuery, int enquiryId);
    void deactivateEnquiry(String closureReasonDesc, int enquiryId);
}
