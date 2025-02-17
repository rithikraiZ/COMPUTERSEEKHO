package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Course;
import com.project.Repositories.*;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
    CourseRepository courseRepositories;
	
    @Override
    public Optional<Course> getCourseById(int courseId) {
        return courseRepositories.findById(courseId);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepositories.findAll();
    }

    @Override
    public Course addCourse(Course course) {
        return courseRepositories.save(course);
    }

    @Override
    public boolean updateCourse(Course course) {
        if (courseRepositories.existsById(course.getCourseId())) {
            courseRepositories.save(course);
            return true;
        }
        return false;
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepositories.deleteById(courseId);
    }
    
    @Override
    public Optional<Course> findByCourseName(String courseName) {
        return courseRepositories.findCourseByName(courseName);
    }
    
}
