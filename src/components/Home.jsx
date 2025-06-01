import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "../assets/images/logo.png";

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('Home');
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
    // Appel API pour récupérer les données du profil
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`)
      .then(response => {
        // Mettre à jour l'état avec les données récupérées
        console.log('Profile récupéré avec succès:', response.data);

        setProfile(response.data);
        // Configuration de particles.js
     
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
          Hi There,<br /> I'm <span className='name'> {profile ? profile.username : ''}</span>
        </h2>
        <p>
          I am into <span className="typing-text"></span>
        </p>
        <a href="#about" className="btn">
          <span>About Me</span>
          <i className="fas fa-arrow-circle-down"></i>
        </a>

        <div className="floating-socials">
          <div className="social-ring">
            <a
              href={profile ? profile.link_linkedin : '#'}
              className="social-item linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/JOUDASHY98"
              className="social-item github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={profile ? profile.link_facebook : '#'}
              className="social-item facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Ajoutez ces styles */}
      <style jsx>{`
        .floating-socials {
          position: fixed;
          right: 2rem;
          bottom: 2rem;
          z-index: 1000;
        }

        .social-ring {
          display: flex;
          gap: 1rem;
          background: rgba(0, 11, 49, 0.1);
          padding: 1rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--jaune);
        }

        .social-item {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bleu);
          color: var(--light);
          font-size: 1.2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-item:hover {
          transform: translateY(-5px);
          background: var(--jaune);
          box-shadow: 0 5px 15px rgba(0, 11, 49, 0.3);
        }

        .social-item.linkedin:hover,
        .social-item.github:hover,
        .social-item.facebook:hover { 
          background: var(--jaune); 
        }

        @media (max-width: 768px) {
          .floating-socials {
            position: relative;
            right: auto;
            bottom: auto;
            margin-top: 2rem;
          }

          .social-ring {
            justify-content: center;
          }
        }
      `}</style>

      <div className="image" 

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