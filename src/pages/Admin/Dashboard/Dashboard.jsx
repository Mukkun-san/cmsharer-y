import React, { useState, useEffect } from "react";
import { DashboardCard, LinkLoader } from "./.jsx";
import { toastError, toastWarning } from "../../../Helpers/toasts";
import axios from "axios";
import { API_URL, ADMIN_TOKEN } from "../../../store/consts.js";
import Loader from "../../../components/Loader";
import scss from "./styles.module.scss";
import { Helmet } from "react-helmet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Icon from "@material-ui/core/Icon";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [loadingLinkGen, setloadingLinkGen] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [generatedLink, setGeneratedLink] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .post(
        API_URL + "/stats/getall",
        {},
        { headers: { authorization: ADMIN_TOKEN } }
      )
      .then((result) => {
        setStats(result.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error Occured!");
        setLoading(false);
      });
  }, []);

  async function generateLink() {
    setGeneratedLink(false);
    setLoadingMsg(false);
    const yandexLinkRegExp = new RegExp("https://yadi.sk/", "i");
    if (!link) {
      toastError("Enter a drive file link to generate");
    } else if (link.match(yandexLinkRegExp)) {
      setloadingLinkGen(true);
      setLoadingMsg("Generating File Link");
      axios
        .post(
          API_URL + "/links/add/yandex",
          { public_key: link.trim() },
          { headers: { authorization: ADMIN_TOKEN } }
        )
        .then((result) => {
          if (result.data.slug) {
            setGeneratedLink(window.location.origin + "/y/" + result.data.slug);
          } else {
            toastWarning(result.data.msg);
          }
          setloadingLinkGen(false);
        })
        .catch((err) => {
          toastError("Error occured");
          setloadingLinkGen(false);
        });
    } else {
      toastError("Not a valid yandex link");
    }
  }
  return (
    <div className={scss.textSize}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
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
                    <DashboardCard
                      icon="user--v1.png"
                      title="Users"
                      count={stats.users}
                    />
                  </div>
                  <div className="col-12 col-sm-4 mb-3 ml-auto mr-auto">
                    <DashboardCard
                      title="Links"
                      icon="folder-invoices.png"
                      count={stats.links}
                    />
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
                            id="inputGroup-sizing-lg"
                          >
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
                        className="btn btn-outline-info btn-block btn-lg"
                      >
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
                            File Available at:{"   "}
                            <a href={generatedLink}>{generatedLink}</a>
                            <CopyToClipboard
                              className="btn p-0 ml-3 mt-2"
                              text={generatedLink}
                            >
                              <p className="btn p-0 m-0 d-flex align-content-center">
                                <Icon className="mr-2 mt-2">content_copy</Icon>
                                <b className="my-auto d-flex align-self-center text-center">
                                  Copy Link
                                </b>
                              </p>
                            </CopyToClipboard>
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
