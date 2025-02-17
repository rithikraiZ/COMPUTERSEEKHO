package com.project.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

 @Entity
@Table(name = "video")
@Data
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id")
    private int videoId;

    @Column(name = "video_description", length = 60)
    private String videoDescription;

    @Column(name = "video_url", length = 255)
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "batch_id")
    private Batch batch;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "is_active")
    private boolean videoIsActive;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id")
    private Course course;
    
    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Batch getBatchId() {
        return batch;
    }

    public void setBatchId(Batch batch) {
        this.batch = batch;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isVideoIsActive() {
        return videoIsActive;
    }

    public void setVideoIsActive(boolean videoIsActive) {
        this.videoIsActive = videoIsActive;
    }

    public Course getCourse() {
    	return course;
    }
    
    public void setCourse(Course course) {
    	this.course = course;
    }
}
