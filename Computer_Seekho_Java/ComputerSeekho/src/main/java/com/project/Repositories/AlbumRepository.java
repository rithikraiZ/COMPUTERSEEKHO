package com.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Album;
// import java.util.List;
// import java.time.LocalDate;


@Repository
@Transactional
public interface AlbumRepository extends JpaRepository<Album, Integer>{
	// List<Album> findByStartDate(LocalDate startDate);
}
