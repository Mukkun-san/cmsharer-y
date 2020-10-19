import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSigninStatus } from "../store/reducers/user";
import axios from "axios";
import { API_URL } from "../config";

export default function NavBar() {
  const currentUser = useSelector((state) => state.user.details);
  const dispatch = useDispatch();

  function handleSignout() {
    window.gapi.auth2.getAuthInstance().signOut();
    dispatch(updateSigninStatus());
    window.location.reload();
  }
  function handleAuthClick() {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(async (res) => {
        let userdata = {
          uid: res.Ca,
          username: res.nt.Ad,
          email: res.nt.Wt,
          picture: res.nt.JJ,
        };
        await axios.post(API_URL + "/users/addOne", userdata);
        updateSigninStatus();
        window.location.reload();
      })
      .catch((err) => {
        updateSigninStatus();
      });
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-xl navbar-light bg-light py-3">
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
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/DMCA">
                DMCA
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/terms">
                Terms & Conditions
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {currentUser && currentUser.wc ? (
              <>
                <li className="nav-item ml-3">
                  <Link className="nav-link" to="/account">
                    Account
                  </Link>
                </li>
                <i className="mr-5"></i>
                <button
                  className="btn btn-sm btn-outline-secondary ml-2 active"
                  type="button"
                  onClick={() => {
                    handleSignout();
                  }}>
                  Logout
                </button>
              </>
            ) : (
              <div>
                <i className="mr-5"></i>
                <button
                  className="btn btn-sm btn-outline-secondary ml-2 px-3 py-2 active"
                  type="button"
                  onClick={() => {
                    handleAuthClick();
                  }}>
                  Login
                </button>
              </div>
            )}
            <i className="mr-5"></i>
          </ul>
        </div>
      </nav>
    </div>
  );
}
