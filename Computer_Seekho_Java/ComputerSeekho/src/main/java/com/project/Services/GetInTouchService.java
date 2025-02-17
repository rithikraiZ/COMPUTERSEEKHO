package com.project.Services;

import java.util.List;

import com.project.Entities.GetInTouch;

public interface GetInTouchService {
    List<GetInTouch> getAllGetInTouch();
    GetInTouch addGetInTouch(GetInTouch getInTouch);
    void deleteGetInTouch(int getInTouchId);
}
