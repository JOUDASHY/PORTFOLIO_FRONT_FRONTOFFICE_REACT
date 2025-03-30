import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user_pr from "../assets/images/user.png";
import Loading from "../Loading.jsx";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`);
        setProfile(response.data);
        
        // Activer l'observer après le chargement des données
        setTimeout(() => {
          document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
          });
        }, 100);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="appointment-section animate-on-scroll" data-delay="0">
        <div className="appointment-content">
          <h1 style={{ fontSize: '50px' }}>
            <i className="fas fa-user-alt"></i> About <span>Me</span>
          </h1>
        </div>
      </div>

      <section className="about" id="about">
        <h2 className="heading"></h2>

        <div className="row">
          <div className="image animate-on-scroll" data-delay="0.2">
            <img
              draggable="false"
              className="tilt"
              src={
                profile?.image
                  ? `${import.meta.env.VITE_API_BASE_URL}${profile.image}`
                  : user_pr
              }
              alt="Profile"
            />
          </div>
          <div className="content animate-on-scroll" data-delay="0.4">
          <h1 style={{ 
    fontSize: '3rem', 
    fontWeight: '700',
    marginBottom: '1rem',
    // color: '#02094b',
    lineHeight: '1.2'
  }}>
    I'm <span style={{ color: 'var(--blue)' }}>{profile.username}</span>
  </h1>
  
  <span className="tag" style={{ 
    fontSize: '1.5rem',
    display: 'inline-block',
    marginBottom: '2rem'
  }}>
    Full Stack Developer
  </span>
            <p style={{ textAlign: 'justify' }}>
  I am a passionate full-stack developer and system administrator based in {profile.address}. With a solid foundation in both software development and IT management, I design and build dynamic web applications and responsive websites using modern technologies like Django, Laravel, and React. In my role as a system administrator, I manage robust server infrastructures by implementing top-tier security measures, optimizing performance, and ensuring high availability. This dual expertise allows me to seamlessly integrate development with IT operations, providing comprehensive solutions that are both innovative and reliable. Whether I’m working on personal projects or tackling complex professional challenges, I continuously strive to refine my skills and apply best practices that bridge the gap between cutting-edge development and efficient system management.
</p>

            <div className="box-container">
              <div className="box">
                <p><span>Email:</span> {profile.email}</p>
                <p><span>Place:</span> {profile.address}</p>
              </div>
            </div>
            
            <br />
            
            <div className="social-resume-container d-flex gap-4 mt-5">
  <div className="animate-on-scroll" data-delay="0.6">
    <a
      href={profile.link_linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary btn-lg d-flex align-items-center"
      style={{ padding: '10px 20px', fontSize: '18px' }}
    >
      <i className="fab fa-linkedin me-3" style={{ fontSize: '24px' }}></i> LinkedIn
    </a>
  </div>
  
  <div className="animate-on-scroll" data-delay="0.6">
    <a
      href={profile.link_facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-secondary btn-lg d-flex align-items-center"
      style={{ padding: '10px 20px', fontSize: '18px' }}
    >
      <i className="fab fa-facebook me-3" style={{ fontSize: '24px' }}></i> Facebook
    </a>
  </div>
  
  <div className="animate-on-scroll" data-delay="0.6">
    <a 
      href="/CV_Eddy_Nilsen.pdf" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn btn-lg d-flex align-items-center resume"
      
    >
      <i className="fas fa-file-pdf me-4" style={{ fontSize: '24px' }}></i>
      <span>Resume (CV)</span>
    </a>
  </div>
</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;