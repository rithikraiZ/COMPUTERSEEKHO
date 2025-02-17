package com.project.Repositories;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entities.Followup;

 @Repository
public interface FollowupRepository extends JpaRepository<Followup, Integer>{
	List<Followup> findByFollowupDate(LocalDate followupDate);
}
