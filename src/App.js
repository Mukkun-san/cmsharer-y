import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import YandexFileDownload from "./pages/Main/YandexFileDownload";
import OpenDriveFileDownload from "./pages/Main/OpenDriveFileDownload";
import Home from "./pages/Main/Home";
import Contact from "./pages/Main/Contact";
import DMCA from "./pages/Main/DMCA";
import Terms from "./pages/Main/Terms";
import PrivacyPolicy from "./pages/Main/PrivacyPolicy";
import NotFound from "./pages/NotFound/NotFound";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import DashboardUsers from "./pages/Admin/Dashboard/Users";
import YandexLinks from "./pages/Admin/Dashboard/YandexLinks";
import AdminLogin from "./pages/Admin/Login/Login";
import AdminAccount from "./pages/Admin/Pages/Account";
import AddLinks from "./pages/Admin/Pages/AddLinks";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import { API_URL, ADMIN_TOKEN } from "./store/consts.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [adminIsLoggedin, setAdminIsLoggedin] = useState(null);

  useEffect(() => {
    adminAuth();
  });

  async function adminAuth() {
    let res = await axios.post(
      API_URL + "/admin/authorize",
      {},
      { headers: { authorization: ADMIN_TOKEN } }
    );
    if (res.data && res.data.authorized) {
      setAdminIsLoggedin(true);
    } else {
      setAdminIsLoggedin(false);
    }
  }

  return (
    <Router>
      <ToastContainer />
      {adminIsLoggedin === null ? (
        <div className="col d-flex justify-content-center">
          <Loader color="warning" />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: 'url("./assets/1526027.jpg")',
          }}
        >
          <Switch>
            <Route exact path="/admin/dashboard/users">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {adminIsLoggedin ? (
                <DashboardUsers />
              ) : (
                <Redirect to={{ pathname: "/admin/login" }} />
              )}
            </Route>
            <Route exact path="/admin/dashboard/links/yandex">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {adminIsLoggedin ? (
                <YandexLinks />
              ) : (
                <Redirect to={{ pathname: "/admin/login" }} />
              )}
            </Route>
            <Route exact path="/admin/add-links">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {adminIsLoggedin ? (
                <AddLinks />
              ) : (
                <Redirect to={{ pathname: "/admin/login" }} />
              )}
            </Route>
            <Route path="/admin/dashboard">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {adminIsLoggedin ? (
                <AdminDashboard />
              ) : (
                <Redirect to={{ pathname: "/admin/login" }} />
              )}
            </Route>
            <Route exact path="/admin/account">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {adminIsLoggedin ? (
                <AdminAccount />
              ) : (
                <Redirect to={{ pathname: "/admin/login" }} />
              )}
            </Route>
            <Route exact path="/admin/login">
              <AdminNavBar adminIsLoggedin={adminIsLoggedin} />
              {!adminIsLoggedin ? (
                <AdminLogin />
              ) : (
                <Redirect to={{ pathname: "/admin/dashboard" }} />
              )}
            </Route>
            <Route path="/admin/">
              <Redirect to={{ pathname: "/admin/login" }} />
            </Route>
            <Route exact path="/y/:slug">
              <NavBar /> <YandexFileDownload />
            </Route>
            <Route exact path="/o/:slug">
              <NavBar /> <OpenDriveFileDownload />
            </Route>
            <Route exact path="/page/privacy-policy">
              <NavBar /> <PrivacyPolicy />
            </Route>
            <Route exact path="/page/dmca">
              <NavBar /> <DMCA />
            </Route>
            <Route exact path="/page/terms-conditions">
              <NavBar /> <Terms />
            </Route>
            <Route exact path="/page/contact">
              <NavBar /> <Contact />
            </Route>
            <Route exact path="/">
              <NavBar />
              <Home />
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
