import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast } from 'react-toastify'; // Importation de Toastify
import Swal from 'sweetalert2'; // Importation de SweetAlert2
import projet from '../assets/images/projet.png'; 


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedScore, setSelectedScore] = useState({}); // Score sélectionné pour chaque projet
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projets/`);
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets :", error);
      toast.error("Erreur lors du chargement des projets.");
    }
  };
  useEffect(() => {
    // Récupérer les données de l'API


    fetchProjects();
  }, []);

  const handleRatingSubmit = async (projectId) => {
    if (!selectedScore[projectId]) {
      Swal.fire({
        icon: 'warning',
        title: 'Avertissement',
        text: 'Veuillez sélectionner une note avant de soumettre.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/rating/`, {
        project_id: projectId,
        score: selectedScore[projectId],
      });

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Votre note a été enregistrée !',
      });

      setSelectedScore({ ...selectedScore, [projectId]: null }); // Réinitialiser la note
      fetchProjects(); // Récupérer à nouveau les projets pour mettre à jour l'affichage
    } catch (error) {
      console.error("Erreur lors de l'envoi de la note :", error);

      // Vérification si l'erreur est liée à un projet déjà noté
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.response.data.message || "Impossible d'enregistrer votre note.",
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Impossible d'enregistrer votre note.",
        });
      }
    }
    setLoading(false);
  };
  

  const renderStars = (averageScore, editable, projectId) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const color = i <= averageScore ? "#f68c09" : "gray"; // Couleur en fonction du score
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          style={{ cursor: editable ? "pointer" : "default", color: color }}
          onClick={
            editable
              ? () => setSelectedScore({ ...selectedScore, [projectId]: i })
              : undefined
          }
        ></i>
      );
    }
    return stars;
  };

  return (
    <div>
    {/* Navbar */}
 

    <section className="work" id="projects">
      <h2 className="heading">
        <i className="fas fa-laptop-code"></i> Projects <span>Made</span>
      </h2>
      <div className="box-container">
  {projects.map((project) => (
    <div className="box tilt" key={project.id}>
      <div className="image-container">
      <img
  src={
    project.related_images.length > 0
      ? project.related_images[0].image
      : projet
  }
  alt={project.nom}
  style={{
    width: "100%", // Largeur fixe
    height: "300px", // Hauteur fixe
    objectFit: "cover", // Pour adapter l'image sans déformation
    borderRadius: "8px", // Facultatif, pour des coins arrondis
  }}
/>

        {project.related_images.length > 1 && (
          <span className="image-indicator">
            +{project.related_images.length - 1} images
          </span>
        )}
      </div>
      <div className="content">
        <div className="tag ">
          <h3>{project.nom}</h3>
        </div>
        <div className="desc">
          <p>
          
            {project.average_score ? (
              <>
                {renderStars(project.average_score, false, project.id)} (
                {project.average_score.toFixed(1)}/5)
              </>
            ) : (
              "Pas encore noté"
            )}
          </p>
          <p>
            <strong>Technologies:</strong> {project.techno}
          </p>

          <div className="rating">
            <p><strong>Donnez une note :</strong></p>
            <div>{renderStars(selectedScore[project.id] || 0, true, project.id)}</div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleRatingSubmit(project.id)}
              disabled={loading}
            >
              {loading ? "En cours..." : "Noter"}
            </button>
          </div>

          <div className="btns">
          {project.projetlink && (
  <a href={project.projetlink} className="btn" target="_blank" rel="noopener noreferrer">
    <i className="fas fa-eye"></i> View
  </a>
)}

          
            <button
              className="btn btn-secondary"
              onClick={() => openModal(project.related_images)}
            >
              <i className="fas fa-images"></i> toutes
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      <div className="backbtn">
        <NavLink to="/Home" className="btn">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Home</span>
        </NavLink>
      </div>

      {/* Modale pour afficher les images */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Voir toutes les images"
        overlayClassName="modal-overlay"
        className="customModal"
      >
        <div className="modal-header">
          <h4 className="modal-title">
            <i className="fas fa-images" style={{ marginRight: "8px" }}></i> Toutes les images
          </h4>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {selectedImages.length > 0 ? (
           <div className="images-grid">
           {selectedImages.map((image, index) => (
             <img
               key={index}
               src={image.image}
               alt={`Image ${index + 1}`}
               className="modal-image"
               onClick={() => setFullScreenImage(image.image)} // Affiche l'image en plein écran
             />
           ))}
         </div>
         
         
          ) : (
            <p>Aucune image disponible.</p>
          )}
          {fullScreenImage && (
  <Modal
    isOpen={true}
    onRequestClose={() => setFullScreenImage(null)} // Fermer le plein écran
    contentLabel="Image en plein écran"
    overlayClassName="modal-overlay"
    className="fullscreen-modal"
  >
    <div className="fullscreen-container">
      <img src={fullScreenImage} alt="Plein écran" className="fullscreen-image" />
      <button className="close-btn fullscreen-close" onClick={() => setFullScreenImage(null)}>
        &times;
      </button>
    </div>
  </Modal>
)}

        </div>
      </Modal>
    </section>
    {/* Scroll Top Button */}
  <a href="#home" className="fas fa-angle-up" id="scroll-top"></a>
  </div>
  );
};

export default Projects;
