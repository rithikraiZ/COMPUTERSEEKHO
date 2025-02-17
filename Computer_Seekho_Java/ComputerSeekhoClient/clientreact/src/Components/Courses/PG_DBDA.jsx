import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global styles to ensure the page looks consistent
const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8; // Lighter background for the entire page
    transition: background-color 0.5s ease;
  }
`;

// Main container to hold everything
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #f0f4f8;
  transition: padding 0.5s ease;
`;

// Card to hold the course details with dark blue background
const CourseCard = styled.div`
  display: flex;
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  width: 100%;
  max-width: 1600px; // Increased max-width to make the card a bit larger
  background: rgb(4, 17, 29); // Dark blue background
  color: #fff; // Text color set to white for contrast
  border-radius: 20px; // Slightly more rounded corners
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-bottom: 40px;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    transform: translateY(-12px); // Slightly increased hover effect
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    max-width: 1200px; // Adjust max-width for smaller screens
  }

  @media (max-width: 768px) {
    max-width: 100%; // Full width for mobile devices
    padding: 20px; // Add padding for smaller screens
  }
`;

// Image section with padding and centered within the card
const CourseImage = styled.div`
  width: 380px;  // Increased width
  height: 380px; // Increased height
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-color: #f0f0f0;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  margin: 20px; // Added margin around the image to keep it away from card borders

  &:hover {
    transform: scale(1.05); // Slight zoom effect on hover
  }

  @media (max-width: 1024px) {
    width: 320px;  // Increased size for tablet screens
    height: 320px;
  }

  @media (max-width: 768px) {
    width: 100%;  // Full width for smaller screens
    height: 280px;
    margin-bottom: 20px;
  }
`;

// Course details section
const CourseDetailsWrapper = styled.div`
  width: calc(100% - 380px);  // Adjust width accordingly with image width of 350px
  padding: 40px;
  background-color: transparent; // Transparent background to let dark blue show
  color: #fff; // White text for better contrast
  transition: padding 0.3s ease;
  animation: fadeIn 1s ease-out;

  @media (max-width: 1024px) {
    width: calc(100% - 320px); // Adjust width for tablet screens
  }

  @media (max-width: 768px) {
    width: 100%; // Full width for mobile screens
    padding: 20px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// Title styling with a readable color and animation
const Title = styled.h1`
  font-size: 36px;
  color: #82a3ff; // Light blue for headings
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  text-transform: capitalize; // Only first letter capitalized
  letter-spacing: 2px;
  transition: color 0.3s ease;
  animation: fadeIn 1.5s ease-out;

  &:hover {
    color: #4b6cb7;  // Darker blue on hover
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// Subtitle styling with a readable color and animation
const SubTitle = styled.h2`
  font-size: 28px;
  color: #82a3ff; // Light blue for subheadings
  margin-bottom: 20px;
  animation: fadeIn 2s ease-out;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Paragraph styling with added hover effect
const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin: 10px 0;
  color: #ccc; // Lighter color for paragraphs
  transition: color 0.3s ease;
  animation: fadeIn 2.5s ease-out;

  &:hover {
    color: #fff; // Hover effect for white text
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Strong text for emphasis
const StrongText = styled.strong`
  font-weight: 600;
  color: #82a3ff; // Light blue for emphasis
`;

// Loader styling
const Loader = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #4b6cb7;
`;

// Error message styling
const ErrorText = styled.div`
  color: red;
  font-size: 20px;
  text-align: center;
  color: #4b6cb7;
`;

// Video section placeholder with subtle animation
const VideoSection = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 30px;
  text-align: center;
  color: rgb(11, 131, 243);
  margin-top: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Custom styled component for the syllabus with line break
const SyllabusText = styled.p`
  white-space: pre-line;
`;

// Keyframes for text animation
const textAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animated text component
const AnimatedText = styled.div`
  opacity: 0;
  animation: ${textAnimation} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const PG_DBDA = () => {
  const [course, setCourse] = useState(null);  // Changed to hold a single course
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data from the API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/course/getById/2');
        if (!response.ok) {
          throw new Error(`Failed to fetch course. Status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // Handling loading state
  if (loading) return <Loader>Loading...</Loader>;

  // Handling error state
  if (error) return <ErrorText>Error: {error}</ErrorText>;

  // If no course is found
  if (!course) return <ErrorText>No course found.</ErrorText>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <CourseCard key={course.courseId}>
          {/* Image Section */}
          <CourseImage
            style={{ backgroundImage: `url(${course.coverPhoto})` }}
          />

          {/* Course Details Section */}
          <CourseDetailsWrapper>
            <AnimatedText delay="0.2s">
              <Title>{course.courseName}</Title>
            </AnimatedText>
            <AnimatedText delay="0.4s">
              <SubTitle>Course Overview</SubTitle>
            </AnimatedText>
            <AnimatedText delay="0.6s">
              <Paragraph><StrongText>Description:</StrongText> {course.courseDescription}</Paragraph>
            </AnimatedText>
            <AnimatedText delay="0.8s">
              <Paragraph><StrongText>Duration:</StrongText> {course.courseDuration} months</Paragraph>
            </AnimatedText>
            <AnimatedText delay="1s">
              <Paragraph><StrongText>Fee:</StrongText> ₹ {course.courseFee}</Paragraph>
            </AnimatedText>
            <AnimatedText delay="1.2s">
              <SyllabusText><StrongText>Syllabus:</StrongText> {course.courseSyllabus}</SyllabusText>
            </AnimatedText>
          </CourseDetailsWrapper>
        </CourseCard>
      </Container>
    </>
  );
};

export default PG_DBDA;