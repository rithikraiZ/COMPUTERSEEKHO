import React from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import './GetInTouch.css';

const GetInTouch = () => {

  const coursesNames = ["PG DAC","PG DBDA", "PRE CAT"];
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      enquirerName: formData.get('enquirerName'),
      enquirerEmail: formData.get('enquirerEmail'),
      enquirerPhone: formData.get('enquirerPhone'),
      enquiryMessage: formData.get('enquiryMessage'),
      courseName: formData.get('courseName')
    };

    fetch('http://localhost:8080/api/getInTouch/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        toast.success("We will get Back to you soon!", { position: "top-center" });
      })
      .catch(error => {
        toast.error("Oops something went wrong..!", { position: "top-center" });
      });
  };

  return (
    <div>
    <Toaster/>
    <Container className="get-in-touch-container" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Get In Touch
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ color: '#666' }}>
        We are a part of Upanagar Shikshan Mandal (USM), a pioneering educational trust in the western suburbs of Mumbai.
        Commencing in 1956, USM has blossomed into 14 educational institutes that impart quality education from primary
        school to Post-Graduate courses.
      </Typography>

      <Typography variant="h4" component="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Reach Us At
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ color: '#666' }}>
        <strong>Authorised Training Centre</strong>
        <br />
        5th Floor, Vidyanidhi Education Complex,
        <br />
        Vidyanidhi Road, Juhu Scheme Andheri (W),
        <br />
        Mumbai 400 049, India
        <br />
        <strong>Mobile:</strong> 9029435311 / 9324095272 / 9987062416
        <br />
        <strong>Email:</strong>{' '}
        <a href="mailto:training@vidyanidhi.com" style={{ color: '#333', textDecoration: 'none' }}>
          training@vidyanidhi.com
        </a>
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Get In Touch With Us!
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ color: '#666' }}>
          Fill out the form below:
        </Typography>

        <form onSubmit= {handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Name"
                name="enquirerName"
                variant="outlined"
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Email"
                name="enquirerEmail"
                type="email"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Phone Number"
                name="enquirerPhone"
                type="text" pattern="[6789][0-9]{9}"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Message"
                name="enquiryMessage"
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                select
                fullWidth
                name="courseName"
                variant="outlined"
                required
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                <option value="">Select a course</option>
                {coursesNames.map((courseName) => (
                  <option key={courseName} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={8} align="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#333',
                  '&:hover': { backgroundColor: '#555' },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box className="map" sx={{ mt: 6 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8356064622367!2d72.83550441512686!3d19.113645587071792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a70f91b2f%3A0x7c13b14f4425a1e0!2sVidyanidhi%20Education%20Complex!5e0!3m2!1sen!2sin!4v1694413907598!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Container>
    </div>
  );
};

export default GetInTouch;