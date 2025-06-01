import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Banner1 from './components/Banner1.jsx';Banner1
import Banner from './components/Banner.jsx';
import Projects from './components/Projects.jsx';
// import Appointment from './Appointment.jsx';

// import './assets/css/style.css';
// import './assets/css/404.css';

import ScrollReveal from 'scrollreveal';
import Typed from 'typed.js';
import VanillaTilt from 'vanilla-tilt';

function App() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href*="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });

    const typed = new Typed('.typing-text', {
      strings: ['web development', 'DEVOPS'],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    });

    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 15 });

    const handleVisibilityChange = () => {
      const favicon = document.getElementById('favicon');
      if (document.visibilityState === 'visible') {
        document.title = 'Portfolio | Nilsen Tovohery';
        favicon.setAttribute('href', 'assets/images/favicon.png');
      } else {
        // document.title = 'Come Back To Portfolio';
        favicon.setAttribute('href', 'assets/images/favhand.png');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      typed.destroy();
    };
  }, []);

  return (
    <>
      {/* 🔥 SEO via react-helmet */}
      <Helmet>
        <title>Portfolio | Nilsen Tovohery - Développeur Full Stack & DevOps</title>
        <meta
          name="description"
          content="Bienvenue sur le portfolio de Nilsen Tovohery, développeur Full Stack et DevOps. Découvrez mes projets, compétences et parcours."
        />
        <meta name="keywords" content="Nilsen Tovohery, Full Stack, DevOps, React, Django ,laravel, Portfolio" />
        <meta name="author" content="Nilsen Tovohery" />
        <meta property="og:title" content="Portfolio | Nilsen Tovohery" />
        <meta property="og:description" content="Développeur Full Stack & DevOps. Découvrez mon travail !" />
        <meta property="og:image" content="https://tonsite.com/assets/images/preview.png" />
        <meta property="og:url" content="https://portfolio-nilsen.unityfianar.site" />
        <link rel="canonical" href="https://portfolio-nilsen.unityfianar.site" />
      </Helmet>

      {/* 🧩 Ton site */}
      <Header />
      <Home />
      
      <About />
      <Banner />
      <Skills />

      <Experience />
      <Banner1 />
      <Projects />
      <Contact />
      {/* <Footer /> */}

      <a href="#home" aria-label="ScrollTop" className="fas fa-angle-up" id="scroll-top"></a>
    </>
  );
}

export default App;
