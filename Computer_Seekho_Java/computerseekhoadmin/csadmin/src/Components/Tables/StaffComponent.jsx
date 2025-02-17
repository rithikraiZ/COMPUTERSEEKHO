import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText,
  ListItemSecondaryAction, InputAdornment, Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2',
  white: '#FFFFFF'
};

const StaffComponent = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({ staffName: '', photoUrl: '', staffRole: '', staffEmail: '', staffMobile: '', staffUserName: '', staffPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) {
        setErrorMessage('Authentication token missing.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/staff/all', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setStaff(await response.json());
      } else {
        setErrorMessage('Failed to fetch staff data.');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      setErrorMessage('Server error while fetching staff.');
    }
  };

  const addStaff = async () => {
    if (!newStaff.staffName || !newStaff.staffRole || !newStaff.staffEmail || !newStaff.staffMobile || !newStaff.staffPassword) {
      setErrorMessage('All fields are required!');
      return;
    }
  
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) {
        setErrorMessage('Authentication token missing.');
        return;
      }
  
      const response = await fetch('http://localhost:8080/api/staff/add', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
  
      const result = await response.json();
      console.log("🟢 API Response from Backend:", result); 
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add staff.');
      }
  
      
      setStaff(prevStaff => {
        console.log("🟠 Previous staff list:", prevStaff); 
        return [...prevStaff, result];
      });
  
      setNewStaff({ staffName: '', photoUrl: '', staffRole: '', staffEmail: '', staffMobile: '', staffUserName: '', staffPassword: '' });
      setOpenAddDialog(false);
      setSuccessMessage('Staff added successfully!');
    } catch (error) {
      console.error('🔴 Error adding staff:', error);
      setErrorMessage(error.message || 'Server error while adding staff.');
    }
  };
  
  const deleteStaff = async (id) => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) { 
        setErrorMessage('Authentication token missing.');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/staff/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStaff(staff.filter(member => member.staffId !== id));
        setSuccessMessage('Staff deleted successfully!');
      } else {
        setErrorMessage('Failed to delete staff.');
      }
    }
    catch (error) {
      console.error('Error deleting staff:', error);
      setErrorMessage('Server error while deleting staff.');
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>Staff Master</Typography>
        <Box>
          <TextField
            label="Search by Staff Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '300px', backgroundColor: colors.white, borderRadius: '4px', marginRight: '10px' }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          />
          <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white }} startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
            Add Staff
          </Button>
        </Box>
      </Box>

      <List>
        {staff
          .filter(member => member?.staffName?.toLowerCase()?.includes(searchQuery.toLowerCase())) 
          .map(member => (
          <ListItem key={member.staffId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <Avatar 
              src={member.photoUrl} 
              alt={member.staffName} 
              sx={{ width: 50, height: 50, marginRight: 2 }} 
              onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/50'; }} 
            />
            <ListItemText primary={member.staffName} secondary={`${member.staffRole} | ${member.staffEmail} | ${member.staffMobile}`} />
            <IconButton edge="end" onClick={() => deleteStaff(member.staffId)}> 
              <DeleteIcon sx={{ color: colors.secondary }} />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          {Object.keys(newStaff).map(field => (
            <TextField 
              key={field} 
              label={field.replace('staff', '')} 
              name={field} 
              value={newStaff[field]} 
              onChange={(e) => setNewStaff({ ...newStaff, [e.target.name]: e.target.value })} 
              fullWidth 
              margin="normal" 
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} sx={{ color: colors.secondary }}>Cancel</Button>
          <Button onClick={addStaff} sx={{ backgroundColor: colors.primary, color: colors.white }} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!errorMessage} autoHideDuration={4000} onClose={() => setErrorMessage('')}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage('')}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffComponent;
