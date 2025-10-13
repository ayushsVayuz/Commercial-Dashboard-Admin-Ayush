import { createSlice } from "@reduxjs/toolkit";
import { compareOtp, loginUser, resendOtp } from "../actions/userAuth-action";

const initialState = {
  user: null,
  token: null,
  otpRequestId: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
      state.loading = false;
      state.error = null;
      // Clear token from local storage on reset
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.otpRequestId = action.payload.data?.otpRequestId; // Assuming OTP request ID is returned
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });

    // Compare OTP
    builder
      .addCase(compareOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(compareOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.token = action.payload.token; // Assuming token is returned after OTP verification
        state.isAuthenticated = true; // Set isAuthenticated to true after OTP is verified

        // Save token to local storage
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(compareOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to verify OTP";
      });

    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpRequestId = action.payload.otpRequestId; // Assuming otpRequestId is returned after OTP resend
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to resend OTP";
      });
  },
});

export const { resetAuthState } = authSlice.actions; // Exporting the reducer action
export default authSlice.reducer;
