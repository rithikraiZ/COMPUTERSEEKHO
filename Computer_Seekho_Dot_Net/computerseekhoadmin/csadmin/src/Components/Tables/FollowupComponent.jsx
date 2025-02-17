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
const staticFollowups = [
  {
    followup_id: 1,
    enquiry_id: 1,
    staff_id: 1,
    followup_date: '2025-01-10',
    followup_msg: 'Follow up message 1',
    is_active: true,
  },
  {
    followup_id: 2,
    enquiry_id: 2,
    staff_id: 2,
    followup_date: '2025-02-15',
    followup_msg: 'Follow up message 2',
    is_active: false,
  },
  {
    followup_id: 3,
    enquiry_id: 3,
    staff_id: 3,
    followup_date: '2025-03-20',
    followup_msg: 'Follow up message 3',
    is_active: false,
  },
];

const FollowupComponent = () => {
  const [followups, setFollowups] = useState(staticFollowups); // Using static content
  const [searchQuery, setSearchQuery] = useState('');

  // Commented out fetchFollowups and other dynamic code
  /*
  const fetchFollowups = async () => {
    try {
      const response = await axios.get('/api/followups');
      setFollowups(response.data);
    } catch (error) {
      console.error('Error fetching followups:', error);
    }
  };

  useEffect(() => {
    fetchFollowups();
  }, []);

  const deleteFollowup = async (id) => {
    try {
      await axios.delete(`/api/followups/${id}`);
      setFollowups(followups.filter(followup => followup.followup_id !== id));
    } catch (error) {
      console.error('Error deleting followup:', error);
    }
  };
  */

  const filteredFollowups = Array.isArray(followups) ? followups.filter(followup =>
    followup.followup_msg.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Followup Master
        </Typography>
        <TextField
          label="Search by Followup Message"
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
        {filteredFollowups.map(followup => (
          <ListItem key={followup.followup_id} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <ListItemText
              primary={`Followup ID: ${followup.followup_id}`}
              secondary={`${followup.followup_msg} | Enquiry ID: ${followup.enquiry_id} | Staff ID: ${followup.staff_id}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => console.log('View followup', followup.followup_id)}>
                <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white, marginRight: '10px' }}>
                  View
                </Button>
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Edit followup', followup.followup_id)}>
                <EditIcon sx={{ color: colors.accent }} />
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Delete followup', followup.followup_id)}>
                <DeleteIcon sx={{ color: colors.secondary }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FollowupComponent;
