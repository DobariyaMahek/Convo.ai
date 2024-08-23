import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { setSession } from "../../helper/authHelper";
const initialState = {
  user: {},
  authLoader: false,
  status: "idle",
  error: null,
  loginUser: {},
  tokenData: "",
};

export const logIn = createAsyncThunk("auth/sign-in", async ({ name, email, password }) => {
  const body = {
    username: name,
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post(`auth/sign-in`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const SendOTP = createAsyncThunk("auth/forgot-password", async ({ email }) => {
  try {
    const response = await axiosInstance.post(`carehome/forgot-password`, { email: email });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const VerifyForgotPasswordOTP = createAsyncThunk(
  "otp/verify-forgot-pass-otp",
  async (body) => {
    try {
      const response = await axiosInstance.post(`otp/verify-forgot-pass-otp`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const ResetPassword = createAsyncThunk("/auth/reset-password", async (body) => {
  try {
    const response = await axiosInstance.post(`/carehome/reset-password`, body);
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
        state.authLoader = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const token = action?.payload.payload?.token;
        // let userInfo = action?.payload.payload.admin;
        state.authLoader = false;
        if (token) {
          state.loginUser = userInfo;
          state.status = "succeeded";
          setSessionData(token, userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("UserToken", token);
          state.tokenData = token;
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.authLoader = false;
      })
      .addCase(SendOTP.pending, (state) => {
        state.authLoader = true;
      })
      .addCase(SendOTP.fulfilled, (state, action) => {
        state.authLoader = false;
      })
      .addCase(SendOTP.rejected, (state, action) => {
        state.authLoader = false;
      })
      .addCase(VerifyForgotPasswordOTP.pending, (state) => {
        state.authLoader = true;
      })
      .addCase(VerifyForgotPasswordOTP.fulfilled, (state, action) => {
        state.authLoader = false;
      })
      .addCase(VerifyForgotPasswordOTP.rejected, (state, action) => {
        state.authLoader = false;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.authLoader = true;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.authLoader = false;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.authLoader = false;
      });
  },
});

export default authSlice.reducer;
