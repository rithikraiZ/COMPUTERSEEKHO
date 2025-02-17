import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Typography, List, ListItem, ListItemText, 
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2',
  white: '#FFFFFF'
};

const ClosureReasonComponent = () => {
  const [closureReasons, setClosureReasons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    fetchClosureReasons();
  }, []);

  const fetchClosureReasons = async () => {
    try {
      const token = sessionStorage.getItem('jwttoken');
      if (!token) {
        console.error('JWT Token not found');
        return;
      }

      const response = await fetch('http://localhost:8080/api/closureReason/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      
      const data = await response.json();
      console.log('Fetched Closure Reasons:', data); // Debugging
      setClosureReasons(data);
    } catch (error) {
      console.error('Error fetching closure reasons:', error);
    }
  };

  const filteredClosureReasons = closureReasons.filter(reason => 
    reason?.closureReasonDesc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Closure Reason Master
        </Typography>
        <TextField
          label="Search by Closure Reason"
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
        {filteredClosureReasons.map(reason => (
          <ListItem key={reason.closureReasonId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <ListItemText
              primary={`ID: ${reason.closureReasonId}`}
              secondary={`Enquirer Name: ${reason.enquirerName || 'N/A'} | Reason: ${reason.closureReasonDesc || 'N/A'}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ClosureReasonComponent;
