import React, { useState, useEffect } from "react";
import authenticate from "../Helpers/authenticate";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import Loader from "../../../components/Loader";

export default function Links() {
  const history = useHistory();
  const [links, setLinks] = useState("");

  useEffect(() => {
    authenticate(history);
    axios
      .get(API_URL + "/links/getAll")
      .then((res) => {
        setTimeout(() => {
          setLinks(res.data);
        }, 750);
      })
      .catch((err) => {});
  }, []);

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
                    <tr>
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
                          type="reset"
                          className="btn btn-sm ml-2 btn-danger">
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
      ) : (
        <div className="col d-flex justify-content-center">
          <Loader color="warning" />
        </div>
      )}
    </div>
  );
}
