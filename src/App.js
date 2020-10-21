import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FileDownload from "./pages/Main/FileDownload";
import Home from "./pages/Main/Home";
import Account from "./pages/Main/Account";
import Contact from "./pages/Main/Contact";
import DMCA from "./pages/Main/DMCA";
import Terms from "./pages/Main/Terms";
import PrivacyPolicy from "./pages/Main/PrivacyPolicy";
import NotFound from "./pages/NotFound/NotFound";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import DashboardUsers from "./pages/Admin/Dashboard/Users";
import DashboardLinks from "./pages/Admin/Dashboard/Links";
import AdminLogin from "./pages/Admin/Login/Login";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import { API_URL } from "./config";
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from "./store/consts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState(null);

  function gapiInit() {
    try {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: DISCOVERY_DOCS,
        })
        .then(() => {
          let Oauth = window.gapi.auth2.getAuthInstance();
          Oauth.isSignedIn.listen(setUser(Oauth.currentUser.get()));
          setUser(Oauth.currentUser.get());
        });
    } catch (e) {}
  }

  function handleAuthClick() {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(async (user) => {
        let userdata = {
          uid: user.getBasicProfile().getId(),
          username: user.getBasicProfile().getName(),
          email: user.getBasicProfile().getEmail(),
          picture: user.getBasicProfile().getImageUrl(),
        };
        await axios.post(API_URL + "/users/addOne", userdata);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClientLoad() {
    window.gapi.load("client:auth2", gapiInit);
  }

  useEffect(() => {
    var script = document.createElement("script");
    script.onload = handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  });

  return (
    <Router>
      <ToastContainer />
      {!(window.gapi && user) ? (
        <div className="col d-flex justify-content-center">
          <Loader color="warning" />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: 'url("./assets/1526027.jpg")',
          }}>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/admin/login">
              <AdminNavBar />
              <AdminLogin />
            </Route>
            <Route exact path="/admin/dashboard">
              <AdminNavBar />
              <AdminDashboard />
            </Route>
            <Route exact path="/admin/dashboard/users">
              <AdminNavBar />
              <DashboardUsers />
            </Route>
            <Route exact path="/admin/dashboard/links">
              <AdminNavBar />
              <DashboardLinks />
            </Route>
            <Route path="/admin/">
              <Redirect to={{ pathname: "/admin/login" }} />
            </Route>
            <Route exact path="/drive/:fileId">
              <NavBar currentUser={user} />
              <FileDownload user={user} handleAuthClick={handleAuthClick} />
            </Route>
            <Route exact path="/privacy-policy">
              <NavBar currentUser={user} />
              <PrivacyPolicy />
            </Route>
            <Route exact path="/DMCA">
              <NavBar currentUser={user} />
              <DMCA />
            </Route>
            <Route exact path="/terms">
              <NavBar currentUser={user} />
              <Terms />
            </Route>
            <Route exact path="/contact">
              <NavBar currentUser={user} />
              <Contact />
            </Route>
            <Route exact path="/account">
              <NavBar currentUser={user} />
              {user && user.Ca ? (
                <Account user={user} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              )}
            </Route>
            <Route exact path="/">
              <NavBar currentUser={user} />
              {user && user.Ca ? (
                <Redirect to={{ pathname: "/account" }} />
              ) : (
                <Home handleAuthClick={handleAuthClick} />
              )}
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      )}
    </Router>
  );
}
