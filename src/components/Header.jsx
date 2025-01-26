import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Image from "../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <NavLink to="/" className="logo">
        <img 
          src={Image} 
          alt="" 
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