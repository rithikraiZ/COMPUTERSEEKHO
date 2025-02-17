import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, List, ListItem, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Select, MenuItem
} from '@mui/material';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2',
  white: '#FFFFFF'
};

const PaymentComponent = () => {
  const [payments, setPayments] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentTypeId: ''
  });
  const [message, setMessage] = useState({ text: '', severity: 'info' });

  useEffect(() => {
    fetchPayments();
    fetchPaymentTypes();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payment/all');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      setMessage({ text: 'Error fetching payments.', severity: 'error' });
    }
  };

  const fetchPaymentTypes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/paymentType/all');
      if (response.ok) {
        const data = await response.json();
        setPaymentTypes(data);
      } else {
        setMessage({ text: 'Failed to fetch payment types.', severity: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Server error while fetching payment types.', severity: 'error' });
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/student/all');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setMessage({ text: 'Error fetching students.', severity: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
  };

  const handleAddPayment = async () => {
    const selectedPaymentType = paymentTypes.find(type => type.paymentTypeId === Number(paymentForm.paymentTypeId));

    const formattedPaymentData = {
      student: { studentId: Number(paymentForm.studentId) },
      amount: parseFloat(paymentForm.amount),
      paymentDate: paymentForm.paymentDate,
      paymentType: {
        paymentTypeId: Number(paymentForm.paymentTypeId),
        paymentTypeDesc: selectedPaymentType ? selectedPaymentType.paymentTypeDesc : "Unknown"
      }
    };

    console.log("Sending JSON Data:", JSON.stringify(formattedPaymentData, null, 2));

    try {
      const response = await fetch('http://localhost:8080/api/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedPaymentData)
      });

      if (response.ok) {
        setMessage({ text: 'Payment added successfully!', severity: 'success' });
        fetchPayments();
        setOpenDialog(false);
      } else {
        const errorText = await response.json();
        setMessage({ text: `Failed to add payment: ${errorText.message}`, severity: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Server error: ${error.message}` });
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>Payment History</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.accent, color: colors.white }}
          onClick={() => setOpenDialog(true)}
        >
          Add Payment
        </Button>
      </Box>
      <List>
        {payments.map(payment => (
          <ListItem key={payment.paymentId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
            <ListItemText
              primary={`Payment ID: ${payment.paymentId}`}
              secondary={`Student: ${payment.student?.studentName || 'N/A'} | Amount: ${payment.amount} | Date: ${payment.paymentDate} | Type: ${payment.paymentType?.paymentTypeDesc || 'Unknown'}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            name="studentId"
            value={paymentForm.studentId}
            onChange={handleInputChange}
            sx={{ marginBottom: '20px' }}
          >
            <MenuItem value="" disabled>Select Student</MenuItem>
            {students.map(student => (
              <MenuItem key={student.studentId} value={student.studentId}>{student.studentName}</MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            value={paymentForm.amount}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label="Payment Date"
            name="paymentDate"
            type="date"
            value={paymentForm.paymentDate}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: '20px' }}
          />
          <Select
            fullWidth
            name="paymentTypeId"
            value={paymentForm.paymentTypeId}
            onChange={handleInputChange}
            sx={{ marginBottom: '20px' }}
          >
            <MenuItem value="" disabled>Select Payment Type</MenuItem>
            {paymentTypes.map(type => (
              <MenuItem key={type.paymentTypeId} value={type.paymentTypeId}>{type.paymentTypeDesc}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: colors.secondary }}>Cancel</Button>
          <Button
            onClick={handleAddPayment}
            variant="contained"
            sx={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!message.text} autoHideDuration={4000} onClose={() => setMessage({ text: '', severity: 'info' })}>
        <Alert severity={message.severity}>{message.text}</Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentComponent;