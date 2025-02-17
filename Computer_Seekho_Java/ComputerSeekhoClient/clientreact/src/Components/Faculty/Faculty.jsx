import React, { useEffect, useState } from 'react';
import './Faculty.css'; // You can keep the CSS file for styling

const Faculty = () => {
  const [facultyData, setFacultyData] = useState([]);

  // Fetch faculty data from the database
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/staff/allTeaching');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFacultyData(data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <div className="faculty-container">
      <div className="faculty-header">
        <h1>Our Faculty</h1>
        <p>Meet our experienced and dedicated faculty members</p>
      </div>
      <div className="faculty-list">
        {facultyData.map((faculty) => (
          <div className="faculty-member" key={faculty.staffId}>
            <img src={faculty.photoUrl} alt={faculty.staffName} />
            <div className="faculty-details">
              <h2>{faculty.staffName}</h2>
              <p className="position">{faculty.staffRole || 'Faculty Member'}</p>
              {/* Description intentionally left empty as per request */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;