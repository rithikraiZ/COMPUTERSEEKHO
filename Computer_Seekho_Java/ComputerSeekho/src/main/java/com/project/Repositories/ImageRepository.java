package com.project.Repositories;


// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.Entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer>{

//    @Query("SELECT i FROM Image i WHERE i.albumId = ?1")
//    List<Image> findByAlbumId(int albumId);
}
