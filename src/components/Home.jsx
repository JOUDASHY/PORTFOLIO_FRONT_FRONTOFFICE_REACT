import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "../assets/images/logo.png";

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('Home');
    // Appel API pour récupérer les données du profil
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`)
      .then(response => {
        // Mettre à jour l'état avec les données récupérées
        console.log('Profile récupéré avec succès:', response.data);

        setProfile(response.data);
        // Configuration de particles.js
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#f68c09"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#f68c09",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  return (
    <section className="home" id="home">
      <div id="particles-js"></div>
      <div className="content">
        <h2>
          Hi There,<br /> I'm {profile ? profile.username : 'Loading...'}
        </h2>
        <p>
          I am into <span className="typing-text"></span>
        </p>
        <a href="#about" className="btn">
          <span>About Me</span>
          <i className="fas fa-arrow-circle-down"></i>
        </a>
        <div className="socials">
          <ul className="social-icons">
            <li>
              <a
                className="linkedin"
                aria-label="LinkedIn"
                href={profile ? profile.link_linkedin : '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                className="github"
                aria-label="GitHub"
                href="https://github.com/JOUDASHY98"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a
                className="instagram"
                aria-label="Facebook"
                href={profile ? profile.link_facebook : '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div 
  className="image" 

>
  <img
    draggable="false"
    className="tilt"
    src={Image}
    alt=""
    style={{
      backgroundColor: "#f68c09", // Jaune foncé
      padding: "10px",            // Optionnel : espace autour de l'image
      borderRadius:'50%'        // Optionnel : arrondir les bords
    }}
  />
</div>

    </section>
  );
};

export default Home;
