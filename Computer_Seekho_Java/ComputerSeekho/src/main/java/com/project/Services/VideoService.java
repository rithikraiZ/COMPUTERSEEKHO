package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.Video;

public interface VideoService {
	Optional<Video> getVideoById(int videoId);
    List<Video> getAllVideos();
    Video addVideo(Video video);
    boolean updateVideo(Video video);
    void deleteVideo(int videoId);
    void activateVideo(int videoId, boolean videoIsActive);
//    List<Video> findByBatchId(int batchId);
    // List<Video> findByVideoName(int courseId);
}
