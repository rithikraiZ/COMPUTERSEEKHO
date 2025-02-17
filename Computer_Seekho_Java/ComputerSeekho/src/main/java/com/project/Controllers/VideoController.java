package com.project.Controllers;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.DTO.ResponseDTO;
import com.project.Entities.Video;
import com.project.Services.VideoService;


@RestController
@RequestMapping("/api/video")
public class VideoController {
	
	@Autowired
	private VideoService videoService;

	@GetMapping("/getById/{videoId}")
	public ResponseEntity<Video> getVideoById(@PathVariable int videoId) {
		Optional<Video> video = videoService.getVideoById(videoId);
		if (video.isPresent())
			return new ResponseEntity<>(video.get(), HttpStatus.OK);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping("/all")
	public List<Video> getAllVideos() {
		return videoService.getAllVideos();
	}

	@PostMapping("/add")
	public ResponseEntity<ResponseDTO> addVideo(@RequestBody Video video) {
		videoService.addVideo(video);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDTO("Video Added",new Date()));
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseDTO> updateVideo(@RequestBody Video video) {
		boolean isUpdated = videoService.updateVideo(video);
		if (isUpdated)
			return new ResponseEntity<>(new ResponseDTO("Video Details Updated",new Date()), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO("Video Not Found",new Date()), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{videoId}")
	public ResponseEntity<ResponseDTO> deleteVideo(@PathVariable int videoId) {
		videoService.deleteVideo(videoId);
		return new ResponseEntity<>(new ResponseDTO("Video Deleted",new Date()), HttpStatus.OK);
	}

	@GetMapping("/activate/{videoId}")
	public ResponseEntity<String> activateVideo(@PathVariable int videoId, @RequestParam boolean videoIsActive) {
		videoService.activateVideo(videoId, videoIsActive);
		return ResponseEntity.ok().body("Video Activated");
	}

//	@GetMapping("/findByBatchId/{batchId}")
//	public ResponseEntity<List<Video>> findByBatchId(@PathVariable int batchId) {
//		List<Video> videos = videoService.findByBatchId(batchId);
//		if (videos.isEmpty())
//			return ResponseEntity.notFound().build();
//		else
//			return ResponseEntity.ok().body(videos);
//	}

//	@GetMapping("/findByVideoName/{courseId}")
//	public ResponseEntity<List<Video>> findByVideoName(@PathVariable int courseId) {
//		List<Video> videos = videoService.findByVideoName(courseId);
//		if (videos.isEmpty())
//			return ResponseEntity.notFound().build();
//		else
//			return ResponseEntity.ok().body(videos);
//	}
}
