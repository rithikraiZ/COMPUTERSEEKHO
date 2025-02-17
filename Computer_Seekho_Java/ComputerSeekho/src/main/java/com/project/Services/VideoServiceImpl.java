package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Video;
import com.project.Repositories.VideoRepository;

@Service
public class VideoServiceImpl implements VideoService{

	@Autowired
	private VideoRepository videoRepository;
	
	@Override
	public Optional<Video> getVideoById(int videoId) {
		return videoRepository.findById(videoId);
	}

	@Override
	public List<Video> getAllVideos() {
		return videoRepository.findAll();
	}

	@Override
	public Video addVideo(Video video) {
		return videoRepository.save(video);
	}

	@Override
	public boolean updateVideo(Video video) {
		Optional<Video> foundVideo = videoRepository.findById(video.getVideoId());
		if(foundVideo.isPresent()) {
			videoRepository.save(video);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteVideo(int videoId) {
		videoRepository.deleteById(videoId);		
	}

	@Override
	public void activateVideo(int videoId, boolean videoIsActive) {
		videoRepository.activateVideo(videoIsActive, videoId);
	}

//	@Override
//	public List<Video> findByBatchId(int batchId) {
//		return videoRepository.findByBatchId(batchId);
//	}

	// @Override
	// public List<Video> findByVideoName(int courseId) {
	// 	return videoRepository.findByCourse(courseId);
	// }

}
