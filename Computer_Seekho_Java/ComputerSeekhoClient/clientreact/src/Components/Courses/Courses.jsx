import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch courses data from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/course/all'); // Adjust URL as per backend
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleNavigation = (courseName) => {
    navigate(`/courses/${courseName}`);
  };

  return (
    <Grid container spacing={4} className="courses">
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.courseId}>
          <Card
            className="course"
            onClick={() => handleNavigation(course.courseName)}
            sx={{ position: 'relative', cursor: 'pointer' }}
          >
            <CardMedia
              component="img"
              height="140"
              image={course.coverPhoto}
              alt={course.courseName}
            />
            <div className="caption">
              <Typography variant="h6" color="white">
                {course.courseName}
              </Typography>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Courses;