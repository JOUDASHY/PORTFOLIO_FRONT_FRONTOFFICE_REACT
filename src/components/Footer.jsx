import React, { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Remplacez par votre URL d'API
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du profil :", error);
      });
  }, []);

  if (!profile) {
    return <p>Chargement...</p>; // Affiche un message de chargement
  }

  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>{profile.username}'s Portfolio</h3>
          <p>
            {profile.about} <br /> <br />
          
          </p>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          <a href="#home">
            <i className="fas fa-chevron-circle-right"></i> Home
          </a>
          <a href="#about">
            <i className="fas fa-chevron-circle-right"></i> About
          </a>
          <a href="#skills">
            <i className="fas fa-chevron-circle-right"></i> Skills
          </a>
          <a href="#projects">
            <i className="fas fa-chevron-circle-right"></i> Projects
          </a>
          <a href="#education">
            <i className="fas fa-chevron-circle-right"></i> Education
          </a>
          <a href="#experience">
            <i className="fas fa-chevron-circle-right"></i> Experience
          </a>
          


          
        </div>

        <div className="box">
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-phone"></i> +261 {profile.phone_number}
          </p>
          <p>
            <i className="fas fa-envelope"></i> {profile.email}
          </p>
          <p>
            <i className="fas fa-map-marked-alt"></i> {profile.address}
          </p>
          <div className="share">
            <a
              href={profile.link_linkedin}
              className="fab fa-linkedin"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href={profile.link_facebook}
              className="fab fa-facebook"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href={`mailto:${profile.email}`}
              className="fas fa-envelope"
              aria-label="Mail"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
      </div>

      <h1 className="credit">
        Designed with <i className="fa fa-heart pulse"></i> by{" "}
        <a href={profile.link_linkedin}>{profile.username}</a>
      </h1>
    </section>
  );
};

export default Footer;
