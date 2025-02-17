package com.project.Services;

// import java.time.LocalDate;
import java.util.*;
import com.project.Entities.Album;

public interface AlbumService {

    Optional<Album> getAlbumById(int albumId);
    List<Album> getAllAlbums();
    Album addAlbum(Album album);
    boolean updateAlbum(Album album);
    void deleteAlbum(int albumId);
	// List<Album> getAlbumsByDate(LocalDate startDate);
}
