import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-xl">
        <i className="mr-5"></i>
        <Link className="navbar-brand" to="/">
          <h2>CM Sharer</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/page/terms-conditions">
                Terms & Conditions
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/page/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/page/dmca">
                DMCA
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/page/contact">
                Contact
              </Link>
            </li>
            <i className="mr-5"></i>
          </ul>
        </div>
      </nav>
    </div>
  );
}
