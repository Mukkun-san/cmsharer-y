import React from "react";

export default function Loader({ color }) {
  return (
    <div
      id="loader"
      className="row align-items-center"
      style={{
        background: "white",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        zIndex: 5000,
      }}>
      <div className="mx-auto text-center">
        <div
          className={`spinner-border text-${color}`}
          style={{ width: "5rem", height: "5rem" }}
          role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
