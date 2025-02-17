package com.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entities.GetInTouch;

@Repository
public interface GetInTouchRepository extends JpaRepository<GetInTouch, Integer> {
}
