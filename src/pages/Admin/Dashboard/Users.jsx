import React, { useState, useEffect } from "react";
import authenticate from "../Helpers/authenticate";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

export default function Users() {
  const history = useHistory();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    authenticate(history);
    axios
      .get(API_URL + "/users/getAll")
      .then((res) => {
        console.log(res);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-5">
      <br />
      <br />
      {users ? (
        <table classNameName="table table-hover ml-5">
          <thead classNameName="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Joined on Date</th>
              <th scope="col">Picture</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.joinedOn.toString().substring(0, 10)} at{" "}
                    {user.joinedOn.toString().substring(11, 19)}
                  </td>
                  <td>{}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>LOADING</p>
      )}
    </div>
  );
}
