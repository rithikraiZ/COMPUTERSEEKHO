package com.project.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

import com.project.Entities.Followup;
import com.project.Repositories.FollowupRepository;

// @Service
public class FollowupServiceImpl implements FollowupService {

	// @Autowired
	private FollowupRepository followupRepository;
	
	@Override
	public Optional<Followup> getFollowupById(int followupId) {
		return followupRepository.findById(followupId);
	}

	@Override
	public List<Followup> getFollowupsByDate(LocalDate followupDate) {
		return followupRepository.findByFollowupDate(followupDate);
	}

	@Override
	public List<Followup> getAll() {
		return followupRepository.findAll();
	}

	@Override
	public Followup addFollowup(Followup followup) {
		return followupRepository.save(followup);
	}

	@Override
	public boolean updateFollowup(Followup followup) {
		Optional<Followup> foundFollowUp = followupRepository.findById(followup.getFollowupId());
		if(foundFollowUp.isPresent()) {
			followupRepository.save(followup);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteFollowUp(int followupId) {
		followupRepository.deleteById(followupId);
	}

}
