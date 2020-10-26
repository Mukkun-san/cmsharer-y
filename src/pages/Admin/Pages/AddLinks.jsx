import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../store/consts";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function AddLinks() {
  function GoogleDrive() {
    const [link, setLink] = useState("");
    const [links, setLinks] = useState([]);
    const [fileIds, setFileIds] = useState([]);
    const [validation, setValidation] = useState({});
    const [loading, setLoading] = useState(false);

    const [inBulk, setInBulk] = useState(true);
    const [bulkLinks, setBulkLinks] = useState("");

    function generate() {
      setLoading(true);
    }

    function generateBulk() {
      bulkLinks.split("\n").forEach(async (link) => {
        const linkRegExp = new RegExp("^https://drive.google.com/file/d/", "i");
        if (!link) {
          console.log("Enter a drive file link to generate");
        } else if (!link.match(linkRegExp)) {
          console.log("'" + link + "' is not a valid drive file link!");
        } else {
          let part1 = link.replace(linkRegExp, "");
          const fileId = part1.substring(0, part1.indexOf("/"));
          console.log("Checking Drive File Link...");
          try {
            let getfile = await axios.post(API_URL + "/drive/verifFile", {
              fileId,
            });
            if (getfile.data.fileExists) {
              console.log("Generating File Link");
              let addfile = await axios.post(API_URL + "/drive/addFile", {
                ...getfile.data,
              });
              if (addfile.data.message) {
                setTimeout(() => {
                  console.log(addfile.data.message);
                  console.log(window.location.origin + "/drive/" + fileId);
                }, 250);
              } else {
                addfile.data === "OK"
                  ? setTimeout(() => {
                      console.log("Link Successfully Generated.");
                      console.log(window.location.origin + "/drive/" + fileId);
                    }, 250)
                  : setTimeout(() => {
                      alert("Error Generating Link, please try again later.");
                    }, 250);
              }
            } else {
              console.log("The file link in not working");
            }
          } catch (error) {
            console.log("The file link in not working");
          }
        }
      });
    }

    async function addLink() {
      setValidation({});
      const linkRegExp = new RegExp("^https://drive.google.com/file/d/", "i");
      if (!link) {
        setValidation({
          text: "Field is empty!",
          class: "text-danger",
          state: "is-invalid",
        });
      } else if (!link.match(linkRegExp)) {
        setValidation({
          text: "Not a valid Google Drive link!",
          class: "text-danger",
          state: "is-invalid",
        });
      } else {
        let part1 = link.replace(linkRegExp, "");
        const fileId = part1.substring(0, part1.indexOf("/"));
        if (fileIds.includes(fileId.toLowerCase())) {
          setValidation({
            text: "Link Already Added!",
            class: "text-danger",
            state: "is-invalid",
          });
        } else {
          setLinks([...links, link]);
          setFileIds([...fileIds, fileId.toLowerCase()]);
        }
      }
      setTimeout(() => {
        setValidation({});
      }, 2000);
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
                className="text-success font-weight-normal d-inline ml-3">
                Add Google Drive Links
              </h4>
              <label className="float-right d-flex align-content-center mr-3">
                <Toggle
                  icons={false}
                  checked={inBulk}
                  onChange={(e) => {
                    setInBulk(Boolean(e.target.checked));
                  }}
                />
                <span className="ml-2">
                  {" "}
                  <b>Bulk</b>{" "}
                </span>
              </label>
            </div>
            {inBulk ? (
              <div className="mb-4">
                <p className="text-center text-secondary font-italic">
                  Add links each one in a separate line.
                </p>
                <div className="form-group d-flex justify-content-center">
                  <textarea
                    value={bulkLinks}
                    onChange={(e) => {
                      setBulkLinks(e.target.value);
                    }}
                    className="form-control w-75"
                    id="exampleFormControlTextarea1"
                    rows="3"></textarea>
                </div>
                <div className="row">
                  <button
                    disabled={bulkLinks ? false : true}
                    className="btn btn-success mx-auto"
                    onClick={generateBulk}>
                    Generate All
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-group my-4">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row ml-3">
                    <div className="col-9">
                      <input
                        placeholder="Paste a link here then click ADD"
                        type="text"
                        className={`form-control ${validation.state}`}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <div className="col-3">
                      {loading}
                      <button
                        type="submit"
                        className={
                          loading ? "btn btn-light" : "btn btn-warning"
                        }
                        onClick={addLink}
                        disabled={loading || !link ? true : false}>
                        {!loading ? (
                          "Add"
                        ) : (
                          <div
                            className="spinner-border text-warning"
                            role="status">
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
                <div className="m-3 bg-light border-3 border-primary font-smaller">
                  {links && links.length ? (
                    <div>
                      {" "}
                      {links.map((link, i) => {
                        return (
                          <ul key={"dlink-" + i}>
                            <li>{link}</li>
                          </ul>
                        );
                      })}
                      <hr />
                      <button type="button" className="btn btn-success">
                        Generate All
                      </button>
                    </div>
                  ) : null}
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
    const [links, setLinks] = useState([]);

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
                className="text-primary font-weight-normal d-inline ml-3">
                Add Yandex.Disk Links
              </h4>
            </div>

            <div className="form-group">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row ml-3">
                  <div className="col-9">
                    <input
                      placeholder="Paste a link here then click ADD"
                      type="text"
                      className="form-control"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                  <div className="col-3">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={() => setLinks([...links, link])}>
                      Add
                    </button>
                  </div>
                </div>
              </form>
              {/* <div className="m-3 bg-light border-3 border-primary">
                {links.map((link, i) => {
                  return (
                    <p key={"dlink-" + i}>
                      {link} <br />
                    </p>
                  );
                })}
              </div> */}
            </div>
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
          <div className="card col">
            <GoogleDrive />
          </div>
          <div className="card col">
            <YandexDisk />
          </div>
        </div>
      </div>
    </div>
  );
}
