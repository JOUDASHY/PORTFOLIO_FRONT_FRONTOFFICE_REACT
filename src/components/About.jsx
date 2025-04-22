import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user_pr from "../assets/images/user.png";
import Loading from "../Loading.jsx";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`
        );
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Loading />
      </div>
    );
  }

  return (
    <section className="about-section" id="about">
      <div className="inner-container">
        <div className="image-col">
          <div className="profile-wrap">
            <img
              src={
                profile?.image
                  ? `${import.meta.env.VITE_API_BASE_URL}${profile.image}`
                  : user_pr
              }
              alt={`${profile?.username} profile`}
              className="profile-img"
            />
         
          </div>
        </div>

        <div className="content-col">
          <div className="glass-card ">
            <div className="header-flex">
              <div className="icon-wrap">
                <i className="fas fa-code color-jaune" aria-hidden="true" />
              </div>
              <div>
                <span className="role-label">Innovative Developer</span>
                <h1 className="username-title">{profile.username}</h1>
              </div>
            </div>

            <div className="sub-title-wrap">
              <h2 className="sub-title">Full Stack Developer</h2>
            </div>

            <p className="about-text">
              I  am a passionate full-stack developer and system administrator based in Isada ,Fianarantsoa. With a solid foundation in both software development and IT management, I design and build dynamic web applications and responsive websites using modern technologies like Django, Laravel, and React. In my role as a system administrator, I manage robust server infrastructures by implementing top-tier security measures, optimizing performance, and ensuring high availability. This dual expertise allows me to seamlessly integrate development with IT operations, providing comprehensive solutions that are both innovative and reliable. Whether I’m working on personal projects or tackling complex professional challenges, I continuously strive to refine my skills and apply best practices that bridge the gap between cutting-edge development and efficient system management.
            </p>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon email-icon">
                  <i className="fas fa-envelope color-jaune" aria-hidden="true" />
                </div>
                <div>
                  <span className="info-label">Email</span>
                  <p className="info-value">{profile.email}</p>
                </div>
              </div><br/>
              <div className="info-item">
                <div className="info-icon location-icon">
                  <i className="fas fa-map-marker-alt color-jaune" aria-hidden="true" />
                </div>
                <div>
                  <span className="info-label">Location</span>
                  <p className="info-value">{profile.address}</p>
                </div>
              </div>
            </div>

            <div className="skills-wrap">
              {[
                'React', 'Deploiement', 'Laravel', 'VPS',
                'Mysql', 'Docker', 'Python', 'Django'
              ].map((skill, idx) => (
                <span key={idx} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>

            <div className="social-wrap">
              <a
                href={profile.link_linkedin}
                className="social-btn linkedin-btn"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in" /> Connect
              </a>
              <a
                href={profile.link_github}
                className="social-btn github-btn"
                aria-label="GitHub"
              >
                <i className="fab fa-github" /> Follow
              </a>
              <a
                href="/CV_Eddy_Nilsen.pdf"
                className="social-btn cv-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV"
              >
                <i className="fas fa-download" /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary-color: #00b4d8;
          --accent-color: #407bff;
          --bg-dark: #121212;
          --bg-card: rgba(255, 255, 255, 0.1);
          --text-light: rgba(255, 255, 255, 0.85);
          --text-muted: rgba(255, 255, 255, 0.6);
        }

        .about-section {
          // background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
          padding: 4rem 1rem;
        }

        .inner-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .image-col,
        .content-col {
          flex: 1 1 500px; /* Augmentez la valeur ici pour rendre les colonnes plus larges */
        }


        .loader-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transform: perspective(1500px) rotateY(10deg);
          transition: transform 0.8s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .profile-wrap:hover {
          transform: perspective(1500px) rotateY(0deg) scale(1.05);
        }

        .profile-img {
          width: 100%;
          display: block;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            rgba(26, 26, 46, 0.4) 0%,
            rgba(22, 33, 62, 0.4) 100%
          );
          mix-blend-mode: multiply;
        }

        .glass-card {
          background: var(--blue)!important;
          backdrop-filter: blur(12px);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .header-flex {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .icon-wrap {
          background: rgba(64, 123, 255, 0.2);
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-label {
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          color: var(--jaune);
          display: block;
        }

        .username-title {
          font-size: 2.5rem;
          margin: 0;
          color: white;
        }

        .sub-title-wrap {
          position: relative;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .sub-title-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 4rem;
          height: 0.25rem;
          background: var(--primary-color);
          animation: expandBorder 2s ease-in-out infinite;
        }

        @keyframes expandBorder {
          0%, 100% { width: 4rem; }
          50% { width: 8rem; }
        }

        .sub-title {
          font-size: 1.75rem;
          background: linear-gradient(45deg, #00b4d8, #90e0ef);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .about-text {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .info-icon {
          background: var(--bg-card);
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 1.25rem;
        }

        .info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .info-value {
          font-size: 1.125rem;
          margin: 0;
          color: white;
        }

        .skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .skill-badge {
          background: var(--bg-card);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          transition: transform 0.3s ease;
        }

        .skill-badge:hover {
          transform: translateY(-3px) scale(1.05);
          background: var(--accent-color);
        }

        .social-wrap {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: transform 0.3s ease;
        }

        .social-btn:hover {
          transform: translateY(-2px);
        }

        .linkedin-btn {
          background: #0a66c2;
          color: white;
        }

        .github-btn {
          background: #333;
          color: white;
        }

        .cv-btn {
          background: #e94b3c;
          color: white;
        }

        @media (max-width: 768px) {
          .username-title { font-size: 2rem; }
          .sub-title { font-size: 1.5rem; }
          .about-text { font-size: 0.95rem; }
          .inner-container { flex-direction: column; gap: 1.5rem; }
          .profile-wrap { transform: none; box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
        }

        @media (max-width: 576px) {
          .about-section { padding: 2.5rem 0.5rem; }
          .username-title { font-size: 1.5rem; }
          .sub-title { font-size: 1.25rem; }
          .role-label { font-size: 0.65rem; }
          .about-text { font-size: 0.9rem; }
          .info-label { font-size: 0.65rem; }
          .info-value { font-size: 1rem; }
          .info-icon { font-size: 1rem; padding: 0.5rem; }
          .skill-badge { font-size: 0.75rem; padding: 0.4rem 0.8rem; }
          .social-btn { font-size: 0.75rem; padding: 0.5rem 1rem; }
          .icon-wrap { padding: 0.5rem; font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
};

export default About;
