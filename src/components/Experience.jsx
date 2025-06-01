import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading.jsx";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experience/`);
        const formattedData = response.data.map((exp, index) => ({
          ...exp,
          duration: `${new Date(exp.date_debut).toLocaleDateString()} - ${
            exp.date_fin && new Date(exp.date_fin) <= new Date()
              ? new Date(exp.date_fin).toLocaleDateString()
              : "Present"
          }`,
        }));
        setExperiences(formattedData);

        setTimeout(() => {
          document.querySelectorAll(".timeline-item").forEach((el) => {
            observer.observe(el);
          });
        }, 100);
      } catch (error) {
        console.error("Erreur lors du chargement des expériences :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <section className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
        <Loading />
      </section>
    );
  }

  return (
    <section className="experience-section bg-white py-5 position-relative overflow-hidden" id="experience">
      {/* Décorations */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-10"></div>
      <div className="deco-blur position-absolute top-50 start-50 translate-middle"></div>

      <div className="container position-relative z-index-1">
        {/* En-tête */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="icon-halo mb-5">
            <i className="fas fa-rocket fs-1 color-jaune"></i>
          </div>
          <h3 className="display-3 fw-bold color-jaune mb-3">
            Professional <span className="text-gradient-primary">Journey</span>
          </h3>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "600px" }}>
            A chronicle of milestones and achievements in my career evolution
          </p>
        </div>

        {/* Timeline moderne */}
        <div className="timeline-wrapper position-relative">
          <div className="timeline-line bg-gradient-primary-vertical"></div>
          
          {experiences.map((exp, index) => (
            <div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} 
              key={exp.id}
              data-delay={index * 0.15}
            >
              <div className="timeline-card glass-card">
                <div className="card-header bg-gradient-primary text-white p-4 border-0">
                  <h3 className="h4 mb-2 color-jaune">{exp.role}</h3>
                  <div className="d-flex align-items-center gap-3">
                    <div className="company-logo">
                      <i className="fas fa-building fs-5"></i>
                    </div>
                    <div>
                      <span className="fw-medium color-jaune">{exp.entreprise}</span>
                      <span className="badge bg-white-10 ms-3">{exp.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-body bg-white p-2">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="color-blue">
                      <i className="fas fa-calendar-alt me-2"></i>
                      {exp.duration}
                    </div>
                    <div className="timeline-marker">
                      <div className="marker-dot bg-primary"></div>
                      <div className="marker-line bg-primary"></div>
                    </div>
                  </div>
                  <p className="description-text mb-0">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton View All */}
        <div className="text-center mt-8">
          <a 
            href="/experience" 
            className="btn-jaune rounded-pill px-6 py-3 d-inline-flex align-items-center hover-scale"
          >
            <span className="me-3">Explore Full Journey</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <style jsx>{`
  .experience-section {
    background: linear-gradient(45deg, #0f172a, #1e293b);
  }

  .deco-blur {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle at center, #6366f155 0%, transparent 70%);
    filter: blur(100px);
    opacity: 0.15;
  }

  .icon-halo {
    width: 100px;              /* réduit */
    height: 100px;             /* réduit */
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
  }

  .icon-halo::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border: 2px solid #6366f155;
    border-radius: 50%;
    animation: pulse 3s infinite;
  }

  .icon-halo i {
    font-size: 4rem !important;  /* réduit */
  }

  .timeline-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #6366f1 0%, #8b5cf6 100%);
    transform: translateX(-50%);
  }

  .timeline-item {
    width: calc(50% - 40px);
    margin-bottom: 60px;
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .timeline-item.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-item.left { left: 0; }
  .timeline-item.right { left: calc(50% + 40px); }

  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    border: 0.1px solid var(--jaune);
    transition: transform 0.3s ease;
    transform: scale(0.95);        /* compactage */
  }

  .glass-card:hover {
    transform: translateY(-5px) scale(1.02);
  }

  .bg-gradient-primary {
    background: var(--blue);
  }

  .bg-gradient-primary-vertical {
    background: var(--jaune);
  }

  .bg-dark-2 {
    background: rgba(15, 23, 42, 0.7);
  }

  .bg-dark-3 {
    background: rgba(255, 255, 255, 0.1);
  }

  .timeline-marker {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -52px;
  }

  .timeline-item.right .timeline-marker {
    left: -52px;
    right: auto;
  }

  .marker-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }

  .marker-line {
    width: 40px;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -30px;
  }

  .timeline-item.right .marker-line {
    left: -30px;
    right: auto;
  }

  .btn-gradient-primary {
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    border: none;
    position: relative;
    overflow: hidden;
  }

  .btn-gradient-primary::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
      transparent 25%,
      rgba(255,255,255,0.1) 50%,
      transparent 75%);
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  .hover-scale {
    transition: transform 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.5; }
  }

  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }

  /* ↓ Ajustements de texte et boutons */
  .display-3 {
    font-size: 2.8rem !important;  /* réduit */
  }

  .lead {
    font-size: 0.9rem;             /* réduit */
  }

  .card-header {
    padding: 1rem;                 /* plus compact */
  }

  .card-header h3 {
    font-size: 1rem;               /* réduit */
  }

  .company-logo i {
    font-size: 0.9rem !important;  /* réduit */
  }

  .card-body {
    padding: 0.75rem;              /* ajusté */
  }

  .btn-jaune {
    padding: 0.7rem 1.2rem;        /* ajusté */
    font-size: 0.85rem;            /* réduit */
  }

  .description-text {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--bleu);
    margin-top: 1rem;
    padding: 0 1rem;
  }

  @media (max-width: 992px) {
    .timeline-item {
      width: 100%;
      left: 0 !important;
      margin-bottom: 30px;
    }

    .timeline-line {
      left: 15px;
    }

    .timeline-marker {
      display: none;
    }

    .glass-card {
      margin-left: 20px;
    }
  }

  @media (max-width: 768px) {
    .experience-section {
      padding: 2rem 0;
    }

    .display-3 {
      font-size: 2.3rem !important;  /* encore un peu plus petit */
    }

    .lead {
      font-size: 0.85rem;
    }

    .icon-halo {
      width: 60px;
      height: 60px;
    }

    .icon-halo i {
      font-size: 1.3rem !important;
    }

    .card-header h3 {
      font-size: 1.1rem;
    }

    .card-body {
      padding: 1rem !important;
    }

    .btn-jaune {
      padding: 0.7rem 1.2rem;
      font-size: 0.8rem;
    }

    .description-text {
      font-size: 0.85rem;
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 576px) {
    .display-3 {
      font-size: 2rem !important;
    }

    .card-header {
      padding: 1.5rem !important;
    }

    .card-header h3 {
      font-size: 1.1rem;
    }

    .company-logo i {
      font-size: 0.8rem !important;
    }

    .btn-jaune {
      width: 100%;
      justify-content: center;
    }
  }
`}</style>

    </section>
  );
};

export default Experience;