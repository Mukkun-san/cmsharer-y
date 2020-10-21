import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardCard, Loader } from "./.jsx";
import { useHistory } from "react-router-dom";
import authenticate from "../Helpers/authenticate";
import { toastError, toastWarning, toastSuccess } from "../Helpers/toasts";
import axios from "axios";
import { API_URL } from "../../../config/index.js";

export default function Dashboard() {
  const history = useHistory();
  const [link, setLink] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [generatedLink, setGeneratedLink] = useState(null);

  useEffect(() => {
    authenticate(history);
  }, []);

  async function generateLink() {
    setGeneratedLink(false);
    setLoadingMsg(false);
    const linkRegExp = new RegExp("^https://drive.google.com/file/d/", "i");
    if (!link) {
      toastError("Enter a drive file link to generate");
    } else if (!link.match(linkRegExp)) {
      toastError("'" + link + "' is not a valid drive file link!");
    } else {
      let part1 = link.replace(linkRegExp, "");
      const fileId = part1.substring(0, part1.indexOf("/"));
      setloading(true);
      setLoadingMsg("Checking Drive File Link...");
      try {
        let getfile = await axios.post(API_URL + "/drive/getFile", {
          fileId,
        });
        if (getfile.data.fileExists) {
          setLoadingMsg("Generating File Link");
          try {
            let addfile = await axios.post(API_URL + "/drive/addFile", {
              ...getfile.data,
            });
            if (addfile.data.message) {
              setTimeout(() => {
                toastWarning(addfile.data.message);
                setGeneratedLink(window.location.origin + "/drive/" + fileId);
              }, 750);
            } else {
              addfile.data === "OK"
                ? setTimeout(() => {
                    toastSuccess("Link Successfully Generated.");
                    setGeneratedLink(
                      window.location.origin + "/drive/" + fileId
                    );
                  }, 750)
                : setTimeout(() => {
                    toastError(
                      "Error Generating Link, please try again later."
                    );
                  }, 750);
            }
          } catch (error) {}
          setTimeout(() => {
            setLoadingMsg(false);
            setloading(false);
          }, 750);
        } else {
          setLoadingMsg(false);
          setloading(false);
          toastError("The file link in not working");
        }
      } catch (error) {
        setloading(false);
        toastError("The file link in not working");
      }
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-11">
          <div className="d-flex ml-5 pl-5 mt-5">
            <img
              className="mt-2"
              src="https://img.icons8.com/material-rounded/60/dashboard.png"
              alt=""
              style={{ opacity: 0.7, height: "40px" }}
            />
            <h1 className="ml-3 text-center">Dashboard</h1>
          </div>
          <br />
          <br />
          <div className="row my-auto">
            <div className="col-11">
              <div className="row">
                <div className="col col-sm-12 col-md-3 ml-auto mr-auto">
                  <Link
                    to="/admin/dashboard/users"
                    style={{ textDecoration: "none" }}>
                    {dashboardCard("user--v1.png", "Users", 0)}
                  </Link>
                </div>
                <div className="col col-sm-12 col-md-3 ml-auto mr-auto">
                  <Link
                    to="/admin/dashboard/links"
                    style={{ textDecoration: "none" }}>
                    {dashboardCard("folder-invoices.png", "Links", 0)}
                  </Link>
                </div>
                <div className="col col-sm-12 col-md-3 ml-auto mr-auto">
                  <Link
                    to="/admin/dashboard/downloads"
                    style={{ textDecoration: "none" }}>
                    {dashboardCard("download-from-cloud.png", "Downloads", 0)}
                  </Link>
                </div>
              </div>
              <br />
              <br />
              <div className="card">
                <div className="d-flex ml-5 mt-5">
                  <h3 className="ml-3 text-center">Generate DDL</h3>
                </div>
                <div className="row m-5">
                  <div className="col col-9">
                    <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-lg">
                          <img
                            src="https://img.icons8.com/material-outlined/24/000000/download-from-cloud.png"
                            alt=""
                          />
                        </span>
                      </div>
                      <input
                        id="fileLink"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Enter Drive File Link to Generate DDL"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <button
                      id="downloadBtn"
                      onClick={() => {
                        generateLink();
                      }}
                      type="button"
                      className="btn btn-outline-info btn-block btn-lg">
                      Generate Link
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex justify-content-center">
                      {loading ? (
                        <div>
                          <Loader />
                          <p className="d-inline ml-3">
                            {loadingMsg}, Please wait..
                          </p>
                        </div>
                      ) : null}
                      {generatedLink ? (
                        <p className="success">
                          File Available at:{" "}
                          <a href={generatedLink}>{generatedLink}</a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <br />
              <br />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
