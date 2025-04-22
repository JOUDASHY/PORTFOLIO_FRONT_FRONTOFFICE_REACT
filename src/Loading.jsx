// components/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border color-blue" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border color-jaune ms-4" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border color-blue ms-4" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
