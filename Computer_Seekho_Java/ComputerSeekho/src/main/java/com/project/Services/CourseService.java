package com.project.Services;

import java.util.*;

import com.project.Entities.Course;

public interface CourseService {
    Optional<Course> getCourseById(int courseId);
    List<Course> getAllCourses();
    Course addCourse(Course course);
    boolean updateCourse(Course course);
    void deleteCourse(int courseId);
    Optional<Course> findByCourseName(String courseName);
}
