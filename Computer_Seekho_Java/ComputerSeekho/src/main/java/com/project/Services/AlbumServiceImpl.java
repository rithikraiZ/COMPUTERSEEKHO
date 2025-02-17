package com.project.Services;

import com.project.Entities.Album;
import com.project.Repositories.AlbumRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AlbumServiceImpl implements AlbumService{
    @Autowired
    AlbumRepository albumRepository;

	@Override
	public Optional<Album> getAlbumById(int albumId) {
		return albumRepository.findById(albumId);
	}

	// @Override
	// public List<Album> getAlbumsByDate(LocalDate startDate) {
	// 	return  albumRepository.findByStartDate(startDate);
	// }

	@Override
	public Album addAlbum(Album album) {
		return albumRepository.save(album);
	}

	@Override
	public boolean updateAlbum(Album album) {
		Optional<Album> foundAlbum = albumRepository.findById(album.getAlbumId());
		if(foundAlbum.isPresent()) {
			albumRepository.save(album);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteAlbum(int albumId) {
		albumRepository.deleteById(albumId);
	}

	@Override
	public List<Album> getAllAlbums() {
		return albumRepository.findAll();
	}
}