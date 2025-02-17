package com.project.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.Services.ImageService;
import com.project.DTO.ResponseDTO;
import com.project.Entities.Image;

@RestController
@RequestMapping("/api/image")
public class ImageController {
	@Autowired
	private ImageService imageService;

	@GetMapping("/getById/{imageId}")
	public ResponseEntity<Image> getImageById(@PathVariable int imageId) {
		Optional<Image> image = imageService.getImageById(imageId);
		if (image.isPresent())
			return new ResponseEntity<>(image.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping("/all")
	public List<Image> getAllImages() {
		return imageService.getAllImages();
	}

	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addImage(@RequestBody  Image image) {
		imageService.addImage(image);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Image Added",new Date()));
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateImage(@RequestBody Image image) {
		boolean isUpdated = imageService.updateImage(image);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Image Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Image Not Found",new Date()), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{imageId}")
	public ResponseEntity<ResponseDTO> deleteImage(@PathVariable int imageId) {
		imageService.deleteImage(imageId);
		return ResponseEntity.ok().body(new ResponseDTO("Image Deleted",new Date()));
	}
}
