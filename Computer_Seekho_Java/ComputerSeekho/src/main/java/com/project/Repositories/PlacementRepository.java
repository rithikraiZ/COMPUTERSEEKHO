package com.project.Repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.DTO.PlacementDTO;
import com.project.Entities.Placement;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
@Transactional
public interface PlacementRepository extends JpaRepository<Placement, Integer> {

       // @Query("SELECT new com.project.DTO.PlacementDTO( " +
       // "p.batch.batchId, p.batch.batchName , p.studentID.studentName
       // ,p.studentID.photoUrl, p.recruiterID.recruiterName) " +
       // "FROM Placement p " +
       // "JOIN p.batch b " +
       // "JOIN p.studentID s " +
       // "JOIN p.recruiterID r " +
       // "ORDER BY p.batch.batchId")
       // List<PlacementDTO> fetchPlacedStudents();

       // @Query("SELECT new com.project.DTO.PlacementDTO( " +
       // "p.batch.batchId, p.batch.batchName , p.studentID.studentName
       // ,p.studentID.photoUrl, p.recruiterID.recruiterName) " +
       // "FROM Placement p " +
       // "JOIN p.batch b " +
       // "JOIN p.studentID s " +
       // "JOIN p.recruiterID r " +
       // "WHERE p.batch.batchId = :batchId " +
       // "ORDER BY p.batch.batchId")
       // List<PlacementDTO> findByBatchId(int batchId);

       // @Query("SELECT new com.project.DTO.PlacementDTO( " +
       // "p.batch.batchId, p.batch.batchName, p.studentID.studentName,
       // p.studentID.photoUrl, p.recruiterID.recruiterName) "
       // +
       // "FROM Placement p " +
       // "ORDER BY p.batch.batchId")
       // List<PlacementDTO> fetchPlacedStudents();

       // @Query("SELECT new com.project.DTO.PlacementDTO( " +
       // "p.batch.batchId, p.batch.batchName, p.studentID.studentName,
       // p.studentID.photoUrl, p.recruiterID.recruiterName) "
       // +
       // "FROM Placement p " +
       // "WHERE p.batch.batchId = :batchId " +
       // "ORDER BY p.batch.batchId")
       // List<PlacementDTO> findByBatchId(@Param("batchId") int batchId);

       @Query("SELECT new com.project.DTO.PlacementDTO( " +
                     "p.batch.batchId, p.batch.batchName, p.studentID.studentName, p.studentID.photoUrl, p.recruiterID.recruiterName) "
                     +
                     "FROM Placement p " +
                     "ORDER BY p.batch.batchId")
       List<PlacementDTO> fetchPlacedStudents();

       @Query("SELECT new com.project.DTO.PlacementDTO( " +
                     "p.batch.batchId, p.batch.batchName, p.studentID.studentName, p.studentID.photoUrl, p.recruiterID.recruiterName) "
                     +
                     "FROM Placement p " +
                     "WHERE p.batch.batchId = :batchId " +
                     "ORDER BY p.batch.batchId")
       List<PlacementDTO> findByBatchId(@Param("batchId") int batchId);

       List<Placement> findByBatch_BatchId(int batchId);
}