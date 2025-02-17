package com.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Batch;
import java.util.Optional;


@Repository
@Transactional
public interface BatchRepository extends JpaRepository<Batch,Integer> {
	
	@Modifying
	@Query("update Batch b set b.batchIsActive = :batchIsActive where b.batchId = :batchId")
	void activateBatch(@Param("batchIsActive") boolean batchIsActive, @Param("batchId") int batchId);

	@Query("select b from Batch b where b.batchName = :batchName")
	Optional<Batch> findByBatchName(@Param("batchName") String batchName);
}
