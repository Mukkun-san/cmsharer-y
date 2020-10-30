import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL, DRIVE_FOLDER_NAME, ADMIN_TOKEN } from "../../store/consts.js";
import NotFound from "../NotFound/NotFound";
import Loader from "../../components/Loader";
import prettyBytes from "pretty-bytes";

export default function GDriveFileDownload({ user, handleAuthClick }) {
  let { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (fileId) {
      getFile();
    }
    async function getFile() {
      axios
        .get(API_URL + "/links/drive/" + fileId, {
          headers: { authorization: ADMIN_TOKEN },
        })
        .then((res) => {
          window.gapi.client.drive.files
            .get({
              fileId,
              fields: "id, name, size, mimeType, hasThumbnail,thumbnailLink",
            })
            .then((drive) => {
              if (res.data.fileExists) {
                setFile(drive.result);
                setLoading(false);
              } else {
                setFile(false);
                setLoading(false);
              }
            })
            .catch((error) => {
              setFile(false);
              setLoading(false);
            });
        })
        .catch((err) => {
          setFile(false);
          setLoading(false);
        });
    }
  }, [fileId]);

  function DownloadFile() {
    function DownloadBtnIcon({ downloading }) {
      if (downloading) {
        return (
          <button
            disabled
            className="btn btn-info d-flex"
            onClick={() => download()}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="d-inline ml-3">Downloading...</div>
          </button>
        );
      }
      return (
        <button className="btn btn-info" onClick={() => download()}>
          <i className="fa fa-download mr-3"></i>
          Download Now
        </button>
      );
    }

    function download() {
      async function ddl(folderId) {
        try {
          let response = await window.gapi.client.drive.files.copy({
            fileId,
            fields: "parents, id",
          });
          const previousParents = response.result.parents.join(",");
          response = await window.gapi.client.drive.files.update({
            fileId: response.result.id,
            addParents: folderId,
            removeParents: previousParents,
            fields: "id, parents",
          });
          await window.gapi.client.drive.permissions.create({
            resource: { role: "reader", type: "anyone" },
            fileId: response.result.id,
          });
          await axios.post(API_URL + "/links/downloadOne", {
            fileId,
            userId: window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getBasicProfile()
              .getId(),
          });
          document.getElementById("DDL").href =
            "https://drive.google.com/uc?export=download&id=" +
            response.result.id;
          document.getElementById("DDL").click();
          setDownloading(false);
        } catch (error) {
          setDownloading(false);
        }
      }
      setDownloading(true);
      window.gapi.client.drive.files
        .list({
          q: `mimeType='application/vnd.google-apps.folder' and name='${DRIVE_FOLDER_NAME}'`,
          fields: "nextPageToken, files(id, name, trashed)",
        })
        .then((resp) => {
          if (resp.result.files.length && !resp.result.files[0].trashed) {
            const folderId = resp.result.files[0].id;
            ddl(folderId);
          } else {
            const folderMetadata = {
              name: DRIVE_FOLDER_NAME,
              mimeType: "application/vnd.google-apps.folder",
              folderColorRgb: "#ff7537",
            };
            window.gapi.client.drive.files
              .create({
                resource: folderMetadata,
                fields: "id",
              })
              .then((resp) => {
                const folderId = resp.result.id;
                ddl(folderId);
              })
              .catch((err) => {
                setDownloading(false);
              });
          }
        })
        .catch((err) => {
          setDownloading(false);
        });
    }
    return (
      <div className="row">
        <div className="col text-center">
          <div className="d-flex justify-content-center">
            <DownloadBtnIcon downloading={downloading} />
          </div>
        </div>
      </div>
    );
  }

  function LoginToDownload() {
    return (
      <div className="row">
        <div className="col text-center">
          <h5 className="text-info font-weight-light">
            Just Login to your Google Drive to download this file.
          </h5>
          <div
            className="d-flex justify-content-center d-inline"
            onClick={() => {
              handleAuthClick();
            }}
          >
            <div className="w-auto pr-5 pl-5 d-flex btn btn-light">
              <img
                style={{ height: "2.5rem" }}
                alt=""
                src="https://img.icons8.com/plasticine/100/000000/google-logo.png"
              />
              <p className="ml-4 mt-2">Login With Google</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container bg-light w-100 h-100">
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                {loading || file === null || !user ? (
                  <div className="col d-flex justify-content-center">
                    <Loader color="warning" />
                  </div>
                ) : file ? (
                  <div className="text-center">
                    <h3 className="card-title font-weight-regular">
                      {file.name}
                    </h3>
                    <span className="badge badge-danger mx-2">
                      Size: {prettyBytes(Number(file.size) || 0)}
                    </span>
                    <span className="badge badge-warning">
                      Type: {file.mimeType}
                    </span>
                    <br /> <br />
                    {!(user && user.wc) ? (
                      <LoginToDownload />
                    ) : (
                      <DownloadFile />
                    )}
                    <div className="col mt-5 d-flex justify-content-center">
                      <img
                        style={{ width: file.hasThumbnail ? "50%" : "15%" }}
                        src={
                          file.hasThumbnail
                            ? file.thumbnailLink
                            : "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
                        }
                        alt="Google_Drive_logo"
                      />
                    </div>
                  </div>
                ) : (
                  <NotFound />
                )}
                <a
                  target="_blank"
                  href=""
                  id="DDL"
                  style={{ visibility: "hidden", height: 0 }}
                >
                  download link placeholder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
