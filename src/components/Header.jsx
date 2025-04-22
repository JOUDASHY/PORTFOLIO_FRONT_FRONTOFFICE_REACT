import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Image from "../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="navbar navbar-expand-lg navbar-dark bg-blue fixed-top">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src={Image} 
            alt="Logo" 
            className="me-2 bg-jaune p-1"  
            style={{ width: '1.5em', height: '1.5em', objectFit: 'contain',borderRadius: '50%' }}

          />
          Portfolio
        </NavLink>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {[
              { path: "/", name: "Home" },
              { path: "/about", name: "About" },
              { path: "/skills", name: "Skills" },
              { path: "/education", name: "Education" },
              { path: "/projects", name: "Projects" },
              { path: "/experience", name: "Experience" },
              { path: "/contact", name: "Contact" }
            ].map((item) => (
              <li className="nav-item" key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active fw-bold' : ''}`
                  }
                  onClick={toggleMenu}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;