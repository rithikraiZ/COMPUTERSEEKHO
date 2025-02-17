import React from 'react';
import './WhyChoose.css'; // Import the CSS file for styling

const WhyChoose = () => {
  return (
    <div className="why-choose-container">
      <h2 className="section-title">Why Choose Edusity?</h2>
      <p className="section-description">
        Our Institute has been present for over 20 years in the market. We make the most of all our students.
      </p>
      <div className="reasons-grid">
        <div className="reason-card">
          <h3 className="reason-title">Best in class Infrastructure</h3>
        </div>
        <div className="reason-card">
          <h3 className="reason-title">Best Faculty/Teachers</h3>
        </div>
        <div className="reason-card">
          <h3 className="reason-title">Best Learning Methodology</h3>
        </div>
        <div className="reason-card">
          <h3 className="reason-title">More than 95% Placement for 10 Consecutive batches</h3>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;