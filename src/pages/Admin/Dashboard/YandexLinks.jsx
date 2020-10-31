import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL, ADMIN_TOKEN } from "../../../store/consts.js";
import Loader from "../../../components/Loader";
import { toastError, toastSuccess } from "../../../Helpers/toasts";
import _debounce from "lodash/debounce";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import { CopyToClipboard } from "react-copy-to-clipboard";

//material table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";

export default function YandexLinks() {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    fetchAllLinks();
  }, []);

  function fetchAllLinks() {
    axios
      .post(
        API_URL + "/links/search",
        { type: "yandex", q: "" },
        {
          headers: { authorization: ADMIN_TOKEN },
        }
      )
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        setLinks(false);
      });
  }

  const UsersTable = () => {
    const [overlay, setOverlay] = useState(false);
    const [activeAction, setActiveAction] = useState("");

    const ActionDropdown = ({ link }) => {
      const [show, setShow] = useState(false);
      const [deleting, setDeleting] = useState(false);

      function removeLink() {
        setDeleting(true);
        axios
          .delete(API_URL + "/links/" + link._id, {
            headers: { authorization: ADMIN_TOKEN },
          })
          .then((result) => {
            toastSuccess("Link was successfully removed");
            setDeleting(false);
            setLinks(links.filter((L) => L._id !== link._id));
          })
          .catch((err) => {
            toastError("Link could not be removed");
            setDeleting(false);
          });
      }

      useEffect(() => {
        if (overlay && activeAction === link._id) {
          setShow(true);
        }
      }, [overlay]);

      return (
        <div>
          {show ? (
            <div
              style={{
                padding: "5px",
                position: "absolute",
                right: "6.5%",
                zIndex: "1001",
              }}
              className="bg-light p-3 border border-secondary rounded"
            >
              <p className="btn p-0 m-0">
                <a
                  className="text-black d-flex align-content-center"
                  href={window.location.origin + "/d/" + link.slug}
                  target="_blank"
                >
                  <Icon className="mr-2">launch</Icon>
                  Open Link
                </a>
              </p>

              <br />
              <CopyToClipboard
                className="btn p-0 m-0 mt-2"
                text={window.location.origin + "/d/" + link.slug}
              >
                <p className="btn p-0 m-0">
                  <Icon className="mr-2 mt-2">content_copy</Icon>
                  Copy Link
                </p>
              </CopyToClipboard>

              <hr className="p-0" />
              <button className="btn p-0 m-0">
                <p
                  className="text-danger d-flex align-content-center p-0 m-0"
                  onClick={() => {
                    removeLink(link._id);
                  }}
                >
                  <Icon className="mr-2">delete</Icon>
                  Delete
                </p>
              </button>
            </div>
          ) : null}
          <div
            className="btn btn-lg"
            style={{ position: "relative", zIndex: "1000" }}
            onClick={() => {
              setOverlay(true);
              setActiveAction(link._id);
              setShow(!show);
            }}
          >
            <Icon>keyboard_arrow_down</Icon>
          </div>
        </div>
      );
    };

    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">File Name</TableCell>
                <TableCell align="left">Yandex Link</TableCell>
                <TableCell align="left">Size</TableCell>
                <TableCell align="left">Quality</TableCell>
                <TableCell align="left">Downloads</TableCell>
                <TableCell align="left">Added On</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((row, i) => (
                <TableRow key={"row" + i}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{row.fileName}</TableCell>
                  <TableCell align="left">
                    <a
                      href={row.public_key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.public_key}
                    </a>
                  </TableCell>
                  <TableCell align="left">
                    {prettyBytes(Number(row.size) || 0)}
                  </TableCell>
                  <TableCell align="left">-</TableCell>
                  <TableCell align="left">{row.downloads}</TableCell>
                  <TableCell align="center">
                    <pre>
                      {moment(row.createdOn)
                        .format("MMMM Do YYYY, h:mm:ss a")
                        .split(",")[0] +
                        "\n" +
                        moment(row.createdOn)
                          .format("MMMM Do YYYY, h:mm:ss a")
                          .split(", ")[1]}
                    </pre>
                  </TableCell>
                  <TableCell>
                    <ActionDropdown link={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {overlay ? (
          <div
            onClick={() => {
              setOverlay(false);
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "rgba(31,51,20,0)",
              width: "100vw",
              height: "100vh",
              margin: 0,
            }}
          ></div>
        ) : null}
      </div>
    );
  };

  const SearchBar = () => {
    const [searchQuery, setUserQuery] = useState("");
    const sendQuery = (query) => {
      axios
        .post(
          API_URL + "/links/search",
          { type: "yandex", q: query },
          {
            headers: { authorization: ADMIN_TOKEN },
          }
        )
        .then((result) => {
          setLinks(result.data);
        })
        .catch((err) => {});
    };
    const delayedQuery = useCallback(
      _debounce((q) => sendQuery(q), 10),
      []
    );
    const search = () => {
      if (searchQuery) {
        delayedQuery(searchQuery);
      } else {
        fetchAllLinks();
      }
    };
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col-3 mx-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search for links by name"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {
                setUserQuery(e.target.value);
                //search();
              }}
            />
          </div>
          <div className="align-self-center">
            {" "}
            <button type="submit" className="btn btn-sm btn-warning">
              Search
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      <br />
      <br />
      <SearchBar />
      <br />
      {links && links.length ? (
        <div className="mx-2">
          <UsersTable />
        </div>
      ) : links === null ? (
        <div className="col d-flex justify-content-center">
          <Loader color="warning" />
        </div>
      ) : (
        <div className="row mt-5">
          <h1 className="text-center mx-auto text-danger">No Links found.</h1>
        </div>
      )}
    </div>
  );
}
