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
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {skills.length > 0 ? (
        skills.map((skill) => (
          <div className="col" key={skill.id}>
            <div
              className="card shadow-sm border-0"
              style={{ padding: "20px", borderRadius: "8px" }}
            >
              <div className="card-body text-center">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="img-fluid mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h5 className="card-title text-dark">{skill.name}</h5>
                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e0e0df",
                    borderRadius: "10px",
                    margin: "10px 0",
                    height: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.niveau * 10}%`,
                      backgroundColor: "#f68c09",
                      height: "100%",
                      borderRadius: "10px",
                      transition: "width 0.5s ease-in-out",
                    }}
                  ></div>
                </div>
                <p className="text-muted">{skill.niveau * 10}%</p>
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
