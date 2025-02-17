import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const RegistrationComponent = ({ selectedEnquiry }) => {

  console.log(selectedEnquiry);

  const [formData, setFormData] = useState({
    studentName: "",
    studentAddress: "",
    studentGender: "",
    photoUrl: "",
    studentDob: dayjs(),
    studentQualification: "",
    studentMobile: "",
    batch: { batchId: 1 },
    course: { courseId: 1 },
  });

  useEffect(() => {
    if (selectedEnquiry) {
      setFormData({
        studentName: selectedEnquiry.studentName ? selectedEnquiry.studentName : selectedEnquiry.enquirerName,
        studentAddress: selectedEnquiry.enquirerAddress,
        studentMobile: selectedEnquiry.enquirerMobile,
        studentEmail: selectedEnquiry.enquirerEmailId,
      });
    }
  }, [selectedEnquiry]);

  const batches = [
    { batch: 1, batchName: "Unstoppables" },
    { batch: 2, batchName: "DATA OPERATORS" },
    { batch: 3, batchName: "precats" },
  ];

  const courses = [
    { course: 1, courseName: "PG DAC" },
    { course: 2, courseName: "PG DBDA" },
    { course: 3, courseName: "PRE CAT" },
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      ...(name === "course"
        ? { course: { ...formData.course, courseId: Number(value) } }
        : name === "batch"
          ? { batch: { ...formData.batch, batchId: Number(value) } }
          : { [name]: value })
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // formData.staff = { staffId: 1 }; // Hardcoding staffId to 1 for now

    const formattedData = {
      ...formData,
      studentDob: formData.studentDob ? dayjs(formData.studentDob).format("YYYY-MM-DD") : null,
    };

    console.log(formattedData);

    const response = await fetch(`http://localhost:8080/api/student/add/${selectedEnquiry.enquiryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error("Failed to add Student");
    }

    const result = await response.json();
    toast.success(result.message || "Student registered successfully!");
    // await deleteEnquiryHandler();

    setFormData({
      studentName: "",
      studentAddress: "",
      studentGender: "",
      photoUrl: "",
      studentDob: dayjs(),
      studentQualification: "",
      studentMobile: "",
      batchId: "",
      courseId: "",
      studentEmail: "",
    });

    navigate("/");
  };

  const deleteEnquiryHandler = async () => {
    const id = selectedEnquiry?.enquiryId;

    if (!id) return;

    try {
      const response = await fetch(`http://localhost:8080/api/enquiry/delete/${id}`, {
        method: "DELETE",
      });

    if (!response.ok) {
      throw new Error(response.status === 404 ? "Enquiry not found!" : "Failed to delete enquiry");
    }

    toast.success("Enquiry deleted successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};

return (
  <Container maxWidth="sm" sx={{ py: 6 }}>
    <Toaster />
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#1A1A1D", // Darker Maroon
          fontWeight: "bold",
          fontFamily: "'Arial', sans-serif",
          transition: "color 0.3s, transform 0.3s",
          "&:hover": {
            color: "#A64D79",
            transform: "scale(1.02)", // Adding a slight scaling effect on hover
          },
        }}
      >
        Student Registration
      </Typography>


    </Box>
    <Card
      sx={{
        boxShadow: 6,
        borderRadius: 3,
        backgroundColor: "#FEFFFF",
        backgroundImage: "linear-gradient(135deg, #FEFFFF 30%, #F5F7FA 100%)",
        border: "1px solid #DDD",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="studentAddress"
                value={formData.studentAddress}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="studentMobile"
                type="number"
                value={formData.studentMobile}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qualification"
                name="studentQualification"
                value={formData.studentQualification}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.studentDob}
                  onChange={(newValue) => handleDateChange("studentDob", newValue)}
                  fullWidth
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="studentGender"
                  value={formData.studentGender}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    backgroundColor: "#FEFFFF",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      boxShadow: 2,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Photo URL"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  backgroundColor: "#FEFFFF",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Batch</InputLabel>
                <Select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  required
                  displayEmpty
                  sx={{
                    backgroundColor: "#FEFFFF",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      boxShadow: 2,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Batch
                  </MenuItem>
                  {batches.map((tbatch) => (
                    <MenuItem key={tbatch.batch} value={tbatch.batch}>
                      {tbatch.batchName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  displayEmpty
                  sx={{
                    backgroundColor: "#FEFFFF",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      boxShadow: 2,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Course
                  </MenuItem>
                  {courses.map((tcourse) => (
                    <MenuItem key={tcourse.course} value={tcourse.course}>
                      {tcourse.courseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundImage: "linear-gradient(to right, #6A1E55, #A64D79)",
                  color: "#FEFFFF",
                  "&:hover": {
                    backgroundImage: "linear-gradient(to right, #A64D79, #6A1E55)",
                  },
                  py: 1.5,
                  mt: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                Register Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Container>
);
};

export default RegistrationComponent;
