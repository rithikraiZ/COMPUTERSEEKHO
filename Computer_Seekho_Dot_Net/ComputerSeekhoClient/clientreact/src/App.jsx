import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './Components/Navbar/MainNavbar';
import MarqueeHeader from './Components/Header/MarqueeHeader';
import Home from './Components/Home/Home';
import CourseBatch from './Components/Placement/CourseBatch';
import StudentPlaced from './Components/Placement/StudentPlaced';
import OurRecruiters from './Components/Placement/OurRecruiters';
import Courses from './Components/Courses/Courses';
import PG_DAC from './Components/Courses/PG_DAC';
import PG_DBDA from './Components/Courses/PG_DBDA';
import PRE_CAT from './Components/Courses/PRE_CAT';
import CampusLife from './Components/CampusLife/CampusLife';
import Faculty from './Components/Faculty/Faculty';
import GetInTouch from './Components/GetInTouch/GetInTouch';
import Footer from './Components/Footer/Footer';
import './App.css';

const App = () => {
  // Array of courses
  const courses = [
    { path: '/pg-dac', component: <PG_DAC /> },
    { path: '/pg-dbda', component: <PG_DBDA /> },
    { path: '/pre-cat', component: <PRE_CAT /> },
  ];

  return (
    <Router>
      <div className="fixed-header">
        <MarqueeHeader />
        <MainNavbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/batchwiseplacement" element={<CourseBatch />} />
          <Route path="/batch/:batchId" element={<StudentPlaced />} />
          <Route path="/ourrecruiters" element={<OurRecruiters />} />
          <Route path="/courses" element={<Courses />} />
          {/* Map through the courses array to create routes */}
          {courses.map((course, index) => (
            <Route key={index} path={course.path} element={course.component} />
          ))}
          <Route path="/campuslife" element={<CampusLife />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/getintouch" element={<GetInTouch />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;