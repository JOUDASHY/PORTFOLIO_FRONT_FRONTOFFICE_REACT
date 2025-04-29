import React, { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  if (!profile) return <p className="text-center py-5">Chargement...</p>;

  return (
    <footer className="bg-blue text-light pt-5">
      <div className="container">
        <div className="row gy-4">
          {/* À propos */}
          <div className="col-md-4">
            <h5>{profile.username}'s Portfolio</h5>
            <p className="small">
              {/* {profile.about} */}
            </p>
          </div>

          {/* Liens rapides */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {["home","about","skills","projects","education","experience"].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="color-jaune text-decoration-none">
                    <i className="fas fa-chevron-circle-right me-2"></i>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h5>Contact Info</h5>
            <p>
              <i className="fas fa-phone me-2"></i>+261 {profile.phone_number}
            </p>
            <p>
              <i className="fas fa-envelope me-2"></i>{profile.email}
            </p>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i>{profile.address}
            </p>
            <div className="mt-3">
              <a
                href={profile.link_linkedin}
                className="btn btn-outline-light btn-sm me-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="color-jaune fab fa-linkedin"></i>
              </a>
              <a
                href={profile.link_facebook}
                className="btn btn-outline-light btn-sm me-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="color-jaune fab fa-facebook"></i>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="btn btn-outline-light btn-sm "
                aria-label="Email"
              >
                <i className="color-jaune fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Crédits */}
        <div className="text-center mt-4 pb-3 border-top border-secondary">
          <small className="color-jaune">
            Designed by&nbsp;
            <a
              href={profile.link_linkedin}
              className="text-decoration-none color-blue-ciel fw-bold"
            >
              {profile.username}
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
