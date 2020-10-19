import { API_URL } from "../../../config";
import axios from "axios";

export default async function authenticate(history) {
  const accessToken = window.sessionStorage.getItem("adminToken") || null;
  if (accessToken) {
    let res = await axios.post(API_URL + "/admin/authenticate", accessToken);
    if (!res.data.authorized) {
      history.push("/admin/login");
    }
  } else {
    history.push("/admin/login");
  }
}
