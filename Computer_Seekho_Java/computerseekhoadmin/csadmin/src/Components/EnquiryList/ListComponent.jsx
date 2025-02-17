import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Call, PersonAdd, Close } from "@mui/icons-material";
import "./ListComponent.css";
import RegistrationComponent from "../StudentRegister/RegistrationComponent";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import {toast , Toaster} from "react-hot-toast";
import UpdateMessage from "./UpdateMessage";

const ListComponent = ({ onClose }) => {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [enquiryId, setEnquiryId] = useState(0);
  const [dialogtitle, setDialogTitle] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState("")

  const itemsPerPage = 4;
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEnquiries = enquiries.slice(startIndex, startIndex + itemsPerPage);

  const jwttoken = sessionStorage.getItem('jwttoken');
  if (!jwttoken) {
    navigate("/login");
  }
  const payloadB64 = jwttoken.split('.')[1];
  const payload = JSON.parse(atob(payloadB64));
  const username = payload.username;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/enquiry/getByStaff/${username}`);
        if (!response.ok) throw new Error("No Enquiries!");
        const result = await response.json();
        setEnquiries(result);
      } catch (error) {
        // toast.error(error.message);
      }
    };
    fetchEnquiries();
  }, []);

  const openRegisterForm = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (newMessage) => {
    if (event === "Update") {
      handleUpdateMessage(newMessage);
    }
    else if (event === "Close") {
      closeEnquiry(newMessage);
    }
    closeDialog();
  };

  const handleUpdateMessage = async (message) => {
      const response = await fetch(`http://localhost:8080/api/enquiry/updateEnquirerQuery/${enquiryId}`, {
          method: "PUT", headers:{"Content-Type": "application/json"}, body: JSON.stringify(message),
      });
      if (response.status === 200) {
          toast.success("Updated...")
      }
      else{
          toast.error("There was a problem updating..")
      }
  }
  
  const closeEnquiry = async (message) => {
      const response = await fetch(`http://localhost:8080/api/enquiry/deactivate/${enquiryId}`, {
          method: "PUT", headers:{"Content-Type": "application/json"}, body: JSON.stringify(message),
      });
      if (response.status === 200) {
          setEnquiries((prevEnquiry) => prevEnquiry.filter((enquiry) => enquiry.enquiryId !==enquiryId));
          toast.success("Closed...")
      }
      else{
          toast.error("There was a problem closing..")
      }
  }

  return (
    <div className="list-container">
    <Toaster />
      <h2 className="list-title">Pending Enquiries</h2>
      <table className="enquiry-table">
        <thead>
          <tr>
            <th className="enquiry-header">Student Name</th>
            <th className="enquiry-header">Course</th>
            <th className="enquiry-header">Mobile</th>
            <th className="enquiry-header">Followup Date</th>
            <th className="enquiry-header">Followups</th>
            <th className="enquiry-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedEnquiries.map((enquiry) => (
            <tr key={enquiry.enquiryId} className="enquiry-row">
              {/* <td className="enquiry-details">{enquiry.studentName}</td> */}
              <td className="followup-count">{enquiry.studentName ? enquiry.studentName : enquiry.enquirerName}</td>
              <td className="followup-count">{enquiry.courseName}</td>
              <td className="followup-count">{enquiry.enquirerMobile}</td>
              <td className="followup-count">{enquiry.followUpDate}</td>
              <td className="followup-count">{enquiry.enquiryCounter}</td>
              <td className="enquiry-actions">
                <Button className="btn call"
                 onClick={() => {
                   setEvent("Update")
                   setEnquiryId(enquiry.enquiryId);
                   setDialogTitle("Write Message for Follow-Up")
                   openDialog();
                 }}>
                  <Call /> Call
                </Button>
                <Button
                  className="btn register"
                  onClick={() => openRegisterForm(enquiry)}
                >
                  <PersonAdd /> Register
                </Button>
                <Button
                  className="btn close"
                  onClick={() => {
                   setEvent("Close")
                   setEnquiryId(enquiry.enquiryId);
                   setDialogTitle("Enter Closure Message")
                   openDialog();
                 }}
                >
                  <Close /> Close
                </Button>
              </td>
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
      <Dialog
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
      </Dialog>
      <UpdateMessage isOpen={isDialogOpen} onClose={closeDialog} onUpdate={handleUpdate} dialogTitle={dialogtitle}/>
    </div>
  );
};

export default ListComponent;
