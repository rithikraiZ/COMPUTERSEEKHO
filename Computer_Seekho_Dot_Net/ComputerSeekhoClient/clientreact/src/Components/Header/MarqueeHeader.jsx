import React, { useEffect, useState } from "react";
import './MarqueeHeader.css';

const MarqueeHeader = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setDark(true);
      } else {
        setDark(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`marquee-header ${dark ? 'dark' : ''}`}>
      <marquee behavior="scroll" direction="left" scrollamount="5">
        🎉 VITA Placements - 2025 Batch Hiring Started! Apply Now! 🎉
      </marquee>
    </div>
  );
};

export default MarqueeHeader;