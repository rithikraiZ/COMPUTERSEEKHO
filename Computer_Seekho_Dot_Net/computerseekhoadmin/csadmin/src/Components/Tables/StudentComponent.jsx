import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2', // Lighter background
  white: '#FFFFFF'
};

// Temporary static content
const staticStudents = [
  {
    student_id: 1,
    student_name: 'John Doe',
    student_address: '123 Main St',
    student_gender: 'Male',
    photo_url: 'https://via.placeholder.com/150',
    student_dob: '2000-01-01',
    student_qualification: 'B.Sc',
    student_mobile: 1234567890,
    course_fee: 15000,
    batch_id: 1,
    course_id: 1,
    student_password: 'password123',
    student_username: 'johndoe',
  },
  {
    student_id: 2,
    student_name: 'Jane Smith',
    student_address: '456 Elm St',
    student_gender: 'Female',
    photo_url: 'https://via.placeholder.com/150',
    student_dob: '2001-02-02',
    student_qualification: 'M.Sc',
    student_mobile: 9876543210,
    course_fee: 20000,
    batch_id: 2,
    course_id: 2,
    student_password: 'password123',
    student_username: 'janesmith',
  },
  {
    student_id: 3,
    student_name: 'Alice Johnson',
    student_address: '789 Maple St',
    student_gender: 'Female',
    photo_url: 'https://via.placeholder.com/150',
    student_dob: '2002-03-03',
    student_qualification: 'B.A',
    student_mobile: 5555555555,
    course_fee: 5000,
    batch_id: 3,
    course_id: 3,
    student_password: 'password123',
    student_username: 'alicejohnson',
  },
];

const StudentComponent = () => {
  const [students, setStudents] = useState(staticStudents); // Using static content
  const [searchQuery, setSearchQuery] = useState('');

  // Commented out fetchStudents and other dynamic code
  /*
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter(student => student.student_id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  */

  const filteredStudents = Array.isArray(students) ? students.filter(student =>
    student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Student Master
        </Typography>
        <TextField
          label="Search by Student Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px', backgroundColor: colors.white, borderRadius: '4px' }} // Adjust width as needed
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
        {filteredStudents.map(student => (
          <ListItem key={student.student_id} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <ListItemText
              primary={student.student_name}
              secondary={`${student.student_qualification} | ${student.student_email} | ${student.student_mobile}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => console.log('View student', student.student_id)}>
                <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white, marginRight: '10px' }}>
                  View
                </Button>
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Edit student', student.student_id)}>
                <EditIcon sx={{ color: colors.accent }} />
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Delete student', student.student_id)}>
                <DeleteIcon sx={{ color: colors.secondary }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StudentComponent;
