import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user_pr from "../assets/images/user.png";
import Loading from "../Loading.jsx"; // Ajustez le chemin d'importation selon votre structure

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`);
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
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  return (

<>

    <div className="appointment-section">
    {/* Conteneur flex pour centrer parfaitement */}
    <div className="appointment-content">
      <h1 style={{ fontSize: '50px' }}>
      <i className="fas fa-user-alt"></i> About <span>Me</span>

  
      </h1>
      
    </div>
  </div>
    <section className="about" id="about">
      <h2 className="heading">
      </h2>

      <div className="row">
        <div className="image">
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
        <div className="content">
          <h3>I'm {profile.username}</h3>
          <span className="tag">Full Stack Developer</span>

          <p style={{ textAlign: 'justify' }}>
  I am a passionate full-stack developer and system administrator based in {profile.address}. With a solid foundation in both software development and IT management, I design and build dynamic web applications and responsive websites using modern technologies like Django, Laravel, and React. In my role as a system administrator, I manage robust server infrastructures by implementing top-tier security measures, optimizing performance, and ensuring high availability. This dual expertise allows me to seamlessly integrate development with IT operations, providing comprehensive solutions that are both innovative and reliable. Whether I’m working on personal projects or tackling complex professional challenges, I continuously strive to refine my skills and apply best practices that bridge the gap between cutting-edge development and efficient system management.
</p>




          <div className="box-container">
            <div className="box">
              <p>
                <span>Email:</span> {profile.email}
              </p>
              <p>
                <span>Place:</span> {profile.address}
              </p>
            </div>
          </div>
          <br />
          <div className="d-flex gap-4 mt-5">
            <a
              href={profile.link_linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg d-flex align-items-center"
              style={{ padding: '10px 0px', fontSize: '18px' }}
            >
              <i className="fab fa-linkedin me-3" style={{ fontSize: '24px' }}></i> LinkedIn
            </a>
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

          <div className="resumebtn">
            <a 
              href="/CV_Eddy_Nilsen.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
            >
              <i className="fas fa-file-pdf" style={{ marginRight: "8px" }}></i>
              <span>Resume ( CV )</span>
              <i className="fas fa-chevron-right" style={{ marginLeft: "8px" }}></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
