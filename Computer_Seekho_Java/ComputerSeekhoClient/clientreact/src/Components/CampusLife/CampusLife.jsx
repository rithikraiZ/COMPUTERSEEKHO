import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Box from '../Box/Box'; 
import './CampusLife.css';

const CampusLife = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/image/all'); 
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data); 
        console.log(data);
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchImages();
  }, []); 

  return (
    <Container className="campus-life">
      <Typography variant="h4" component="h1" gutterBottom>
        Edusity
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Display error message if there's an issue */}
      
      {/* Box container for the images */}
      <div className="box-container">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div className="box" key={index}>
              <Box
                title={image.imagetitle}
                description={image.image_description}
                image={`/images/${image.imageUrl}`}
              />
            </div>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No images available.
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default CampusLife;