import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import projetImg from "../assets/images/projet.png";
import Loading from "../Loading.jsx";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedScore, setSelectedScore] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const imagesModalRef = useRef(null);
  const fullscreenModalRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projets/`);
      setProjects(res.data);
    } catch (err) {
      toast.error("Error loading projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleRating = async (projectId) => {
    if (!selectedScore[projectId]) {
      Swal.fire("Warning", "Please select a rating", "warning");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/rating/`, {
        project_id: projectId,
        score: selectedScore[projectId],
      });
      await fetchProjects();
      Swal.fire("Success", "Rating submitted!", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Rating failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (average, editable, id) =>
    [...Array(5)].map((_, i) => (
      <motion.i
        key={i}
        className={`fas fa-star ${editable ? "pointer" : ""}`}
        style={{
          color: i < (average || selectedScore[id]) ? "var(--jaune)" : "#000",
          cursor: editable ? "pointer" : "default",
        }}
        whileTap={editable ? { scale: 1.2 } : {}}
        onClick={
          editable
            ? () => setSelectedScore({ ...selectedScore, [id]: i + 1 })
            : undefined
        }
      />
    ));

  const openImagesModal = (project) => {
    setSelectedProject(project);
    new window.bootstrap.Modal(imagesModalRef.current).show();
  };
  const closeImagesModal = () =>
    window.bootstrap.Modal.getInstance(imagesModalRef.current).hide();
  const openFullscreen = (img) => {
    setFullscreenImage(img);
    new window.bootstrap.Modal(fullscreenModalRef.current).show();
  };
  const closeFullscreen = () => {
    window.bootstrap.Modal.getInstance(fullscreenModalRef.current).hide();
    setFullscreenImage(null);
  };

  return (
    <div className="container-fluid p-0">
      <header
        className="text-white py-5 position-relative"
        style={{ background: "var(--blue)" }}
      >
        <div className="container text-center">
          <motion.h1
            className="display-4 fw-bold color-jaune"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-laptop-code me-2" /> My Projects
          </motion.h1>
          <motion.p
            className="lead opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transforming ideas into impactful digital solutions.
          </motion.p>
        </div>
        <div
          className="position-absolute bottom-0 w-100 overflow-hidden"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "80px", width: "100%" }}
          >
            <path
              d="M0.00,49.98 C150.00,150.00 349.87,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#fff" }}
            />
          </svg>
        </div>
      </header>

      <main className="container py-5">
        {loadingProjects ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="card h-100 border-0 rounded-3 overflow-hidden"
                  style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)" }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div
                    style={{
                      height: "5px",
                      background: "var(--blue)",
                    }}
                  />
                  <img
                    src={project.related_images[0]?.image || projetImg}
                    className="card-img-top object-fit-cover"
                    alt={project.nom}
                    style={{ height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold color-blue small">{project.nom}</h5>
                    <p className="text-muted small mb-3">{project.techno}</p>

                    <div className="mt-auto mb-3">
                      {project.average_score ? (
                        <div className="d-flex align-items-center">
                          {renderStars(project.average_score, false)}
                          <span className="ms-2 text-muted small">
                            ({project.average_score.toFixed(1)})
                          </span>
                        </div>
                      ) : (
                        <span className="badge bg-secondary small">Not Rated</span>
                      )}
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {project.projetlink && (
                        <motion.a
                          href={project.projetlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-blue btn-sm flex-grow-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <i className="fas fa-external-link-alt me-2" /> Live Demo
                        </motion.a>
                      )}
                      <motion.button
                        className="btn btn-outline-dark btn-sm flex-grow-1"
                        onClick={() => openImagesModal(project)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <i className="fas fa-images me-2" /> Gallery
                      </motion.button>
                    </div>

                    <div>
                      <p className="small mb-2">Rate this project:</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>{renderStars(0, true, project.id)}</div>
                        <motion.button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleRating(project.id)}
                          disabled={loading}
                          whileTap={{ scale: 0.95 }}
                        >
                          {loading ? "Submitting..." : "Submit"}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Gallery Modal */}
      <div className="modal fade" ref={imagesModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div
              className="modal-header bg-gradient"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff" }}
            >
              <h5 className="modal-title">
                <i className="fas fa-images me-2" /> {selectedProject?.nom}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeImagesModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-2 row-cols-md-3 g-3">
                {selectedProject?.related_images?.map((img, idx) => (
                  <div key={idx} className="col">
                    <motion.img
                      src={img.image}
                      alt={`Gallery ${idx + 1}`}
                      className="img-fluid rounded cursor-pointer"
                      style={{ height: "150px", objectFit: "cover" }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => openFullscreen(img.image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <div className="modal fade" ref={fullscreenModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content bg-dark">
            <div className="modal-body d-flex align-items-center justify-content-center">
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen"
                className="img-fluid"
                style={{ maxHeight: "90vh" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                onClick={closeFullscreen}
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 text-center">
        <NavLink to="/Home" className="btn btn-outline-secondary btn-sm">
          <i className="fas fa-arrow-left me-2" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Projects;

