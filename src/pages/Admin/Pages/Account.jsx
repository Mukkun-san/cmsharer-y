import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../store/consts";
import Loader from "../../../components/Loader";
import {
  toastError,
  toastWarning,
  toastSuccess,
} from "../../../Helpers/toasts";

export default function Account() {
  const [admin, setAdmin] = useState({
    email: window.localStorage.getItem("admin"),
  });

  const emptyInfo = {
    username: "",
    oldPassw: "",
    newPassw: "",
    newPassw2: "",
  };
  const [updateInfo, setUpdateInfo] = useState(emptyInfo);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("adminToken");
    axios
      .post(API_URL + "/admin/getProfile", { accessToken, email: admin.email })
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {});
  }, []);

  async function updateUsername() {
    let res = await axios.post(API_URL + "/admin/update/username", {
      accessToken: window.localStorage.getItem("adminToken"),
      email: admin.email,
      username: updateInfo.username,
    });
    console.log(res);
    if (res.data === "OK") {
      setAdmin({ ...admin, username: updateInfo.username });
      toastSuccess("Username updated to '" + updateInfo.username + "'");
    } else {
      toastWarning(
        <p className="mx-auto" style={{ color: "black" }}>
          {res.data.error}
        </p>,
        "bottom-right"
      );
    }
    setUpdateInfo({ ...updateInfo, username: "" });
  }
  async function updatePassword() {
    if (validForm()) {
      await axios
        .post(API_URL + "/admin/update/password", {
          accessToken: window.localStorage.getItem("adminToken"),
          email: admin.email,
          oldPassw: updateInfo.oldPassw,
          newPassw: updateInfo.newPassw,
        })
        .then((res) => {
          if (res.data.error) {
            toastError(res.data.error);
          } else if (res.data === "OK") {
            toastSuccess("Password Was Updated", "bottom-right");
            setUpdateInfo(emptyInfo);
          } else {
            toastError("Internal Server Error", "bottom-right");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function validForm() {
      if (!updateInfo.oldPassw) {
        toastWarning(
          <p className="mx-auto" style={{ color: "black" }}>
            Enter your current password.
          </p>,
          "bottom-right"
        );
        return false;
      } else if (!updateInfo.newPassw) {
        toastWarning(
          <p className="mx-auto" style={{ color: "black" }}>
            Enter your New Password.
          </p>,
          "bottom-right"
        );
        return false;
      } else if (updateInfo.newPassw.length < 5) {
        toastWarning(
          <p className="mx-auto" style={{ color: "black" }}>
            Password must have at least 5 chars.
          </p>,
          "bottom-right"
        );
        return false;
      } else if (!updateInfo.newPassw2) {
        toastWarning(
          <p className="mx-auto" style={{ color: "black" }}>
            Confirm New Password
          </p>,
          "bottom-right"
        );
        return false;
      } else if (updateInfo.newPassw !== updateInfo.newPassw2) {
        toastWarning(
          <p className="mx-auto" style={{ color: "black" }}>
            Passwords Don't match.
          </p>,
          "bottom-right"
        );
        return false;
      }
      return true;
    }
  }
  return (
    <div>
      {admin && admin._id ? (
        <div className="card w-75 bg-light mx-auto my-4">
          <div className="card-header">
            <h1 className="text-center">Account Details</h1>
          </div>
          <div className="card-body d-flex justify-content-center">
            <div className="card" style={{ width: "70%" }}>
              <hr />
              <div className="card-body">
                <h4 className="font-weight-normal">
                  Email: <small>{admin.email}</small>
                </h4>
                {admin.username ? (
                  <h4 className="font-weight-normal">
                    Username: <small>{admin.username}</small>
                  </h4>
                ) : null}
                <br />
                <br />
                <h3>Update Information</h3>
                <br />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUsername();
                  }}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateInfo.username}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setUpdateInfo({
                          ...updateInfo,
                          username: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning d-flex mx-auto px-5">
                    Update Username
                  </button>
                </form>
                <hr
                  style={{
                    height: "1px",
                    width: "75%",
                    borderWidth: 0,
                    color: "gray",
                    backgroundColor: "gray",
                  }}
                  className="my-5"
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updatePassword();
                  }}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={updateInfo.oldPassw}
                      onChange={(e) =>
                        setUpdateInfo({
                          ...updateInfo,
                          oldPassw: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={updateInfo.newPassw}
                      onChange={(e) =>
                        setUpdateInfo({
                          ...updateInfo,
                          newPassw: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={updateInfo.newPassw2}
                      onChange={(e) =>
                        setUpdateInfo({
                          ...updateInfo,
                          newPassw2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning d-flex mx-auto px-5">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center card-footer text-muted">
            {admin && admin.addedOn ? (
              <p className="card-text">
                Joined on: {admin.addedOn.toString().substring(0, 10)} at{" "}
                {admin.addedOn.toString().substring(11, 19)}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <Loader color="warning" />
      )}
    </div>
  );
}
