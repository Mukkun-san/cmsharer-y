import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className="container text-center w-100 py-5 my-5">
      <Helmet>
        <title>CM Sharer (yandex) - 404 NOT FOUND</title>
      </Helmet>
      <div className="row">
        <div className="col-md-12">
          <div className={styles.errorTemplate}>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <br />
            <div className="error-details">
              Sorry, Requested page not found!
            </div>
            <br />
            <div className={styles.errorActions}>
              <Link to="/" className="btn btn-dark btn-lg mr-3">
                <span className="glyphicon glyphicon-home"></span>
                Take Me Home{" "}
              </Link>
              <Link to="/page/contact" className="btn btn-warning btn-lg ml-3">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
