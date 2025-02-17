package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.Recruiter;

public interface RecruiterService {
    Recruiter addRecruiter(Recruiter recruiter);
    boolean updateRecruiter(Recruiter recruiter);
    void deleteRecruiter(int recruiterId);
    Optional<Recruiter> getRecruiterById(int recruiterId);
    List<Recruiter> getAllRecruiters();
}
