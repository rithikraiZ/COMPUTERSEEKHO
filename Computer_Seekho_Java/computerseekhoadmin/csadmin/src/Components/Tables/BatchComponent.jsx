import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, 
  ListItemSecondaryAction, InputAdornment, Dialog, DialogTitle, DialogContent, 
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

const BatchComponent = () => {
  const [batches, setBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) return;

      const response = await fetch('http://localhost:8080/api/batch/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(await response.text());
      
      const data = await response.json();
      setBatches(data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  
  const openEditForm = (batch) => {
    setEditBatch(batch);
    setOpenEditDialog(true);
  };

  
  const filteredBatches = batches.filter(batch => 
    batch.batchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Batch Master
        </Typography>
        <TextField
          label="Search by Batch Name"
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
        {filteredBatches.map(batch => (
          <ListItem key={batch.batchId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <ListItemText
              primary={batch.batchName}
              secondary={`Start: ${batch.batchStartTime}, End: ${batch.batchEndTime}`}
            />
            <ListItemSecondaryAction>
             
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BatchComponent;
