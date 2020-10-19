import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-xl navbar-light bg-light py-3">
        <i className="mr-5"></i>
        <Link className="navbar-brand" to="/admin/dashboard">
          <h2 className="text-warning">CM Admin</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="ml-auto mr-5 btn"
          onClick={() => {
            window.sessionStorage.removeItem("adminToken");
            window.location.reload();
          }}>
          <i className="mr-5"></i>
          <p className="d-inline text-white mr-3">Logout</p>
          <img
            className="d-inline"
            alt=""
            src="data:image/png;base64,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"></img>
        </div>
      </nav>
    </div>
  );
}
