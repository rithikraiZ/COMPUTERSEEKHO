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
const staticEnquiries = [
  {
    enquiry_id: 1,
    enquirer_name: 'John Doe',
    enquirer_address: '123 Main St',
    enquirer_mobile: 1234567890,
    enquirer_alternate_mobile: 9876543210,
    enquirer_email_id: 'john.doe@example.com',
    enquiry_date: '2025-01-10',
    enquirer_query: 'What are the course fees?',
    closure_reason_id: 1,
    closure_reason: '',
    enquiry_processed_flag: true,
    course_id: 1,
    staff_id: 1,
    student_name: 'John Jr.',
    inquiry_counter: 1,
    follow_up_date: '2025-01-13',
  },
  {
    enquiry_id: 2,
    enquirer_name: 'Jane Smith',
    enquirer_address: '456 Elm St',
    enquirer_mobile: 5555555555,
    enquirer_alternate_mobile: 4444444444,
    enquirer_email_id: 'jane.smith@example.com',
    enquiry_date: '2025-02-15',
    enquirer_query: 'When do classes start?',
    closure_reason_id: 2,
    closure_reason: '',
    enquiry_processed_flag: false,
    course_id: 2,
    staff_id: 2,
    student_name: 'Jane Jr.',
    inquiry_counter: 2,
    follow_up_date: '2025-02-18',
  },
  {
    enquiry_id: 3,
    enquirer_name: 'Alice Johnson',
    enquirer_address: '789 Maple St',
    enquirer_mobile: 1111111111,
    enquirer_alternate_mobile: 2222222222,
    enquirer_email_id: 'alice.johnson@example.com',
    enquiry_date: '2025-03-20',
    enquirer_query: 'Can I get a scholarship?',
    closure_reason_id: 3,
    closure_reason: 'Other reasons',
    enquiry_processed_flag: false,
    course_id: 3,
    staff_id: 3,
    student_name: 'Alice Jr.',
    inquiry_counter: 3,
    follow_up_date: '2025-03-23',
  },
];

const EnquiryComponent = () => {
  const [enquiries, setEnquiries] = useState(staticEnquiries); // Using static content
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEnquiries = Array.isArray(enquiries) ? enquiries.filter(enquiry =>
    enquiry.enquirer_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Enquiry Master
        </Typography>
        <TextField
          label="Search by Enquirer Name"
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
        {filteredEnquiries.map(enquiry => (
          <ListItem key={enquiry.enquiry_id} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <ListItemText
              primary={<Typography sx={{ color: colors.primary, fontWeight: 'bold' }}>Enquirer: {enquiry.enquirer_name}</Typography>}
              secondary={<Typography sx={{ color: colors.secondary }}>Query: {enquiry.enquirer_query} | Date: {enquiry.enquiry_date} | Follow-up: {enquiry.follow_up_date}</Typography>}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => console.log('View enquiry', enquiry.enquiry_id)}>
                <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white, marginRight: '10px', borderRadius: '20px' }}>
                  View
                </Button>
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Edit enquiry', enquiry.enquiry_id)}>
                <EditIcon sx={{ color: colors.accent }} />
              </IconButton>
              <IconButton edge="end" onClick={() => console.log('Delete enquiry', enquiry.enquiry_id)}>
                <DeleteIcon sx={{ color: colors.secondary }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EnquiryComponent;
