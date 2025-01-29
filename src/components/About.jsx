import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/NilsenProfile/`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <section className="about" id="about">
      <h2 className="heading">
        <i className="fas fa-user-alt"></i> About <span>Me</span>
      </h2>

      <div className="row">
        <div className="image">
          <img
            draggable="false"
            className="tilt"
            src={`${import.meta.env.VITE_API_BASE_URL}${profile.image}`}
            alt="Profile"
          />
        </div>
        <div className="content">
          <h3>I'm {profile.username}</h3>
          <span className="tag">Full Stack Developer</span>

          <p>
            I am a software developer based in {profile.address}. I am very
            passionate about improving my coding skills & developing
            applications & websites. I love working with modern technologies and
            frameworks. I build WebApps and Websites using Django, Laravel, react and other
            technologies. I strive to work on personal projects to further my
            skills.
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
    <i className="fas fa-file-pdf" style={{ marginRight: "8px" }}></i> {/* Icone du CV */}
    <span>Resume ( CV )</span>
    <i className="fas fa-chevron-right" style={{ marginLeft: "8px" }}></i>
  </a>
</div>
        </div>
      </div>
    </section>
  );
};

export default About;
