package com.project.Controllers;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Album;
import com.project.Services.AlbumService;

@RestController
@RequestMapping("/api/album")
public class AlbumController {
	@Autowired
	private AlbumService albumService;

	@GetMapping("/getById/{albumId}")
	public ResponseEntity<Album> getAlbumById(@PathVariable int albumId) {
		Optional<Album> album = albumService.getAlbumById(albumId);
		if (album.isPresent())
			return new ResponseEntity<>(album.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping("/all")
	public List<Album> getAllAlbums() {
		return albumService.getAllAlbums();
	}

	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addAlbum(@RequestBody Album album) {
		albumService.addAlbum(album);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Album Added",new Date()));
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateAlbum(@RequestBody Album album) {
		boolean isUpdated = albumService.updateAlbum(album);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Album Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Album Not Found",new Date()), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{albumId}")
	public ResponseEntity<ResponseDTO> deleteAlbum(@PathVariable int albumId) {
		albumService.deleteAlbum(albumId);
    	return ResponseEntity.ok().body(new ResponseDTO("AAlbum Deleted",new Date()));
	}
}
