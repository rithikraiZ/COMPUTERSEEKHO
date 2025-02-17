package com.project.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.ClosureReason;
import com.project.Entities.Enquiry;
import com.project.Repositories.EnquiryRepository;

@Service
public class EnquiryServiceImpl implements EnquiryService{

	@Autowired
	private EnquiryRepository enquiryRepository;
	@Autowired
	private ClosureReasonService closureReasonService;

	@Override
	public Optional<Enquiry> getEnquiryById(int enquiryId) {
		return enquiryRepository.findById(enquiryId);
	}

	@Override
	public List<Enquiry> getAllEnquiries() {
		return enquiryRepository.findAll();
	}

	@Override
	public Enquiry addEnquiry(Enquiry enquiry) {
		return enquiryRepository.save(enquiry);
	}

	@Override
	public boolean updateEnquiry(Enquiry enquiry) {
		Optional<Enquiry> foundEnquiry = enquiryRepository.findById(enquiry.getEnquiryId());
		if(foundEnquiry.isPresent()) {
			enquiryRepository.save(enquiry);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteEnquiry(int enquiryId) {
		enquiryRepository.deleteById(enquiryId);
	}

	@Override
	public List<Enquiry> getEnquiryByDate(LocalDate enquiryDate) {
		return enquiryRepository.findByEnquiryDate(enquiryDate);
	}

	@Override
	public List<Enquiry> getbystaff(String staffUsername) {
		return enquiryRepository.getbystaff(staffUsername);
	}

	@Override
	public int updateEnquirerQuery(String enquirerQuery, int enquiryId) {
		return enquiryRepository.updateEnquirerQuery(enquirerQuery, enquiryId);
	}

	@Override
	public void deactivateEnquiry(String closureReasonDesc, int enquiryId){
		closureReasonService.addClosureReason(new ClosureReason(enquiryRepository.findById(enquiryId).get().getEnquirerName(), closureReasonDesc));
		enquiryRepository.deactivateEnquiry(enquiryId);
	}
	
}
