import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../store/consts.js";
import NotFound from "../NotFound/NotFound";
import Loader from "../../components/Loader";
import prettyBytes from "pretty-bytes";
import { Helmet } from "react-helmet";

export default function YandexFileDownload() {
  let { slug } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  let [ddlWait, setDdlWait] = useState(5);

  useEffect(() => {
    axios
      .get(API_URL + "/links/yandex/" + slug)
      .then((result) => {
        if (result.data.linkExists) {
          axios
            .get(
              "https://cloud-api.yandex.net/v1/disk/public/resources?public_key=" +
                result.data.public_key
            )
            .then(async (result) => {
              let res = await axios.get(
                "https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=" +
                  result.data.public_url
              );
              return { ...result.data, ...res.data };
            })
            .then((file) => {
              console.log(file);
              setFile(file);
              setLoading(false);
              setDdlWait(ddlWait--);
              const timer = setInterval(() => {
                if (ddlWait < 0) {
                  clearInterval(timer);
                } else {
                  setDdlWait(ddlWait--);
                }
              }, 1000);
            })
            .catch((err) => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setFile(false);
      });
  }, [slug]);
  return (
    <div>
      <div className="container bg-light w-100 h-100">
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                {loading ? (
                  <div className="col d-flex justify-content-center">
                    <Loader color="warning" />
                  </div>
                ) : file ? (
                  <div className="text-center">
                    <Helmet>
                      <title>CM Sharer - {file.name}</title>
                    </Helmet>
                    <h3>{file.name}</h3>
                    <span className="badge badge-danger mx-2">
                      SIZE: {prettyBytes(Number(file.size) || 0)}
                    </span>
                    <span className="badge badge-warning mx-2">
                      TYPE: {file.media_type}
                    </span>
                    <br />
                    <img
                      src={
                        file.preview
                          ? file.preview.replace("size=S", "size=L")
                          : ""
                      }
                      alt="preview_image"
                      className="my-2 w-75 mx-auto"
                    />
                    <br />
                    <hr />
                    <a href={file.public_url} target="_self">
                      <button
                        className="btn btn-lg btn-warning my-0"
                        disabled={ddlWait > 0 ? true : false}
                        onClick={() => {}}
                      >
                        {ddlWait > 0
                          ? `Please wait ${ddlWait} secs...`
                          : "Download"}
                      </button>
                    </a>
                  </div>
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
