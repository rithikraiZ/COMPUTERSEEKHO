package com.project.Repositories;
import com.project.Entities.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Integer>{
    
    @Query(value = """
    SELECT s.* 
    FROM Student s 
    WHERE s.course_id = ?1"""
    ,nativeQuery = true)
    List<Student> findbyCourse(int courseId);

    @Query(value = """
    SELECT s.* 
    FROM Student s 
    WHERE s.batch_id = ?1"""
    ,nativeQuery = true)
    List<Student> findByBatch(int batchId);

    @Modifying
    @Query(value="""
    update student s set payment_due = ( select course_fee from course c where c.course_id=s.course_id) where student_id = ?1""",nativeQuery = true)
    void updatePaymentDue(int studentId);
}
