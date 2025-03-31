import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Image from "../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si le clic est en dehors du header, on ferme le menu
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header ref={headerRef}>
      <NavLink to="/" className="logo">
        <img 
          src={Image} 
          alt="Logo" 
          style={{ width: '1.5em', height: '1.5em', objectFit: 'contain', marginRight: '0.5em' }} 
        />
        Portfolio
      </NavLink>

      <div id="menu" className="fas fa-bars" onClick={toggleMenu}></div>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/skills" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/education" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Education
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/experience" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
