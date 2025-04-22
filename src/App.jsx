// App.jsx
import React, { useState, useEffect } from 'react';
import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Header from './components/Header.jsx';
import Home_ALL from './Home_ALL.jsx';
import Education from './components/Education.jsx';
import Footer from './components/Footer.jsx';
import Projects from './components/Projects.jsx';
import PageBanner from './components/PageBanner.jsx'; // Import the PageBanner component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import './assets/css/style.css';
import Loading from './Loading.jsx'; // Import Loading component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/record-visit/`);
      } catch (error) {
        console.error('Error recording visit:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    recordVisit();
  }, []);

  return (
    <>
      <Router>
        <Header />
        {loading ? (
          <Loading /> // Show loading spinner while data is being fetched
        ) : (
          <Routes>
            <Route path="/" element={<Home_ALL />} />
            <Route path="/about" element={
              <>
                <PageBanner
                  title="About Me"
                  intro="Discover who I am, my journey, and my passions."
                  backgroundImage="https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
                <About />
              </>
            } />
            <Route path="/skills" element={
              <>
                <PageBanner
                  title="Skills"
                  intro="Explore my technical and professional skills."
                  backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
                <Skills />
              </>
            } />
            <Route path="/education" element={
              <>
                <PageBanner
                  title="Education"
                  intro="Learn about my academic background and training."
                  backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
                <Education />
              </>
            } />
            <Route path="/experience" element={
              <>
                <PageBanner
                  title="Experience"
                  intro="Browse through my professional experiences and projects."
                  backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
                <Experience />
              </>
            } />
            <Route path="/projects" element={
              <>
                <PageBanner
                  title="Projects"
                  intro="Discover the projects I have worked on."
                  backgroundImage="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                />
                <Projects />
              </>
            } />
            <Route path="/contact" element={
              <>
                <PageBanner
                  title="Contact"
                  intro="Contact me for any questions or collaborations."
                  backgroundImage="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
                <Contact />
              </>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        <Footer />
      </Router>
      <a href="#home_ALL" aria-label="ScrollTop" className="fas fa-angle-up" id="scroll-top"></a>
    </>
  );
}

export default App;
