import React, { useState, useEffect } from 'react';
import './OurRecruiters.css'; // Updated CSS file name

const OurRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recruiter/all'); // API endpoint to fetch all recruiters
        if (!response.ok) {
          throw new Error('Failed to fetch recruiters data');
        }
        const data = await response.json();
        setRecruiters(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  if (loading) {
    return <div className="recruiters-loading">Loading recruiters...</div>;
  }

  if (error) {
    return <div className="recruiters-error">Error: {error}</div>;
  }

  return (
    <div className="recruiters-sections">
      <header className="recruiters-header">
        <h1 className="recruiters-titles">
          Our <span className="highlight">Top Hiring Partners</span>
        </h1>
        <p className="recruiters-subtitles">Discover Opportunities with Industry Leaders</p>
      </header>
      <div className="recruiters-grid"> {/* Updated class name */}
        {recruiters.map((recruiter, index) => (
          <div key={index} className="recruiter-cards">
            <div className="recruiter-icon-container">
              {/* Display logo if available; fallback to name's first letter */}
              {recruiter.recruiterPhoto ? (
                <img
                  src={recruiter.recruiterPhoto}
                  alt={recruiter.recruiterName}
                  className="recruiter-logos"
                />
              ) : (
                <span>{recruiter.recruiterName.charAt(0)}</span>
              )}
            </div>
            <h3 className="recruiter-names">{recruiter.recruiterName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurRecruiters;