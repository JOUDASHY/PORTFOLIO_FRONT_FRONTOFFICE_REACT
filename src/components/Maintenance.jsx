import React from 'react';
import Image from "../assets/images/logo.png";

const Maintenance = () => {
  return (
    <div className="maintenance-page">
      <div className="bg-pattern"></div>
      <div className="maintenance-content">
        <header className="header-section">
          <div className="logo-container">
            <img src={Image} alt="Logo" className="main-logo" />
            <div className="logo-glow"></div>
          </div>
          <h2 className="portfolio-title">Nilsen's Portfolio</h2>
          <p className="portfolio-subtitle">Web Development & DevOps</p>
        </header>
        
        <main className="main-section">
          <div className="warning-banner">
            <i className="fas fa-exclamation-triangle warning-icon"></i>
            <span className="warning-text">Maintenance Programmée</span>
          </div>
          
          <h1 className="title">
            <span className="title-main">Site en Maintenance</span>
            <span className="title-sub">Nous améliorons votre expérience</span>
          </h1>
          
          <div className="info-box">
            <div className="status-icon">
              <i className="fas fa-info-circle info-icon large-icon"></i>
            </div>
            <div className="status-info">
              <p className="status-message">Services temporairement indisponibles</p>
              <div className="info-details">
                <i className="fas fa-exclamation-circle"></i>
                <span>Maintenance en cours...</span>
              </div>
            </div>
          </div>

          <div className="status-box">
            <div className="status-icon">
              <i className="fas fa-cog rotating-icon"></i>
              <i className="fas fa-tools secondary-icon"></i>
            </div>
            <div className="status-info">
              <p className="status-message">Mise à jour système en cours</p>
              <div className="progress-bar">
                <div className="progress-track">
                  <div className="progress-glow"></div>
                </div>
                <div className="progress-label">
                  <i className="fas fa-clock"></i>
                  <span>Temps estimé: quelques minutes</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .maintenance-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, var(--bleu) 0%, #001428 100%);
          position: relative;
          padding: 1rem;
        }

        .bg-pattern {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(circle at 0% 0%, rgba(246, 140, 9, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(246, 140, 9, 0.1) 0%, transparent 50%);
          opacity: 0.5;
        }

        .maintenance-content {
          width: 100%;
          max-width: 800px;
          background: rgba(0, 11, 49, 0.7);
          border-radius: 24px;
          border: 2px solid var(--jaune);
          box-shadow: 0 8px 32px rgba(246, 140, 9, 0.15);
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .header-section {
          padding: 2rem;
          text-align: center;
          position: relative;
          background: rgba(0, 0, 0, 0.2);
        }

        .logo-container {
          position: relative;
          display: inline-block;
        }

        .main-logo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          padding: 10px;
          background: var(--jaune);
          border: 3px solid var(--jaune);
          box-shadow: 0 0 25px rgba(246, 140, 9, 0.4);
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 15px var(--jaune));
        }

        .logo-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--jaune) 0%, transparent 70%);
          opacity: 0.4;
          animation: pulse 2s ease-in-out infinite;
        }

        .portfolio-title {
          color: var(--light);
          font-size: 1.8rem;
          font-weight: 700;
          margin-top: 1.5rem;
          text-shadow: 0 0 15px var(--jaune);
        }

        .portfolio-subtitle {
          color: var(--jaune);
          font-size: 1.2rem;
          margin-top: 0.5rem;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .main-section {
          padding: 2rem;
        }

        .title {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .title-main {
          display: block;
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px var(--jaune);
          animation: slideIn 1s ease-out;
        }

        .title-sub {
          display: block;
          font-size: 1.1rem;
          color: var(--jaune);
          opacity: 0.9;
        }

        .warning-banner {
          background: rgba(0, 217, 255, 0.15);
          border: 1px solid var(--blue-ciel);
          border-radius: 8px;
          padding: 1rem 2rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          animation: pulse 2s infinite;
        }

        .warning-icon {
          color: var(--blue-ciel);
          font-size: 1.5rem;
          animation: shake 2s infinite;
          text-shadow: 0 0 10px var(--blue-ciel);
          display: flex;
          align-items: center;
        }

        .warning-text {
          color: var(--light);
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        }

        .info-box, .status-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid var(--jaune);
          box-shadow: 0 4px 20px rgba(246, 140, 9, 0.1);
          animation: fadeInUp 0.8s ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .status-icon {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .rotating-icon {
          font-size: 2.5rem;
          color: var(--jaune);
          filter: drop-shadow(0 0 10px var(--jaune));
          animation: rotate 4s linear infinite;
        }

        .secondary-icon {
          font-size: 2.5rem;
          color: var(--jaune);
          filter: drop-shadow(0 0 10px var(--jaune));
          animation: float 3s ease-in-out infinite;
        }

        .large-icon {
          font-size: 2.5rem;
          color: var(--jaune);
          filter: drop-shadow(0 0 10px var(--jaune));
        }

        .status-message {
          color: white;
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .info-details {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--jaune);
          font-size: 1rem;
          opacity: 0.9;
        }

        .progress-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .progress-glow {
          height: 100%;
          width: 50%;
          background: var(--jaune);
          border-radius: 6px;
          box-shadow: 0 0 20px var(--jaune);
          animation: progressAndGlow 2s ease-in-out infinite;
        }

        .progress-label {
          color: var(--jaune);
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes progressAndGlow {
          0% { 
            transform: translateX(-100%);
            box-shadow: 0 0 10px var(--jaune);
          }
          50% {
            box-shadow: 0 0 20px var(--jaune);
          }
          100% { 
            transform: translateX(200%);
            box-shadow: 0 0 10px var(--jaune);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }

        @media (max-width: 768px) {
          .maintenance-content {
            margin: 0.5rem;
            padding: 1rem;
          }

          .main-logo {
            width: 70px;
            height: 70px;
          }

          .portfolio-title {
            font-size: 1.3rem;
            margin-top: 1rem;
          }

          .portfolio-subtitle {
            font-size: 0.9rem;
          }

          .warning-banner {
            padding: 0.6rem 1rem;
            gap: 0.8rem;
          }

          .warning-text {
            font-size: 0.95rem;
          }

          .warning-icon {
            font-size: 1.2rem;
          }

          .title-main {
            font-size: 1.4rem;
          }

          .title-sub {
            font-size: 0.9rem;
          }

          .info-box, .status-box {
            padding: 1.5rem;
          }

          .large-icon {
            font-size: 2rem;
          }

          .status-message {
            font-size: 1rem;
            margin-bottom: 1rem;
          }

          .progress-label {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .maintenance-content {
            margin: 0.3rem;
          }

          .main-logo {
            width: 60px;
            height: 60px;
          }

          .portfolio-title {
            font-size: 1.1rem;
          }

          .warning-text {
            font-size: 0.9rem;
          }

          .title-main {
            font-size: 1.2rem;
          }

          .rotating-icon,
          .secondary-icon {
            font-size: 1.8rem;
          }
        }

        @media (min-width: 1200px) {
          .maintenance-content {
            max-width: 1000px;
          }

          .main-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 3rem;
          }

          .warning-banner {
            grid-column: 1 / -1;
          }

          .title {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </div>
  );
};

export default Maintenance;
