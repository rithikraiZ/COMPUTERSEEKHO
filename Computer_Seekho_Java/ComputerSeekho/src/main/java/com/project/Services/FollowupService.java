package com.project.Services;

import com.project.Entities.Followup;

import java.time.LocalDate;
import java.util.*;

public interface FollowupService {
	Optional<Followup> getFollowupById(int followupId);
	List<Followup> getFollowupsByDate(LocalDate followupDate);
	List<Followup> getAll();
	Followup addFollowup(Followup followup);
	boolean updateFollowup(Followup followup);
	void deleteFollowUp(int followupId);
}
