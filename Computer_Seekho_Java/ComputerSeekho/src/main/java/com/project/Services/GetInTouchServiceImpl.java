package com.project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.GetInTouch;
import com.project.Repositories.GetInTouchRepository;

@Service
public class GetInTouchServiceImpl implements GetInTouchService {

    @Autowired
    private GetInTouchRepository getInTouchRepository;

    @Override
    public List<GetInTouch> getAllGetInTouch() {
        return getInTouchRepository.findAll();
    }

    @Override
    public GetInTouch addGetInTouch(GetInTouch getInTouch) {
        return getInTouchRepository.save(getInTouch);
    }

    @Override
    public void deleteGetInTouch(int getInTouchId) {
        getInTouchRepository.deleteById(getInTouchId);
    }
}
