package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.Image;

public interface ImageService {
	
	Optional<Image> getImageById(int imageId);
    List<Image> getAllImages();
    Image addImage(Image image);
    boolean updateImage(Image image);
    void deleteImage(int imageId);
}
