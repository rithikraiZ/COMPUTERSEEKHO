import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../EnquiryList/Button";
import { Close } from "@mui/icons-material";
import "./Student.css";
// import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
// import {Close as CloseIcon} from "@mui/icons-material";
import {toast , Toaster} from "react-hot-toast";

const Students = () => {
  const navigate = useNavigate();

  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(studentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedStudents = studentList.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/student/all");
        if (!response.ok) throw new Error("Something went wrong!");
        const result = await response.json();
        setStudentList(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchStudentList();
  }, []);

  const deleteHandler = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/student/delete/${studentId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Something went wrong!");
      const updatedStudentList = studentList.filter((student) => student.studentId !== studentId);
      toast.success("Student deleted successfully!");
      setStudentList(updatedStudentList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="list-container">
      <Toaster />
      <h2 className="list-title">Students</h2>
      <table className="enquiry-table">
        <thead>
          <tr>
            <th className="enquiry-header">PRN</th>
            <th className="enquiry-header">Student Name</th>
            <th className="enquiry-header">Mobile</th>
            <th className="enquiry-header">Student Email</th>
            <th className="enquiry-header">Course</th>
            <th className="enquiry-header">Batch</th>
            <th className="enquiry-header">Balance Fees</th>
            {/* <th className="enquiry-header">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student) => (
            <tr key={student.studentId} className="enquiry-row">
              {/* <td className="enquiry-details">{enquiry.studentName}</td> */}
              <td className="followup-count">{student.studentId}</td>
              <td className="followup-count">{student.studentName}</td>
              <td className="followup-count">{student.studentMobile}</td>
              <td className="followup-count">{student.studentEmail}</td>
              <td className="followup-count">{student.courseName}</td>
              <td className="followup-count">{student.batchName}</td>
              <td className="followup-count">{student.paymentDue}</td>
              {/* <td className="enquiry-actions">
                <Button
                  className="btn close"
                  onClick={() => deleteHandler(student.studentId)}
                >
                  <Close /> Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn pagination-btn"
        >
          Previous
        </Button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn pagination-btn"
        >
          Next
        </Button>
      </div>
      {/* <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'hidden',
            padding: '20px',
          },
        }}
      >
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <RegistrationComponent selectedEnquiry={selectedEnquiry} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Students;
