import React, { useEffect } from 'react';

import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Education from './components/Education.jsx';
import Footer from './components/Footer.jsx';
import Projects from './components/Projects.jsx';

import './assets/css/style.css';
import './assets/css/404.css';

// Import external libraries (ensure these are installed via npm)
import ScrollReveal from 'scrollreveal';
import Typed from 'typed.js';
import VanillaTilt from 'vanilla-tilt';

function App() {
  useEffect(() => {
    // ScrollReveal configuration
    // const srtop = ScrollReveal({
    //   origin: 'top',
    //   distance: '80px',
    //   duration: 1000,
    //   reset: true,
    // });

    // srtop.reveal('.about .content h3', { delay: 200 });
    // srtop.reveal('.about .content .tag', { delay: 200 });
    // srtop.reveal('.about .content p', { delay: 200 });
    // srtop.reveal('.about .content .box-container', { delay: 200 });
    // srtop.reveal('.about .content .resumebtn', { delay: 200 });
    // srtop.reveal('.skills .container', { interval: 200 });
    // srtop.reveal('.skills .container .bar', { delay: 400 });
    // srtop.reveal('.education .box', { interval: 200 });
    // srtop.reveal('.work .box', { interval: 200 });
    // srtop.reveal('.experience .timeline', { delay: 400 });
    // srtop.reveal('.experience .timeline .container', { interval: 400 });
    // srtop.reveal('.contact .container', { delay: 400 });
    // srtop.reveal('.contact .container .form-group', { delay: 400 });

    // // Menu Toggle
    // const menu = document.getElementById('menu');
    // const navbar = document.querySelector('.navbar');
    // const toggleMenu = () => {
    //   menu.classList.toggle('fa-times');
    //   navbar.classList.toggle('nav-toggle');
    // };
    // menu.addEventListener('click', toggleMenu);

    // // Scroll Event
    // const scrollTop = document.getElementById('scroll-top');
    // const handleScroll = () => {
    //   if (window.scrollY > 60) {
    //     scrollTop.classList.add('active');
    //   } else {
    //     scrollTop.classList.remove('active');
    //   }

    //   document.querySelectorAll('section').forEach((section) => {
    //     const height = section.offsetHeight;
    //     const offset = section.offsetTop - 200;
    //     const top = window.scrollY;
    //     const id = section.id;

    //     if (top > offset && top < offset + height) {
    //       document.querySelectorAll('.navbar ul li a').forEach((link) =>
    //         link.classList.remove('active')
    //       );
    //       const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
    //       if (activeLink) activeLink.classList.add('active');
    //     }
    //   });
    // };
    // window.addEventListener('scroll', handleScroll);

    // Smooth Scrolling
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

    // Typed.js Effect
    const typed = new Typed('.typing-text', {
      strings: ['web development', 'system administration'],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    });

    // VanillaTilt Effect
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 15 });

    // Favicon & Document Visibility Change
    const handleVisibilityChange = () => {
      const favicon = document.getElementById('favicon');
      if (document.visibilityState === 'visible') {
        document.title = 'Portfolio | Nilsen Tovohery';
        favicon.setAttribute('href', 'assets/images/favicon.png');
      } else {
        document.title = 'Come Back To Portfolio';
        favicon.setAttribute('href', 'assets/images/favhand.png');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean-up effect
    return () => {
      // menu.removeEventListener('click', toggleMenu);
      // window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      typed.destroy(); // Clean-up Typed.js instance
    };
  }, []);

  return (
    <>
   
      <Home />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
   
      <a href="#home" aria-label="ScrollTop" className="fas fa-angle-up" id="scroll-top"></a>
    </>
  );
}

export default App;
