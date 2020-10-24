import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../store/consts.js";
import Loader from "../../../components/Loader";
import { toastError, toastSuccess } from "../../../Helpers/toasts";

export default function Links() {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "/links/getAll")
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        setLinks(false);
      });
  }, []);

  function removeLink(linkId) {
    axios
      .delete(API_URL + "/links/" + linkId)
      .then((result) => {
        console.log(result);
        setLinks(links.filter((link) => link._id !== linkId));
        toastSuccess("Link was successfully removed");
      })
      .catch((err) => {
        toastError("Link could not be removed");
      });
  }

  return (
    <div>
      <br />
      <br />
      {links ? (
        <div className="row mx-5">
          <div className="col">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th className="text-center border border-light m-2">#</th>
                  <th className="text-center border border-light m-2">
                    File Name
                  </th>
                  <th className="text-center border border-light m-2">Link</th>
                  <th className="text-center border border-light m-2">
                    Number of Downloads
                  </th>
                  <th className="text-center border border-light m-2">
                    Added on Date
                  </th>
                  <th className="text-center border border-light m-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, i) => {
                  return (
                    <tr key={"link" + i}>
                      <td className="bg-light">{i + 1}</td>
                      <td className="bg-light">{link.fileName}</td>
                      <td className="bg-light">
                        <a
                          href={
                            window.location.origin + "/drive/" + link.fileId
                          }>
                          {window.location.origin + "/drive/" + link.fileId}
                        </a>
                      </td>
                      <td className="bg-light">{link.downloads}</td>
                      <td className="bg-light">
                        {link.createdOn.toString().substring(0, 10)} at{" "}
                        {link.createdOn.toString().substring(11, 19)}
                      </td>
                      <td className="bg-light">
                        <button
                          value={link._id}
                          type="reset"
                          className="btn btn-sm ml-2 btn-danger"
                          onClick={(e) => removeLink(e.target.value)}>
                          Remove Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : links === null ? (
        <div className="col d-flex justify-content-center">
          <Loader color="warning" />
        </div>
      ) : (
        <h1>Internal Server Error</h1>
      )}
    </div>
  );
}
