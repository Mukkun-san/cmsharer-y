import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ADMIN_TOKEN } from "../../../store/consts";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function AddLinks() {
  function GoogleDrive() {
    const [validation, setValidation] = useState({});
    const [link, setLink] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);

    const [inBulk, setInBulk] = useState(false);
    const [byID, setByID] = useState(true);
    const [bulkLinks, setBulkLinks] = useState("");

    async function generateOne(e) {
      e.preventDefault();
      setLoading(true);
      const linkRegExp = new RegExp("^https://drive.google.com/file/d/", "i");
      if (!byID && !link.match(linkRegExp)) {
        setMessage("'" + link + "' is not a valid drive file link!");
      } else {
        let fileId;
        if (byID) {
          fileId = link.trim();
        } else {
          let part1 = link.replace(linkRegExp, "");
          fileId = part1.substring(0, part1.indexOf("/"));
        }
        setMessage("Checking Drive File...");
        window.gapi.client.drive.files
          .get({ fileId, fields: "id, name" })
          .then(async (getfile) => {
            setMessage("Generating File Link");
            let addfile = await axios.post(
              API_URL + "/links/add/drive",
              {
                ...getfile.result,
              },
              { headers: { authorization: ADMIN_TOKEN } }
            );
            if (addfile.data.message) {
              setMessage(
                <p>
                  {addfile.data.message} <br /> <b>Link:</b>
                  <a
                    target="_blank"
                    href={window.location.origin + "/drive/" + fileId}
                  >
                    {window.location.origin + "/drive/" + fileId}
                  </a>
                </p>
              );
              setLink("");
            } else {
              if (addfile.data === "OK") {
                setMessage(
                  <p>
                    Successfully generated!
                    <br /> <b>Link:</b>
                    <a
                      target="_blank"
                      href={window.location.origin + "/drive/" + fileId}
                    >
                      {window.location.origin + "/drive/" + fileId}
                    </a>
                  </p>
                );
                setLink("");
              } else {
                setMessage("Error Generating Link, please try again later.");
              }
            }
          })
          .catch((error) => {
            setMessage("The file link in not working");
          });
      }
      setLoading(false);
    }

    function generateBulk() {
      bulkLinks.split("\n").forEach(async (line, i) => {
        const linkRegExp = new RegExp("^https://drive.google.com/file/d/", "i");
        if (!line) {
          console.log("Enter a drive file link to generate");
        } else if (!byID && !line.match(linkRegExp)) {
          console.log("'" + line + "' is not a valid drive file link!");
        } else {
          let fileId = line.trim();
          if (!byID) {
            let part1 = line.replace(linkRegExp, "");
            fileId = part1.substring(0, part1.indexOf("/"));
          }
          window.gapi.client.drive.files
            .get({ fileId, fields: "id, name" })
            .then(async (getfile) => {
              setMessage("Generating File Link");
              let addfile = await axios.post(
                API_URL + "/links/add/drive",
                {
                  ...getfile.result,
                },
                { headers: { authorization: ADMIN_TOKEN } }
              );
              if (addfile.data.message) {
                setMessage(
                  <p>
                    {addfile.data.message} <br /> <b>Link:</b>
                    <a
                      target="_blank"
                      href={window.location.origin + "/drive/" + fileId}
                    >
                      {window.location.origin + "/drive/" + fileId}
                    </a>
                  </p>
                );
                setLink("");
              } else {
                if (addfile.data === "OK") {
                  setMessage(
                    <p>
                      Successfully generated!
                      <br /> <b>Link:</b>
                      <a
                        target="_blank"
                        href={window.location.origin + "/drive/" + fileId}
                      >
                        {window.location.origin + "/drive/" + fileId}
                      </a>
                    </p>
                  );
                  setLink("");
                } else {
                  setMessage("Error Generating Link, please try again later.");
                }
              }
            })
            .catch((error) => {
              setMessage("The file link in not working");
            });
        }
      });
    }

    function reset() {
      setMessage("");
      setLoading(false);
      setBulkLoading(false);
    }

    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col">
            <div className="col-12 m-3">
              <img
                src={require("../../../assets/Google_Drive_logo.png")}
                width="40"
                alt="drive-logo"
              />
              <h4
                style={{ position: "absolute", bottom: 0 }}
                className="text-success font-weight-normal d-inline ml-3"
              >
                Add Google Drive Links
              </h4>
              <label className="float-right d-flex align-content-center mr-3">
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
              <label className="float-right d-flex align-content-center mr-5">
                <span className="mr-2">
                  <b
                    className={
                      byID
                        ? "text-secondary font-weight-normal"
                        : "text-success"
                    }
                  >
                    By Link
                  </b>{" "}
                </span>
                <Toggle
                  icons={false}
                  checked={byID}
                  onChange={(e) => {
                    setByID(Boolean(e.target.checked));
                  }}
                />
                <span className="ml-2">
                  <b
                    className={
                      byID
                        ? "text-success"
                        : "text-secondary font-weight-normal"
                    }
                  >
                    By ID
                  </b>{" "}
                </span>
              </label>
            </div>
            {inBulk ? (
              <div className="mb-4">
                <p className="text-center text-secondary font-italic">
                  1 link /ID per line.
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
              </div>
            ) : (
              <div className="form-group my-4">
                <form onSubmit={generateOne}>
                  <div className="row ml-3">
                    <div className="col-9">
                      <input
                        placeholder="Paste Drive Link or ID"
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

  function YandexDisk() {
    const [link, setLink] = useState("");

    const [bulking, setBulking] = useState();

    const [validation, setValidation] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);

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
                "File available at: " +
                <a
                  href={window.location.origin + "/y/" + result.data.slug}
                  target="_blank"
                >
                  {window.location.origin + "/y/" + result.data.slug}
                </a>
              </p>
            );
          } else {
            setMessage(result.data.message);
          }
        })
        .catch((err) => {
          setMessage("Error occured");
          console.log(err);
        });
    }

    function generateBulk() {
      setMessage("Please Wait.. ( check console xD )");
      bulkLinks.split("\n").forEach((link) => {
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
                "File available at: " +
                  window.location.origin +
                  "/y/" +
                  result.data.slug
              );
            } else {
              setMessage(result.data.message);
            }
          })
          .catch((err) => {
            setMessage("Error occured");
            console.log(err);
          });
      });
    }

    function reset() {
      setMessage("");
      setLoading(false);
      setBulkLoading(false);
    }

    return (
      <div className="container">
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
          <div className="card col h-50">
            <GoogleDrive />
          </div>
          <br />
          <br />
          <div className="card col">
            <YandexDisk />
          </div>
        </div>
      </div>
    </div>
  );
}
