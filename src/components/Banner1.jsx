import React from 'react';
import { NavLink } from 'react-router-dom';

const Banner1 = () => {
  return (
    <section
      className="banner-section position-relative d-flex align-items-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1505327191481-d31e1fb4ff79?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D')`,
      }}
    >
      {/* Dark overlay to enhance readability */}
      <div className="overlay-dark"></div>

      <div className="container position-relative text-white text-center z-overlay py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="banner-content mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-code-square mb-4"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/>
              </svg>

              <h3 className="display-4 fw-bold banner-title mb-3">
                Web Developer & DevOps Specialist
              </h3>
              <p className="lead banner-subtitle mb-4 opacity-75">
                Crafting and optimizing scalable web solutions
              </p>
            </div>

            <div className="d-flex gap-3 justify-content-center banner-buttons">
              <NavLink to="/projects" className="btn btn-outline-warning btn-lg px-4 py-3 rounded-1 explore-btn">
                Discover My Work
              </NavLink>
              <NavLink to="/contact" className="btn btn-outline-light btn-lg px-4 py-3 rounded-1 contact-btn">
                Reach Out
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-y: auto;
        }

        .banner-section {
          min-height: 80vh;
          width: 100%;
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .z-overlay {
          position: relative;
          z-index: 1;
        }

        .banner-title {
          font-size: 2.5rem;
        }

        .banner-subtitle {
          font-size: 1.25rem;
        }

        .explore-btn, .contact-btn {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .banner-title {
            font-size: 2rem;
          }
          .banner-subtitle {
            font-size: 1.1rem;
          }
          .explore-btn, .contact-btn {
            font-size: 0.9rem;
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 576px) {
          .banner-section {
            min-height: 60vh;
          }
          .banner-title {
            font-size: 1.5rem;
          }
          .banner-subtitle {
            font-size: 0.9rem;
          }
          .explore-btn, .contact-btn {
            font-size: 0.8rem;
            padding: 0.6rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner1;
