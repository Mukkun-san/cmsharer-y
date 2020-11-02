import React from "react";
import { Helmet } from "react-helmet";

export default function Account({ user }) {
  return (
    <div>
      <Helmet>
        <title>CM Sharer - Account</title>
      </Helmet>
      <div className="card text-center w-75 bg-light mx-auto mt-5 pt-5">
        <div className="card-header">
          <h1>Account Details</h1>
        </div>
        <div className="card-body d-flex justify-content-center">
          <h5 className="card-title"> </h5>
          <p className="card-text"></p>
          <div className="card" style={{ width: "18rem" }}>
            <div className="mt-5 d-flex justify-content-center">
              <img
                className="card-img-top w-25 "
                style={{ width: "18rem" }}
                src={user.getBasicProfile().getImageUrl()}
                alt=""
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">{user.getBasicProfile().getName()}</h5>
              <p className="card-text">{user.getBasicProfile().getEmail()}</p>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </div>
  );
}
