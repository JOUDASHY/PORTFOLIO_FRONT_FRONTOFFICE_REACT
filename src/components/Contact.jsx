import React, { useState, useRef } from "react";

import axios from 'axios';

import { ClipLoader } from 'react-spinners'; // Import du spinner
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Image from "../assets/images/testimonial-bg.jpg";
import Swal from "sweetalert2";
import logo from "../assets/images/logo.png";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // État pour le spinner

  const notificationSystem = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le spinner
  
    try {
      console.log("Envoi à Axios");
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/emails/`, {
        name,
        email,
        message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      
     
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("access_key", "30e0198b-9fe5-4e87-97a5-97dc8ac90f58");
    
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
    
      const result = await res.json();
   
    
      if (result.success) {
        // toast.success("Message envoyé avec succès");
        Swal.fire({
          title: "Bravo !",
          text: "Message envoyé avec succès.",
          icon: "success"
      });
        resetForm();
      } else {
        toast.error("Échec de l'envoi à Web3Forms");
      }
    } catch (err) {
     
      // toast.error("Échec d'envoi de message");
      Swal.fire({
        title: "Oops !",
        text: "Échec d'envoi de message",
        icon: "error"
    });
    }
    finally {
      setLoading(false); // Masquer le spinner
    }
    
  };
  
  const showNotification = (message, level) => {
    const notification = notificationSystem.current;
    notification.addNotification({
      message,
      level,
    });
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };
  return (
    <section className="contact" id="contact">
                 {/* <ToastContainer /> */}

      <h2 className="heading">
      <img 
  src={logo} 
  alt="" 
  style={{ width: '1.5em', height: '1.5em', objectFit: 'contain' ,marginRight: '0.5em' }} 
/> Contact <span>me</span>
      </h2>

      <div className="container">
        <div className="content">
          <div className="image-box">
            <img draggable="false" src={Image} alt="Contact" />
          </div>

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="field">
                <input type="text" 
                name="name" placeholder="Name"   
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
                <i className="fas fa-user"></i>
              </div>
              <div className="field">
                <input type="email" name="email" placeholder="Email"       
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
                <i className="fas fa-envelope"></i>
              </div>
            
              <div className="message">
                <textarea placeholder="Message" name="message"  
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                required></textarea>
                <i className="fas fa-comment-dots"></i>
              </div>
            </div>
            <div className="button-area">
              <button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                          <ClipLoader color="#ffffff" size={20} /> // Spinner ici
                        ) : (
                          <>  Submit <i className="fa fa-paper-plane"></i>
                          </>
                        )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
