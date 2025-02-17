import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const options = [
  { name: 'Courses', path: '/table/courses', icon: <SchoolIcon /> },
  { name: 'Batches', path: '/table/batches', icon: <SchoolIcon /> },
  { name: 'Staff', path: '/table/staff', icon: <GroupIcon /> },
  { name: 'Payment', path: '/table/payment', icon: <AttachMoneyIcon /> },
  { name: 'Closure-reason', path: '/table/closure-reason', icon: <GroupIcon /> },
];

const colors = {
  primary: '#6A1E55',
  secondary: '#A64D79',
  light: '#FEFFFF',
  text: '#1A1A1D'
};

const TableComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.light,
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: colors.primary, mb: 4, fontFamily: "'Roboto Slab', serif", fontWeight: 700, textAlign: 'center' }}
      >
        Tables
      </Typography>
      <Grid container spacing={3}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              component="div"
              sx={{
                backgroundColor: colors.white,
                color: colors.text,
                padding: '30px',
                borderRadius: '8px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '250px',
                width: '100%',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                  backgroundColor: colors.primary,
                  color: colors.light,
                },
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                {React.cloneElement(option.icon, { sx: { fontSize: 60, mb: 2, color: 'inherit' } })}
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "'Roboto Slab', serif", fontWeight: 700, mb: 2 }}
                >
                  {option.name}
                </Typography>
                <Button
                  component={Link}
                  to={option.path}
                  variant="contained"
                  sx={{
                    backgroundColor: colors.primary,
                    color: colors.light,
                    '&:hover': {
                      backgroundColor: colors.secondary,
                    },
                  }}
                >
                  View
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TableComponent;
