import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardCard, LinkLoader } from "./.jsx";
import {
  toastError,
  toastWarning,
  toastSuccess,
} from "../../../Helpers/toasts";
import axios from "axios";
import { API_URL } from "../../../store/consts.js";
import Loader from "../../../components/Loader";
import scss from "./styles.module.scss";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [loadingLinkGen, setloadingLinkGen] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [generatedLink, setGeneratedLink] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .post(API_URL + "/stats/getall", {
        accessToken: window.localStorage.getItem("adminToken"),
      })
      .then((result) => {
        setStats(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
      setloadingLinkGen(true);
      setLoadingMsg("Checking Drive File Link...");
      try {
        let getfile = await axios.post(API_URL + "/drive/verifFile", {
          fileId,
        });
        if (getfile.data.fileExists) {
          setLoadingMsg("Generating File Link");
          let addfile = await axios.post(API_URL + "/drive/addFile", {
            ...getfile.data,
          });
          if (addfile.data.message) {
            setTimeout(() => {
              toastWarning(addfile.data.message);
              setGeneratedLink(window.location.origin + "/drive/" + fileId);
            }, 250);
          } else {
            addfile.data === "OK"
              ? setTimeout(() => {
                  toastSuccess("Link Successfully Generated.");
                  setGeneratedLink(window.location.origin + "/drive/" + fileId);
                }, 250)
              : setTimeout(() => {
                  toastError("Error Generating Link, please try again later.");
                }, 250);
          }
          setTimeout(() => {
            setLoadingMsg(false);
            setloadingLinkGen(false);
          }, 250);
        } else {
          setLoadingMsg(false);
          setloadingLinkGen(false);
          toastError("The file link in not working");
        }
      } catch (error) {
        setloadingLinkGen(false);
        toastError("The file link in not working");
      }
    }
  }
  return (
    <div className={scss.textSize}>
      {loading ? (
        <Loader color="warning" />
      ) : (
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
                  <div className="col-12 col-sm-4 mb-3 ml-auto mr-auto">
                    <Link
                      to="/admin/dashboard/users"
                      style={{ textDecoration: "none" }}>
                      <DashboardCard
                        icon="user--v1.png"
                        title="Users"
                        count={stats.users}
                      />
                    </Link>
                  </div>
                  <div className="col-12 col-sm-4 mb-3 ml-auto mr-auto">
                    <Link
                      to="/admin/dashboard/links"
                      style={{ textDecoration: "none" }}>
                      <DashboardCard
                        title="Links"
                        icon="folder-invoices.png"
                        count={stats.links}
                      />
                    </Link>
                  </div>
                  <div className="col-12 col-sm-4 mb-3 ml-auto mr-auto">
                    <DashboardCard
                      title="Downloads"
                      icon="download-from-cloud.png"
                      count={stats.downloads}
                    />
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
                        {loadingLinkGen ? (
                          <div>
                            <LinkLoader />
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
      )}
    </div>
  );
}
