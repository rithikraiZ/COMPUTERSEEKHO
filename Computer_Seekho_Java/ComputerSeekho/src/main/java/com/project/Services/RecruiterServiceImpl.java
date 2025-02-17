package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Recruiter;
import com.project.Repositories.RecruiterRepository;

@Service
public class RecruiterServiceImpl implements RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Override
    public Recruiter addRecruiter(Recruiter recruiter) {
        return recruiterRepository.save(recruiter);
    }

    @Override
    public boolean updateRecruiter(Recruiter recruiter) {
        Optional<Recruiter> foundRecruiter = recruiterRepository.findById(recruiter.getRecruiterId());
        if(foundRecruiter.isPresent()) {
            recruiterRepository.save(recruiter);
            return true;
        }
        else return false;
    }

    @Override
    public void deleteRecruiter(int recruiterId) {
        recruiterRepository.deleteById(recruiterId);
    }

    @Override
    public Optional<Recruiter> getRecruiterById(int recruiterId) {
        return recruiterRepository.findById(recruiterId);
    }

    @Override
    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }
    
}
