import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading.jsx'; // Ajustez le chemin d'importation si nécessaire

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données de l'API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/education/`)
      .then((response) => {
        setEducations(response.data); // Met à jour l'état avec les données récupérées
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  }, []);

  return (
    <>  
    <div className="appointment-section bg-appointment">
  {/* Flex container to center content perfectly */}
  <div className="appointment-content">
    <h1 className="appointment-title">
      <i className="fas fa-graduation-cap"></i> My <span>Education</span>
    </h1>
    <p className="appointment-text">
      Explore the educational experiences that have laid the foundation for my professional journey. From rigorous academic studies to hands-on projects, discover how my education has fueled my passion for development and innovation.
    </p>
  </div>
</div>

  <section className="education" id="education">
      <h1 className="heading">
      </h1>
      {loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div className="box-container">
          {educations.map((education) => (
            <div className="box" key={education.id}>
              <div className="image">
                <img
                  draggable="false"
                  src={education.image} // Dynamique : Image de l'API
                  alt={education.nom_ecole}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px", // Facultatif : bords arrondis
                  }}
                />
              </div>
              <div className="content">
                <h3>{education.nom_ecole}</h3> {/* Nom de l'école */}
                <p className="mb-2" style={{ color: "#343a40", fontWeight: "500" }}>
                  {education.nom_parcours} - {education.lieu} {/* Parcours et lieu */}
                </p>
                <h4>
                  {education.annee_debut} - {education.annee_fin && parseInt(education.annee_fin) > new Date().getFullYear() ? 'present' : education.annee_fin}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </section></>
   
  );
};

export default Education;
