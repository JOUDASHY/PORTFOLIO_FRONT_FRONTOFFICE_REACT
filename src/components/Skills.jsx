import React, { useEffect, useState, useRef } from "react";
import Loading from "../Loading.jsx"; // Assurez-vous que le chemin d'importation est correct

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [animate, setAnimate] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    // Appel de l'API pour récupérer les compétences
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/competences/`)
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des compétences :", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          // On peut se déconnecter de l'observateur dès que l'animation est lancée
          observer.disconnect();
        }
      });
    };

    const observerOptions = {
      threshold: 0.7, // Déclenchement quand 30% de l'élément est visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => observer.disconnect();
  }, [loading]);

  const handleInfoClick = (skill) => {
    setSelectedSkill(skill);
  };

  const closeModal = () => {
    setSelectedSkill(null);
  };

  return (
    <>
      <div className="appointment-section bg-appointment">
        <div className="appointment-content">
          <h1 className="appointment-title">
            <i className="fas fa-laptop-code"></i> Skills & <span>Abilities</span>
          </h1>
          <p className="appointment-text">
            Explore my technical skills and abilities honed over the years. From innovative problem-solving to coding mastery, my expertise reflects a commitment to continuous learning and excellence.
          </p>
        </div>
      </div>

      <section className="skills py-5" id="skills" ref={skillsRef}>
        <div className="container">
          <h2 className="heading text-center mb-4"></h2>
          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {skills.map((skill) => (
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
                          width: "100%",
                          aspectRatio: "1",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <h5 className="card-title text-dark">
                        {skill.name}{" "}
                        <button
                          onClick={() => handleInfoClick(skill)}
                          style={{
                            border: "none",
                            background: "black",
                            cursor: "pointer",
                            marginLeft: "10px",
                            borderRadius: "50%",
                            color: "white",
                          }}
                        >
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </h5>
                      {/* Barre de progression */}
                      <div
                        style={{
                          width: "90%",
                          backgroundColor: "#e0e0df",
                          borderRadius: "10px",
                          margin: "10px 0",
                          height: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: animate ? `${skill.niveau * 10}%` : "0%",
                            backgroundColor: "#f68c09",
                            height: "100%",
                            borderRadius: "10px",
                            transition: "width 3s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <p className="text-muted">
                        {animate ? `${skill.niveau * 10}%` : "0%"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedSkill && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <button
              onClick={closeModal}
              className="btn btn-danger"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              X
            </button>
            <h2>{selectedSkill.name}</h2>
            <p>{selectedSkill.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Skills;
