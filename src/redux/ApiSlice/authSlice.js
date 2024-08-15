import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "api/base";
import { setSession } from "helper/authHelper";
const initialState = {
  user: {},
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
  loginguser: {},
  tokendata: "",
  loginUser: false,
  isOpenNavbar: false,
};

export const logIn = createAsyncThunk("user/login", async (body) => {
  try {
    const response = await axiosInstance.post(`user/login`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const setSessionData = (token, userInfo) => {
  const sessionData = {
    access_token: token,
    userInfo: userInfo,
  };
  setSession(sessionData);
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(logIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const token = action?.payload.payload?.token;
        let userInfo = action?.payload.payload.admin;
        if (token) {
          state.isLoggedIn = true;
          state.loginguser = userInfo;
          state.status = "succeeded";
          setSessionData(token, userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("UserToken", token);
          state.tokendata = token;
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLogin, resetAuth, setUpdatedUser, setAutoLogin, setToken, setIsOpenNavbar } =
  authSlice.actions;
export default authSlice.reducer;
