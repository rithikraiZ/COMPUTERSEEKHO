import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampusLifeHome.css';
import white_arrow from '../../assets/white-arrow.png';

const CampusLifeHome = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Fetch gallery images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/image/all');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleSeeMoreClick = () => {
    navigate('/campuslife');
  };

  return (
    <div className="campus">
      <div className="gallery">
        {images.length > 0 ? (
          images.slice(0, 4).map((image) => (
            <img
              key={image.imageId}
              src={`/images/${image.imageUrl}`}
              alt="Gallery"
              style={{ width: '23%', borderRadius: '10px', marginBottom: '20px' }}
            />
          ))
        ) : (
          <p>No images available at the moment.</p>
        )}
      </div>
      <div>
        <button className="btn dark-btn" onClick={handleSeeMoreClick}>
          See more here
          <img src={white_arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default CampusLifeHome;
