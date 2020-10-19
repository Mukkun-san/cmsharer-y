import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardCard } from "./.jsx";
import { useHistory } from "react-router-dom";
import authenticate from "../Helpers/authenticate";

export default function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    authenticate(history);
  }, []);

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
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <button
                      id="downloadBtn"
                      onClick={() => {}}
                      type="button"
                      className="btn btn-outline-info btn-block btn-lg">
                      Download
                    </button>
                  </div>
                </div>
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
