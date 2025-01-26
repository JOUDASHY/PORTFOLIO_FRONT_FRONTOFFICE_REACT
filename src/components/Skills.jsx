import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Appel de l'API pour récupérer les compétences
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/competences/`)
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Erreur lors du chargement des compétences :", error));
  }, []);

  return (
    <section className="skills py-5" id="skills">
      <div className="container">
        <h2 className="heading text-center mb-4">
          <i className="fas fa-laptop-code"></i> Skills & <span>Abilities</span>
        </h2>
        <br />
        <br />
        <br />
        <div className="row">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div className="col-lg-4 col-md-6 mb-4" key={skill.id}>
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                  <img
  src={skill.image}
  alt={skill.name}
  className="img-fluid mb-3"
  style={{
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px", // Facultatif, pour des bords arrondis
  }}
/>

                    <h5 className="card-title text-dark">{skill.name} ({skill.niveau * 10}%)</h5>
                    {/* <p className="card-text text-muted">{skill.description}</p> */}
                
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Loading skills...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
