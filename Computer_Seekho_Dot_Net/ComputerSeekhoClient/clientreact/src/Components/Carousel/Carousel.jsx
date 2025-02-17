import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./Carousel.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      url: "https://vidyanidhi.com/images/img1.jpg",
      caption: "Students studying together",
    },
    {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "Library environment",
    },
    {
      url: "https://www.vidyanidhi.com/images/main1.png",
      caption: "Students working on laptops",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="carousel" position="relative">
      <Box
        className="carousel-inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Box key={index} className="carousel-item">
            <img src={image.url} alt={image.caption} className="carousel-image" />
            <Typography className="caption">{image.caption}</Typography>
          </Box>
        ))}
      </Box>
      <IconButton className="carousel-control prev" onClick={handlePrev}>
        <ArrowBack />
      </IconButton>
      <IconButton className="carousel-control next" onClick={handleNext}>
        <ArrowForward />
      </IconButton>
      <Box className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;