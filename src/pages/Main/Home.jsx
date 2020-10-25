import React from "react";
import * as styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ handleAuthClick }) {
  return (
    <div className={`${styles.home}`}>
      <div
        className={`card text-center mt-5 p-4 pt-5 pb-5 pr-5 pl-4 ${styles.welcomeCard}`}>
        <div className="card-content">
          <h3>
            WELCOME TO <b>CM Sharer</b>!
          </h3>
          <br />
          <p>Easily share Google Drive files with anyone! Upload and Share</p>
          <strong>CM Sharer is 100% free &amp; Easy to use</strong>
          <p>
            Simple. CM Sharer is a sharing tool. We offer online file and folder
            manager, and it's also uploading and downloading tools. With CM
            Sharer, you can share all your personal files on the same place. We
            guarantee that all your google drive informations and files are kept
            securely on our server and we will never release your information
            unknownly. For more information
          </p>
          <p>Just Login to your google account to use our service.</p>
          <div className="d-flex justify-content-center d-inline">
            <div
              className="w-auto pr-5 pl-5 d-flex btn btn-light"
              onClick={handleAuthClick}>
              <img
                alt=""
                src="https://img.icons8.com/plasticine/100/000000/google-logo.png"
                style={{ height: "2.5rem" }}></img>
              <p className="ml-4 mt-2">Sign Up With Google</p>
            </div>
          </div>
          <img
            className="img-fluid w-50"
            src="https://cdn.dribbble.com/users/1279501/screenshots/4922374/illustration.png"
            alt=""
            srcSet=""></img>
          <br />
        </div>
      </div>
    </div>
  );
}
