import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Récupération des données depuis l'API
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experience/`);
        const formattedData = response.data.map((exp, index) => ({
          id: exp.id,
          company: exp.entreprise,
          role: exp.role,
          duration: `${new Date(exp.date_debut).toLocaleDateString()} - ${
            exp.date_fin ? new Date(exp.date_fin).toLocaleDateString() : "Present"
          }`,
          alignment: index % 2 === 0 ? "right" : "left", // Alternance des alignements
        }));
        setExperiences(formattedData);
      } catch (error) {
        console.error("Erreur lors du chargement des expériences :", error);
      }
    };
    
    fetchExperiences();
  }, []); // Ajout du tableau vide pour exécuter l'effet une seule fois

  return (
    <section className="experience" id="experience">
      <h2 className="heading">
        <i className="fas fa-briefcase"></i> Experience
      </h2>

      <div className="timeline">
        {experiences.map((exp) => (
          <div
            className={`container ${exp.alignment}`}
            key={exp.id}
          >
            <div className="content">
              <div className="tag">
                <h2>{exp.company}</h2>
              </div>
              <div className="desc">
                <h3>{exp.role}</h3>
                <p>{exp.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="morebtn">
        <a href="/experience" className="btn">
          <span>View All</span>
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
};

export default Experience;
