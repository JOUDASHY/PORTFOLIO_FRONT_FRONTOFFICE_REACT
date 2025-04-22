import React, { useEffect, useState, useRef } from "react";
import Loading from "../Loading.jsx";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const containerRef = useRef(null);

  // Fetch des compétences
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/competences/`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des compétences :", err);
        setLoading(false);
      });
  }, []);

  // Animation des cercles au scroll
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target;
          const circle = card.querySelector("circle[data-progress]");
          if (!circle) return;

          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;

          circle.style.strokeDasharray = `${circumference} ${circumference}`;
          circle.style.strokeDashoffset = circumference;

          const progress = parseFloat(circle.dataset.progress);
          const offset = circumference * (1 - progress / 100);

          requestAnimationFrame(() => {
            circle.style.transition = "stroke-dashoffset 1.5s ease-out";
            circle.style.strokeDashoffset = offset;
          });

          card.classList.add("animate");
        });
      },
      { threshold: 0.5 }
    );

    const cards = containerRef.current.querySelectorAll(".skill-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <section
      id="skills"
      className="skills-section position-relative overflow-hidden py-9"
    >
      {/* Fond animé */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-white">
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                "--x": Math.random() * 100 + "%",
                "--y": Math.random() * 100 + "%",
                "--delay": Math.random() * 2 + "s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container position-relative z-index-2 py-5">
        {/* En-tête */}
        <div className="text-center mb-8 neon-heading">
          <h2 className="display-2 fw-black color-jaune mb-3">
            <span className="text-stroke color-blue">Technical</span> Mastery
          </h2>
          <p className="lead opacity-100 mb-0 color-blue p-3">
            Where Innovation Meets Precision
          </p>
        </div>

        {/* Grille de compétences */}
        <div className="row g-4" ref={containerRef}>
          {skills.map((skill) => (
            <div className="col-12 col-sm-6 col-md-4" key={skill.id}>
              <div className="skill-card hover-3d rounded-4 p-3 position-relative overflow-hidden">
                <div className="card-inner position-relative">
                  {/* En‑tête de la carte */}
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-gradient-primary rounded-3 me-2">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="icon-img"
                      />
                    </div>
                    <h3 className="h5 text-light mb-0 skill-title">{skill.name}</h3>
                    <button
                      className="btn btn-link text-light opacity-75 ms-auto"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <i className="fas fa-chevron-right fs-5" />
                    </button>
                  </div>

                  {/* Progress Ring */}
                  <div className="progress-container mx-auto mb-3">
                    <svg className="progress-ring" viewBox="0 0 100 100">
                      <circle
                        className="progress-ring__bg"
                        strokeWidth="4"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="progress-ring__circle"
                        strokeWidth="4"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                        data-progress={skill.niveau * 10}
                      />
                    </svg>
                    <div className="progress-text-container">
                      <div className="h4 mb-0 skill-percentage">
                        {skill.niveau * 10}%
                      </div>
                      <div className="text-uppercase small opacity-50 master">
                        Mastery
                      </div>
                    </div>
                  </div>

                  {/* Détails */}
                  <div className="skill-meta text-light opacity-75">
                    <div className="d-flex justify-content-between small mb-2">
                      <span>Experience</span>
                      <span>2+ Years</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Projects</span>
                      <span>15+</span>
                    </div>
                  </div>
                </div>
                <div className="card-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de détail */}
      {selectedSkill && (
        <div className="modal-glass" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title text-light modal-title-responsive">
                {selectedSkill.name}
              </h3>
              <button
                className="btn btn-close btn-close-white"
                onClick={() => setSelectedSkill(null)}
              />
            </div>
            <div className="modal-body">
              <div className="row g-5 align-items-center">
                <div className="col-12 col-md-5">
                  <div className="modal-visual p-4 rounded-4 bg-dark">
                    <img
                      src={selectedSkill.image}
                      alt={selectedSkill.name}
                      className="img-fluid modal-img-responsive"
                    />
                    <div className="d-flex justify-content-center mt-3">
                      <div className="progress-ring-container-modal">
                        <svg viewBox="0 0 80 80" className="progress-ring">
                          <circle
                            className="progress-ring__bg"
                            strokeWidth="3"
                            fill="transparent"
                            r="36"
                            cx="40"
                            cy="40"
                          />
                          <circle
                            className="progress-ring__circle"
                            strokeWidth="3"
                            fill="transparent"
                            r="36"
                            cx="40"
                            cy="40"
                            data-progress={selectedSkill.niveau * 10}
                          />
                        </svg>
                        <span className="progress-text-modal">
                          {selectedSkill.niveau * 10}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <p className="lead text-light opacity-75 description-responsive">
                    {selectedSkill.description}
                  </p>
                  <div className="skill-stats d-flex gap-3 stats-responsive">
                    <div className="stat-item text-center">
                      <div className="stat-value text-gradient-primary">
                        15+
                      </div>
                      <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item text-center">
                      <div className="stat-value text-gradient-primary">
                        98%
                      </div>
                      <div className="stat-label">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Définition du gradient */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Styles globaux avec media queries */}
      <style jsx global>{`
        :root {
          --neon-color: #6366f1;
          --neon-glow: 0 0 10px #6366f155,
                       0 0 20px #6366f155,
                       0 0 30px #6366f155;
        }

        .skills-section {
          background: linear-gradient(45deg, #0f172a, #1e293b);
        }

        /* Icon wrapper */
        .icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-img {
          width: 32px;
          height: 32px;
        }

        /* Progress ring container */
        .progress-container {
          width: 80px;
          height: 80px;
          position: relative;
          color: var(--jaune);
        }
        .progress-ring__bg { stroke: rgba(255,255,255,0.1); }
        .progress-ring__circle { stroke: url(#gradient); }
        .progress-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .skill-percentage { font-size: 1rem; }

        /* Modal responsive elements */
        .modal-title-responsive { font-size: 1.5rem; }
        .modal-img-responsive { max-width: 100%; height: auto; }
        .description-responsive { font-size: 0.8rem; }
        .stats-responsive { flex-wrap: wrap; gap: 1rem; }

        /* Particles */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(99, 102, 241, 0.5);
          border-radius: 50%;
          animation: float 5s infinite;
          left: var(--x);
          top: var(--y);
          animation-delay: var(--delay);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(-100px); opacity: 1; }
        }

        /* Skill card */
        .skill-card {
          background: var(--blue);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-card:hover {
          transform: translateY(-5px) rotateX(5deg) rotateY(5deg);
          box-shadow: var(--neon-glow);
        }
        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(600px at 50% 50%, rgba(99, 102, 241, 0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        /* Global progress transition */
        .progress-ring__circle { transition: stroke-dashoffset 1.5s ease-out; }

        /* Neon text effects */
        .text-gradient-holographic {
          background: linear-gradient(45deg, #6366f1, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic 6s infinite;
        }
        @keyframes holographic {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .text-stroke { -webkit-text-stroke: 1px var(--blue); color: transparent; }

        /* Modal glass */
        .modal-glass {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: rgba(30, 41, 59, 0.95);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          width: 95%;
          max-width: 900px;
          padding: 2rem;
          transform: scale(0.9);
          animation: modalEnter 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes modalEnter { to { transform: scale(1); opacity: 1; } }

        /* Hover 3D */
        .hover-3d { transform-style: preserve-3d; }
        .hover-3d:hover .card-inner { transform: translateZ(20px); }
        .card-inner { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

        /* Media queries mobiles */
        @media (max-width: 768px) {
          .skill-card {
            max-width: 300px!important;
            width: 100%;
            margin: 0 auto;
          }
            .master{
            font-size: 0.6rem;}
          .icon-wrapper { width: 32px; height: 32px; }
          .icon-img { width: 24px; height: 24px; }
          .progress-container { width: 60px; height: 60px; }
          .skill-percentage { font-size: 0.8rem; }
          .modal-title-responsive { font-size: 1.2rem; }
          .modal-visual { padding: 1.5rem; }
          .skill-title { font-size: 1rem; }
          .skill-meta { font-size: 0.7rem; }
        }
        @media (max-width: 576px) {
          .neon-heading h2 { font-size: 1.5rem; }
          .lead { font-size: 0.8rem; }
          .description-responsive { font-size: 0.7rem; }
          .skill-title { font-size: 0.8rem; }
          .skill-meta { font-size: 0.6rem; }
        }

        /* Ensure cards are displayed in a row on mobile */
        @media (max-width: 768px) {
          .row {
            display: flex;
            flex-wrap: wrap;
          }
          .col-12.col-sm-6.col-md-4 {
            flex: 1 1 calc(50% - 1rem); /* Adjust for gutters */
            max-width: calc(50% - 1rem);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
