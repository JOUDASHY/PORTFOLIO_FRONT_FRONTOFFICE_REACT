import React, { useEffect } from 'react';

import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Header from './components/Header.jsx';
import Home_ALL from './Home_ALL.jsx';
import Education from './components/Education.jsx';
import Footer from './components/Footer.jsx';
import Projects from './components/Projects.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import './assets/css/style.css';
import './assets/css/404.css';


function App() {

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/record-visit/`);
      } catch (error) {
        console.error('Error recording visit:', error);
      }
    };

    recordVisit();
  }, []);

    return (
      <>
        <Router>
          <Header />
          <Routes>
            {/* Déclarez vos routes ici */}
            <Route path="/" element={<Home_ALL />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            {/* Redirection si la route n'existe pas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </Router>
        <a href="#home_ALL" aria-label="ScrollTop" className="fas fa-angle-up" id="scroll-top"></a>
      </>
    );
    

}

export default App;
