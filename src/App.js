import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import Account from "./pages/Home/Account";
import Contact from "./pages/Home/Contact";
import DMCA from "./pages/Home/DMCA";
import Terms from "./pages/Home/Terms";
import PrivacyPolicy from "./pages/Home/PrivacyPolicy";
import NotFound from "./pages/NotFound/NotFound";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import DashboardUsers from "./pages/Admin/Dashboard/Users";
import AdminLogin from "./pages/Admin/Login/Login";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import { API_URL } from "./config";
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from "./store/consts";
import { updateSigninStatus } from "./store/reducers/user";

export default function App() {
  const currentUser = useSelector((state) => state.user.details);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, [user]);
  console.log(user);

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
          function listener() {
            setUser(window.gapi.auth2.getAuthInstance().currentUser.get());
            dispatch(
              updateSigninStatus(
                window.gapi.auth2.getAuthInstance().currentUser.get()
              )
            );
          }
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(listener());
          setUser(window.gapi.auth2.getAuthInstance().currentUser.get());
        });
    } catch (e) {
      console.log(e);
    }
  }

  function handleAuthClick() {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(async (res) => {
        let userdata = {
          uid: res.Ca,
          username: res.nt.Ad,
          email: res.nt.Wt,
          picture: res.nt.JJ,
        };
        await axios.post(API_URL + "/users/addOne", userdata);
        setUser(window.gapi.auth2.getAuthInstance().currentUser.get());
        window.location.reload();
        console.log(window.gapi.auth2.getAuthInstance().currentUser.get());
        dispatch(updateSigninStatus());
      })
      .catch((err) => {
        dispatch(updateSigninStatus());
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
      {!(window.gapi && user) ? (
        <Loader />
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
            <Route path="/admin/">
              <Redirect to={{ pathname: "/admin/login" }} />
            </Route>
            <Route exact path="/privacy-policy">
              <NavBar />
              <PrivacyPolicy />
            </Route>
            <Route exact path="/DMCA">
              <NavBar />
              <DMCA />
            </Route>
            <Route exact path="/terms">
              <NavBar />
              <Terms />
            </Route>
            <Route exact path="/contact">
              <NavBar />
              <Contact />
            </Route>
            <Route exact path="/account">
              <NavBar />
              {user && user.Ca ? (
                <Account user={user} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              )}
            </Route>
            <Route exact path="/">
              <NavBar />
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
