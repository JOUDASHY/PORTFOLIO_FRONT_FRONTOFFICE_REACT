import React from 'react';
import PropTypes from 'prop-types';

const PageBanner = ({ title, intro, backgroundImage }) => {
  return (
    <div
      className="page-banner relative text-center py-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay sombre et flou */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // ombre
          backdropFilter: 'blur(2px)', // flou
          zIndex: 1,
        }}
      ></div>

      {/* Texte en jaune au-dessus de l'overlay */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {intro && (
          <h3 className="display-6 color-jaune fw-bold d-none d-md-block">
            {intro}
          </h3>
        )}
        {intro && (
          <h3 className="h2 color-jaune fw-bold d-md-none">
            {intro}
          </h3>
        )}
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string,
  backgroundImage: PropTypes.string.isRequired,
};

export default PageBanner;
