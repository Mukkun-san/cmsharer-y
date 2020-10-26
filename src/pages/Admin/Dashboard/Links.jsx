import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../../../store/consts.js";
import Loader from "../../../components/Loader";
import { toastError, toastSuccess } from "../../../Helpers/toasts";
import _debounce from "lodash/debounce";

export default function Links() {
  const [links, setLinks] = useState(null);
  const [searchQuery, setUserQuery] = useState("");

  useEffect(() => {
    fetchAllLinks();
  }, []);

  function fetchAllLinks() {
    axios
      .post(API_URL + "/links/getAll", {
        accessToken: window.localStorage.getItem("adminToken"),
      })
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        setLinks(false);
      });
  }

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

  const sendQuery = (query) => {
    axios
      .post(API_URL + "/links/search/" + query, {
        accessToken: window.localStorage.getItem("adminToken"),
      })
      .then((result) => {
        setLinks(result.data);
      })
      .catch((err) => {});
  };
  const delayedQuery = useCallback(
    _debounce((q) => sendQuery(q), 500),
    []
  );
  const search = (e) => {
    setUserQuery(e.target.value);
    if (e.target.value) {
      delayedQuery(e.target.value);
    } else {
      fetchAllLinks();
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="row">
        <input
          className="form-control w-50 mx-auto"
          type="search"
          placeholder="Search for links by name"
          aria-label="Search"
          value={searchQuery}
          onChange={search}
        />
      </div>
      {links && links.length ? (
        <div className="row mx-5">
          <div className="col">
            <br />
            <br />
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
        <div className="row mt-5">
          <h1 className="text-center mx-auto text-danger">No result found.</h1>
        </div>
      )}
    </div>
  );
}
