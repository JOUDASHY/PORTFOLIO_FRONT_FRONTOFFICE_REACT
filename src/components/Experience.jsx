import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading.jsx";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animation Observer
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

    // Récupération des données
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experience/`);
        const formattedData = response.data.map((exp, index) => ({
          id: exp.id,
          company: exp.entreprise,
          role: exp.role,
          type: exp.type,
          duration: `${new Date(exp.date_debut).toLocaleDateString()} - ${
            exp.date_fin && new Date(exp.date_fin) <= new Date()
              ? new Date(exp.date_fin).toLocaleDateString()
              : "Present"
          }`,
          alignment: index % 2 === 0 ? "right" : "left",
        }));
        setExperiences(formattedData);

        // Observer les éléments après chargement
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
      <section className="experience" id="experience">
        <div className="text-center">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="appointment-section bg-appointment">
        <div className="appointment-content">
          <h1 className="appointment-title">
            <i className="fas fa-briefcase"></i> Experience
          </h1>
          <p className="appointment-text">
            Explore my diverse career where innovation and technical expertise come together to create effective digital solutions.
          </p>
        </div>
      </div>

      <section className="experience" id="experience">
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              className={`container ${exp.alignment} timeline-item`} 
              key={exp.id}
              style={{ "--delay": `${index * 0.15}s` }}
            >
              <div className="content">
                <div className="tag">
                  <h2>{exp.company}</h2>
                </div>
                <div className="desc">
                  <h3>
                    {exp.role} ({exp.type})
                  </h3>
                  <p>{exp.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="morebtn timeline-item" 
          style={{ "--delay": `${experiences.length * 0.15}s` }}
        >
          <a href="/experience" className="btn">
            <span>View All</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </>
  );
};

export default Experience;