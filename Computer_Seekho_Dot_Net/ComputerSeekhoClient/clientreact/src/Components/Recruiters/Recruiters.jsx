import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Recruiters.css';

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  // Fetch recruiters data
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recruiter/all'); // API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch recruiters data');
        }
        const data = await response.json();
        // Limit to 5 recruiters
        setRecruiters(data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  if (loading) {
    return <div className="recruiters-main-section">Loading recruiters...</div>;
  }

  if (error) {
    return <div className="recruiters-main-section">Error: {error}</div>;
  }

  return (
    <div className="recruiters-main-section">
      <h2 className="recruiters-main-title">Major Recruiters</h2>
      <div className="recruiters-main-grid">
        {recruiters.map((recruiter, index) => (
          <div key={index} className="recruiters-main-card">
            <img
              src={recruiter.recruiterPhoto || 'https://via.placeholder.com/100'} // Fallback to placeholder
              alt={recruiter.recruiterName}
              className="recruiters-main-logo"
            />
            <h3 className="recruiters-main-name">{recruiter.recruiterName}</h3>
          </div>
        ))}
      </div>
      <button
        className="recruiters-see-more-button"
        onClick={() => navigate('/ourrecruiters')} // Navigate to /ourrecruiters
      >
        SEE MORE
      </button>
    </div>
  );
};

export default Recruiters;