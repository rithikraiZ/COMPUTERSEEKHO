import React from 'react';
import Courses from '../Courses/Courses';
import Title from '../Title/Title';
import CampusLifeHome from '../CampusLife/CampusLifeHome';
import Carousel from '../Carousel/Carousel';
import WhyChoose from '../WhyChoose/WhyChoose';
import './Home.css'; // Import the CSS file
import Recruiters from '../Recruiters/Recruiters';

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className='container'>
        <Title title='Our Courses' subTitle='What We Offer' />
        <div className='courses'>
          <Courses />
        </div>
        <Title title='Edusity' subTitle='Life At Edusity' />
        <div className='campus-life'>
          <CampusLifeHome />
          <Recruiters/>
          <WhyChoose />
        </div>
      </div>
    </div>
  );
}

export default Home;