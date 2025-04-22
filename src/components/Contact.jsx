import React, { useState, useRef } from "react";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import logo from "../assets/images/logo.png";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/emails/`, formData);
      
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          access_key: "30e0198b-9fe5-4e87-97a5-97dc8ac90f58"
        })
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "TRANSMISSION SUCCESS",
          html: '<div class="color-jaune">MESSAGE ENCRYPTED<br/>RESPONSE PROTOCOL INITIATED</div>',
          icon: "success",
          background: 'var(--blue)',
          confirmButtonColor: '#0ff',
          customClass: {
            confirmButton: 'cyber-button'
          }
        });
        formRef.current.reset();
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error("TRANSMISSION FAILED", {
        style: { 
          background: '#f00',
          color: '#fff',
          border: '2px solid #0ff',
          fontSize: '1.2em'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="cyber-contact">
      <div className="cyber-grid">
        {/* Left Panel - HUD Interface */}
        <div className="cyber-panel">
          <div className="hud-display">
            <div className="hud-header">
              <img src={logo} alt="Cyber Logo" className="cyber-logo" />
              <h1 className="cyber-title">
                <span className="glitch-text">CONTACT ME //</span>
                <span className="scanline"></span>
              </h1>
            </div>
            
            <div className="hud-info">
              <div className="info-line">
                <span className="label">STATUS:</span>
                <span className="value active">ONLINE</span>
              </div>
              <div className="info-line">
                <span className="label">PROTOCOL:</span>
                <span className="value">ENCRYPTED</span>
              </div>
              <div className="info-line">
                <span className="label">LATENCY:</span>
                <span className="value">12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form Interface */}
        <div className="cyber-form">
          <div className="form-container">
            <form ref={formRef} onSubmit={handleSubmit} className="terminal-form">
              <div className="form-field">
                <label className="cyber-label">
                  <span className="label-text">IDENTITY STRING ( your Name )</span>
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    className="cyber-input"
                    onChange={handleInputChange}
                    required
                    placeholder="...."
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-field">
                <label className="cyber-label">
                  <span className="label-text">CONTACT NODE ( your email )</span>
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    className="cyber-input"
                    onChange={handleInputChange}
                    required
                    placeholder="....@gmail.com"
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-field">
                <label className="cyber-label">
                  <span className="label-text">MESSAGE PAYLOAD ( your message )</span>
                </label>
                <div className="input-container">
                  <textarea
                    name="message"
                    className="cyber-input textarea"
                    rows="5"
                    onChange={handleInputChange}
                    required
                    placeholder="...."
                  ></textarea>
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-field">
                <button 
                  type="submit" 
                  className="cyber-button"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="#0ff" />
                  ) : (
                    <>
                      <span className="button-text">SEND</span>
                      <span className="button-lights">
                        <span className="light red"></span>
                        <span className="light yellow"></span>
                        <span className="light green"></span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="dark" />
      
      <style jsx>{`
  .cyber-contact {
    background: var(--blue);
    padding: 2rem;
    overflow: hidden;
    position: relative;
    border: 3px solid #0ff;
  }

  .cyber-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    height: 100%;
  }

  .cyber-panel {
    background: rgba(0, 32, 64, 0.8);
    border: 2px solid #0ff;
    padding: 2rem;
    position: relative;
  }

  .hud-display {
    position: relative;
    height: 100%;
  }

  .hud-header {
    border-bottom: 2px solid #0ff;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cyber-logo {
    width: 150px;
    filter: drop-shadow(0 0 5px var(--jaune));
    margin-bottom: 2rem;
  }

  .cyber-title {
    color: #0ff;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    position: relative;
    font-size: 2.5rem;
  }

  .glitch-text {
    position: relative;
    animation: glitch 2s infinite;
  }

  .hud-info {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #0ff;
  }

  .info-line {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: 0.5rem;
    background: rgba(0, 64, 128, 0.3);
  }

  .label {
    color: var(--jaune);
    font-family: monospace;
  }

  .value {
    color: #0f0;
    font-family: monospace;
    text-shadow: 0 0 5px #0f0;
  }

  .active {
    animation: pulse 1s infinite;
  }

  .cyber-form {
    padding: 2rem;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid var(--jaune);
    position: relative;
  }

  .form-container {
    width: 100%;
  }

  .terminal-form {
    width: 100%;
    position: relative;
  }

  .form-field {
    margin-bottom: 2rem;
    width: 100%;
  }

  .cyber-label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .label-text {
    color: #0ff;
    font-family: monospace;
    text-transform: uppercase;
    display: block;
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  .cyber-input {
    width: 100%;
    padding: 1rem;
    background: #000;
    border: 2px solid #0ff;
    color: #0f0;
    font-family: monospace;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .cyber-input:focus {
    outline: none;
    border-color: #f0f;
    box-shadow: 0 0 15px #f0f;
  }

  .textarea {
    resize: vertical;
    min-height: 120px;
  }

  .input-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--jaune);
    pointer-events: none;
    animation: borderScan 4s linear infinite;
  }

  .cyber-button {
    width: 100%;
    background: var(--blue)!important;
    border: 2px solid #0ff;
    color: var(--jaune);
    padding: 1.5rem 3rem;
    font-family: monospace;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    box-sizing: border-box;
  }

  .cyber-button:hover {
    background: #00ffff20;
    box-shadow: 0 0 20px #0ff;
  }

  .button-lights {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 5px;
  }

  .light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f00;
  }

  .yellow { background: #ff0; }
  .green { background: #0f0; }

  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 255, 255, 0.1) 51%,
      transparent 51%
    );
    background-size: 100% 4px;
    animation: scan 2s linear infinite;
  }

  @keyframes glitch {
    0% { text-shadow: 2px 0 #0ff, -2px 0 #f0f; }
    2% { text-shadow: -2px 0 #f0f, 2px 0 #0ff; }
    4% { text-shadow: 2px 0 #0ff, -2px 0 #f0f; }
    100% { text-shadow: 2px 0 #0ff, -2px 0 #f0f; }
  }

  @keyframes borderScan {
    0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
    50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    100% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @media (max-width: 1200px) {
    .hud-header {
      flex-direction: column;
      text-align: center;
    }
    
    .cyber-logo {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 768px) {
    .cyber-contact {
      padding: 1rem;
    }

    .cyber-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .cyber-panel,
    .cyber-form {
      padding: 1rem;
    }

    .cyber-logo {
      width: 100px;
    }

    .cyber-title {
      font-size: 2rem;
    }

    .cyber-input {
      padding: 0.75rem;
    }

    .textarea {
      min-height: 100px;
    }

    .cyber-button {
      padding: 1rem 2rem;
      font-size: 0.9rem;
    }

    .button-lights .light {
      width: 8px;
      height: 8px;
    }
  }
`}</style>
    </section>
  );
};

export default Contact;