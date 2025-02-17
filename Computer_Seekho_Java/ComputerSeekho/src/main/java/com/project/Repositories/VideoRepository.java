package com.project.Repositories;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Video;

@Repository
@Transactional
public interface VideoRepository extends JpaRepository<Video, Integer>{
	
    @Modifying
	@Query("update Video v set v.videoIsActive = :videoIsActive where v.videoId = :videoId")
	void activateVideo(@Param("videoIsActive") Boolean  videoIsActive,@Param("videoId")int videoId);

//	@Query("select v from Video v where v.batchId = ?1")
//	public List<Video> findByBatchId(int batchId);
//
//	@Query("select v from Video v where v.courseId = ?1")
//	public List<Video> findByCourse(int courseId); 
}
