import { createSlice } from "@reduxjs/toolkit";
import { SCOPES } from "../consts";

export const userSlice = createSlice({
  name: "user",
  initialState: { loggedin: false, details: null },
  reducers: {
    logout: (state) => {
      state.loggedin = false;
    },
    updateSigninStatus: (state) => {
      var currentUser = window.gapi.auth2.getAuthInstance().currentUser.get();
      state.details = currentUser;
      if (!currentUser.wc) {
        state.loggedin = false;
      } else {
        var isAuthorized = currentUser.hasGrantedScopes(SCOPES);
        if (isAuthorized) {
          state.loggedin = true;
        }
      }
    },
    setCurrentUser: (state, action) => {
      state.details = action.payload;
    },
  },
});
export const getUser = (state) => state.user.details;
export const { logout, updateSigninStatus, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
