import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../store/consts";

export default function AddLinks() {
  function GoogleDrive() {
    const [link, setLink] = useState("");
    const [links, setLinks] = useState([]);
    const [fileIds, setFileIds] = useState([]);
    const [validation, setValidation] = useState({});
    const [loading, setLoading] = useState(false);

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
        setLinks([...links, link]);
        return true;
        setLoading(true);
        try {
          let getfile = await axios.post(API_URL + "/drive/verifFile", {
            fileId,
          });
          if (getfile.data.fileExists) {
            setFileIds([...fileIds, fileId]);
            setLinks([...links, link]);
          } else {
            setValidation({
              text: "File is unreachable or link might be broken!",
              class: "text-danger",
              state: "is-invalid",
            });
          }
        } catch (error) {
          setValidation({
            text: JSON.stringify(error),
            class: "text-danger",
            state: "is-invalid",
          });
        }
        setLoading(false);
      }
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
            </div>

            <div className="form-group">
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
                      className={loading ? "btn btn-light" : "btn btn-warning"}
                      onClick={addLink}
                      disabled={loading ? true : false}>
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
              <div className="m-3 bg-light border-3 border-primary">
                {links.map((link, i) => {
                  return (
                    <p key={"dlink-" + i}>
                      {link} <br />
                    </p>
                  );
                })}
              </div>
            </div>
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
        <div className="card-body d-flex justify-content-center">
          <div className="card" style={{ width: "70%" }}>
            <GoogleDrive />
          </div>
          <hr />
          <div className="card" style={{ width: "70%" }}>
            <YandexDisk />
          </div>
        </div>
      </div>
    </div>
  );
}
