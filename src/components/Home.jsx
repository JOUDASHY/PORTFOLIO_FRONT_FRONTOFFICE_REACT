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
          Welcome to my world!<br />
          <span className='greeting'>I'm</span> <span className='name'>{profile ? profile.username : ''}</span>
        </h2>
        <p>
          Passionate about <span className="typing-text"></span>
        </p>
        <a href="#about" className="btn">
          <span>Discover More</span>
          <i className="fas fa-chevron-circle-right"></i>
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

      {/* Styles */}
      <style jsx>{`
        .floating-socials {
          position: fixed;
          right: 2rem;
          bottom: 2rem;
          z-index: 1000;
        }

        .social-ring {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          background: rgba(0, 11, 49, 0.1);
          padding: 0.8rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--jaune);
        }

        .social-item {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bleu);
          color: var(--light);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .floating-socials {
            position: fixed;
            right: 1rem;
            bottom: 1rem;
            left: auto;
          }

          .social-ring {
            padding: 0.4rem 0.8rem;
            background: rgba(0, 11, 49, 0.8);
          }
        }

        @media (max-width: 480px) {
          .floating-socials {
            right: 0.5rem;
            bottom: 0.5rem;
          }

          .social-ring {
            padding: 0.3rem 0.6rem;
            gap: 0.4rem;
          }
        }

        h2 {
          font-size: 1.8rem;
          line-height: 1.2;
          margin-bottom: 0.8rem;
        }

        .name {
          font-size: 2rem;
          color: var(--jaune);
        }

        .greeting {
          font-size: 1.5rem;
          color: var(--light);
        }

        p {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .btn {
          font-size: 0.7rem;
          padding: 0.35rem 0.8rem;
          background: var(--bleu);
          color: var(--light);
          border-radius: 15px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid var(--jaune);
        }

        .btn i {
          font-size: 0.6rem;
        }

        .btn:hover {
          transform: scale(0.95);
          background: var(--jaune);
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 1.5rem;
          }
          
          .name {
            font-size: 1.7rem;
          }
          
          .greeting {
            font-size: 1.3rem;
          }
          
          p {
            font-size: 0.9rem;
          }
          
          .btn {
            font-size: 0.65rem;
            padding: 0.3rem 0.6rem;
          }
          
          .btn i {
            font-size: 0.55rem;
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