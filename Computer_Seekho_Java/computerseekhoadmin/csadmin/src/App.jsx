import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminNavbar from "./Components/Navbar/AdminNavbar.jsx";
import ListComponent from "./Components/EnquiryList/ListComponent.jsx";
import AddEnquiryComponent from "./Components/EnquiryRegister/AddEnquiryComponent.jsx";
import RegistrationComponent from "./Components/StudentRegister/RegistrationComponent.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HeaderComponent from "./Components/Navbar/HeaderComponent.jsx";
import FooterComponent from "./Components/Navbar/FooterComponent.jsx";
import TableComponent from "./Components/Tables/TableComponent.jsx";
import CourseComponent from "./Components/Tables/CourseComponent.jsx";
import StaffComponent from "./Components/Tables/StaffComponent.jsx";
import PaymentComponent from "./Components/Tables/PaymentComponent.jsx";
import Login from "./Components/Login/Login";
import Student from "./Components/Student/Student.jsx";
import OnlineEnquiries from "./Components/OnlineEnquiries/OnlineEnquiries.jsx";
import BatchComponent from "./Components/Tables/BatchComponent.jsx";
import ClosureReasonComponent from "./Components/Tables/ClosureReasonComponent.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  
  const handleCloseEnquiry = (id) => {
    setEnquiries(enquiries.filter((enquiry) => enquiry.id !== id));
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }


  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HeaderComponent />
      <AdminNavbar />
      
      <div style={{ marginTop: "70px", paddingBottom: "50px" }}>
        <Routes>
          <Route path="/" element={<ListComponent onClose={handleCloseEnquiry} />} />
          <Route path="/listcomponent" element={<ListComponent onClose={handleCloseEnquiry} />} />
          <Route path="/add-enquiry" element={<AddEnquiryComponent />} />
          <Route path="/online-enquiries" element={<OnlineEnquiries />} />
          <Route path="/table" element={<TableComponent />} />
          <Route path="/students" element={<Student />} />
          <Route path="/register" element={<RegistrationComponent />} />
          <Route path="/table/courses" element={<CourseComponent />} />
          <Route path="/table/batches" element={<BatchComponent />} />
          <Route path="/table/staff" element={<StaffComponent />} />
          <Route path="/table/payment" element={<PaymentComponent />} />
          <Route path="/table/closure-reason" element={<ClosureReasonComponent />} />
          </Routes>
      </div>
      <FooterComponent style={{bottom:0}} />
    </LocalizationProvider>
  );
};

export default App;
