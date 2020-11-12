import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ADMIN_TOKEN } from "../../../store/consts";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Helmet } from "react-helmet";

export default function AddLinks() {
  function YandexDisk() {
    const [link, setLink] = useState("");

    const [bulkLoading, setBulkLoading] = useState(false);
    const [generatedLinks, setGeneratedLinks] = useState([]);

    const [validation, setValidation] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [inBulk, setInBulk] = useState(false);
    const [bulkLinks, setBulkLinks] = useState("");

    function generateOne(e) {
      e.preventDefault();
      setMessage("Loading...");
      axios
        .post(
          API_URL + "/links/add/yandex",
          { public_key: link.trim() },
          { headers: { authorization: ADMIN_TOKEN } }
        )
        .then((result) => {
          console.log(result);
          if (result.data.slug) {
            setMessage(
              <p>
                File available at:
                <a href={window.location.origin + "/y/" + result.data.slug}>
                  {window.location.origin + "/y/" + result.data.slug}
                </a>
              </p>
            );
          } else {
            setMessage(result.data.msg);
          }
        })
        .catch((err) => {
          setMessage("Internal Server Error");
        });
    }

    function generateBulk() {
      setGeneratedLinks([]);
      let bulkLoading = [];
      let allLinks = [];
      setBulkLoading(true);
      bulkLinks.split("\n").forEach((link, linkNb) => {
        bulkLoading.push(true);
        allLinks.push({});
        axios
          .post(
            API_URL + "/links/add/yandex",
            { public_key: link.trim() },
            { headers: { authorization: ADMIN_TOKEN } }
          )
          .then((result) => {
            if (result.data) {
              allLinks[linkNb] = {
                msg: result.data.msg,
                link: result.data.slug
                  ? window.location.origin + "/y/" + result.data.slug
                  : null,
              };
            }
            bulkLoading[linkNb] = false;
            if (bulkLoading.every((x) => !x)) {
              setBulkLoading(false);
              setGeneratedLinks(allLinks);
              window.bulklinks = allLinks;
              console.log("finished:", generatedLinks);
            }
          })
          .catch((err) => {
            setMessage("Error adding link.");
          });
      });
    }

    function reset() {
      setMessage("");
      setLoading(false);
    }

    return (
      <div className="container">
        <Helmet>
          <title>Dashboard - Generate Links</title>
        </Helmet>
        <br />
        <div className="row">
          <div className="col">
            <div className="col-12 m-3">
              <img
                src={require("../../../assets/yandex-disk-logo.png")}
                width="40"
                alt="drive-logo"
              />
              <h4
                style={{ position: "absolute", bottom: 0 }}
                className="text-primary font-weight-normal d-inline ml-3"
              >
                Add Yandex.Disk Links
              </h4>
              <label className="float-right d-flex align-content-center">
                <span className="mr-2">
                  <b
                    className={
                      inBulk
                        ? "text-secondary font-weight-normal"
                        : "text-success"
                    }
                  >
                    Single
                  </b>{" "}
                </span>
                <Toggle
                  icons={false}
                  checked={inBulk}
                  onChange={(e) => {
                    setInBulk(Boolean(e.target.checked));
                    reset();
                  }}
                />
                <span className="ml-2">
                  <b
                    className={
                      inBulk
                        ? "text-success"
                        : "text-secondary font-weight-normal"
                    }
                  >
                    Bulk
                  </b>{" "}
                </span>
              </label>
            </div>

            {inBulk ? (
              <div className="mb-4">
                <p className="text-center text-secondary font-italic">
                  1 link per line.
                </p>
                <div className="form-group d-flex justify-content-center">
                  <textarea
                    value={bulkLinks}
                    onChange={(e) => {
                      setBulkLinks(e.target.value);
                    }}
                    className="form-control w-75"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div className="row">
                  <button
                    disabled={bulkLinks ? false : true}
                    className="btn btn-success mx-auto"
                    onClick={generateBulk}
                  >
                    Generate All
                  </button>
                </div>
                {bulkLoading ? (
                  <div className="row mx-auto mt-3">
                    <div
                      className="spinner-border text-primary mx-auto"
                      role="status"
                    >
                      <span className="sr-only text-primary">Loading...</span>
                    </div>
                  </div>
                ) : null}
                <div className="bg-light my-3 mx-5">
                  {generatedLinks && generatedLinks.length
                    ? generatedLinks.map((L, i) => {
                        return (
                          <div key={"yadisk-link" + i}>
                            <b>{i + 1}- </b>
                            {L.msg}
                            {L.link ? <a href={L.link}>: OPEN LINK</a> : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : (
              <div className="form-group my-4">
                <form onSubmit={generateOne}>
                  <div className="row ml-3">
                    <div className="col-9">
                      <input
                        placeholder="Paste Yandex.Disk public link"
                        type="text"
                        className={`form-control ${validation.state}`}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <div className="col-3">
                      <button
                        type="submit"
                        className={
                          loading ? "btn btn-light" : "btn btn-warning"
                        }
                        disabled={loading || !link ? true : false}
                      >
                        {!loading ? (
                          "Generate"
                        ) : (
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <p className={"col-12 mt-3 " + validation.class}>
                      {validation.text}
                    </p>
                  </div>
                </form>
                <div className="p-3 bg-light text-center font-smaller">
                  {message ? <div>{message}</div> : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card w-75 bg-light mx-auto my-4">
        <div className="card-header">
          <h1 className="text-center">Generate Links</h1>
        </div>
        <div className="card-body">
          <br />
          <div className="card col">
            <YandexDisk />
          </div>
        </div>
      </div>
    </div>
  );
}
