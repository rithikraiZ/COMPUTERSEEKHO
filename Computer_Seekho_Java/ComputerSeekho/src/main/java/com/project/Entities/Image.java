package com.project.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private int imageId;

    @Column(name = "image_url", length = 255, nullable = false)
    private String imageUrl;

    @Column(name = "image_description")
    private String imageDescription;

    @Column(name = "imagetitle")
    private String imagetitle;    

    @ManyToOne
    @JoinColumn(name = "album_id", referencedColumnName = "album_id")
    private Album album;

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
}
