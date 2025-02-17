package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Image;
import com.project.Repositories.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageRepository imageRepository;
	
	@Override
	public Optional<Image> getImageById(int imageId) {
		return imageRepository.findById(imageId);
	}

	@Override
	public List<Image> getAllImages() {
		return imageRepository.findAll();
	}

	@Override
	public Image addImage(Image image) {
		return imageRepository.save(image);
	}

	@Override
	public boolean updateImage(Image image) {
		Optional<Image> foundImage = imageRepository.findById(image.getImageId());
		if(foundImage.isPresent()) {
			imageRepository.save(image);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteImage(int imageId) {
		imageRepository.deleteById(imageId);
	}

}
