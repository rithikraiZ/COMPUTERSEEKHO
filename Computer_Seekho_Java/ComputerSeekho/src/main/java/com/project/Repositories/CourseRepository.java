package com.project.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Course;


@Repository
@Transactional
public interface CourseRepository extends JpaRepository<Course, Integer>{
    @Query("select c from Course c where c.courseName = ?1")
    Optional<Course> findCourseByName(String courseName);
}
