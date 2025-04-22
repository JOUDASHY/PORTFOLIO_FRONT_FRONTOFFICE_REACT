import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aosLoading, setAosLoading] = useState(true); // État de chargement pour AOS

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/education/`)
      .then((response) => {
        setEducations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setAosLoading(false); // Initialisation d'AOS terminée
  }, []);

  if (loading || aosLoading) {
    return (
      <div className="text-center py-5">
        <Loading />
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="display-5 fw-bold color-jaune mb-3">
            <i className="fas fa-graduation-cap me-2"></i>
            My <span className="color-blue">Education</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Academic journey and professional qualifications that shaped my technical expertise
          </p>
        </div>

        {/* Education Timeline */}
        <div className="row justify-content-center">
          {educations.map((education, index) => (
            <div
              className="col-md-8 mb-4"
              key={education.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="card shadow-lg h-100">
                <div className="row g-0">
                  {/* Institution Logo */}
                  <div className="col-md-3 d-flex align-items-center justify-content-center p-3">
                    <img
                      src={education.image}
                      alt={education.nom_ecole}
                      className="img-fluid rounded-2"
                      style={{
                        maxWidth: '120px',
                        maxHeight: '120px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Education Details */}
                  <div className="col-md-9">
                    <div className="card-body">
                      <h3 className="h5 card-title fw-bold text-dark mb-2">
                        {education.nom_parcours}
                      </h3>
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-university text-muted me-2"></i>
                        <span className="color-jaune">{education.nom_ecole}</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-map-marker-alt text-muted me-2"></i>
                        <span className="text-secondary">{education.lieu}</span>
                      </div>
                      <div className="badge bg-primary-subtle color-jaune rounded-pill">
                        {education.annee_debut} -{' '}
                        {education.annee_fin && parseInt(education.annee_fin) > new Date().getFullYear()
                          ? 'Present'
                          : education.annee_fin}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
