import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainNavbar.css';
import logo from '../../assets/logo.png';
import MarqueeHeader from '../Header/MarqueeHeader';

const MainNavbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open state
  };

  return (
    <>
      <MarqueeHeader />
      <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
        <img src={logo} alt="logo" className='logo' />
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={menuOpen ? 'show' : ''}>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropbtn">Placement</span>
            <div className="dropdown-content">
              <Link to="/batchwiseplacement">Batchwise Placement</Link>
              <Link to="/ourrecruiters">Our Recruiters</Link>
            </div>
          </li>
          <li className="dropdown">
            <span className="dropbtn">Courses</span>
            <div className="dropdown-content">
              <Link to="/pg-dac">PG DAC</Link>
              <Link to="/pg-dbda">PG DBDA</Link>
              <Link to="/pre-cat">PRE-CAT</Link>
            </div>
          </li>
          <li><Link to="/campuslife">Campus Life</Link></li>
          <li><Link to="/faculty">Faculty</Link></li>
          <li><Link to="/getintouch" className='btn'>Get In Touch</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default MainNavbar;