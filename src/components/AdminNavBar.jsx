import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavBar({ adminIsLoggedin }) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-xl">
        <i className="mr-5"></i>
        <Link className="navbar-brand" to="/admin/dashboard">
          <h2 className="text-warning">CM Admin</h2>
        </Link>

        {adminIsLoggedin ? (
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
        ) : null}

        {adminIsLoggedin ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="my-auto ml-5"></li>
              <li className="my-auto ml-5">
                <Link className="btn btn-link my-auto" to="/admin/account">
                  <img
                    alt="logout"
                    src="https://img.icons8.com/material-outlined/26/ffffff/guest-male.png"></img>
                  <h5 className="font-weight-normal text-white">Account</h5>
                </Link>
              </li>
              <li className="my-auto ml-5">
                <div
                  className="mr-5 btn btn-link my-auto"
                  onClick={() => {
                    window.localStorage.removeItem("adminToken");
                    window.localStorage.removeItem("admin");
                    window.location.reload();
                  }}>
                  <img
                    alt="logout"
                    src="https://img.icons8.com/material-outlined/26/ffffff/lock-2.png"></img>
                  <h5 className="font-weight-normal text-white ml-1">Logout</h5>
                </div>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
