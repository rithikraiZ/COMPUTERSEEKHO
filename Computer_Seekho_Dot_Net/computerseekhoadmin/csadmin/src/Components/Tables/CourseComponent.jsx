import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, 
  ListItemSecondaryAction, InputAdornment, Avatar, Dialog, DialogTitle, DialogContent, 
  DialogActions 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2',
  white: '#FFFFFF'
};

const CourseComponent = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editCourse, setEditCourse] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch('http://localhost:8080/api/course/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('API Error:', response.status, await response.text());
        return;
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) return;

      await fetch(`http://localhost:8080/api/course/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setCourses(courses.filter(course => course.courseId !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openEditForm = (course) => {
    setEditCourse(course);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  const updateCourse = async () => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) return;

      const response = await fetch('http://localhost:8080/api/course/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCourse),
      });

      if (!response.ok) {
        console.error('Update failed:', response.status, await response.text());
        return;
      }

      setCourses(courses.map(course => (course.courseId === editCourse.courseId ? editCourse : course)));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Course Master
        </Typography>
        <TextField
          label="Search by Course Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px', backgroundColor: colors.white, borderRadius: '4px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List>
        {filteredCourses.map(course => (
          <ListItem key={course.courseId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <Avatar src={course.courseImage} alt={course.courseName} sx={{ width: 50, height: 50, marginRight: 2 }} />
            <ListItemText
              primary={course.courseName}
              secondary={`Duration: ${course.courseDuration} | Fee: ${course.courseFee}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => openEditForm(course)}>
                <EditIcon sx={{ color: colors.accent }} />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteCourse(course.courseId)}>
                <DeleteIcon sx={{ color: colors.secondary }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Edit Course Dialog */}
      {editCourse && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="courseName"
              value={editCourse.courseName}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Duration"
              name="courseDuration"
              value={editCourse.courseDuration}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fee"
              name="courseFee"
              value={editCourse.courseFee}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={updateCourse} color="primary" variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CourseComponent;
