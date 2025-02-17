import React from "react";
import { Box as MuiBox, Typography } from "@mui/material";
import './Box.css';

const Box = ({ title, description, image }) => {
  return (
    <MuiBox
      sx={{
        width: '100%',
        maxWidth: '950px',
        minHeight: '350px',
        border: '1px solid #ccc',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <img src={image} alt={title} className="box-image" style={{ width: '100%', marginBottom: '15px', borderRadius: '8px' }} />
      <Typography variant="h5" sx={{ marginTop: '10px', marginBottom: '10px' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#555' }}>
        {description}
      </Typography>
    </MuiBox>
  );
};

export default Box;