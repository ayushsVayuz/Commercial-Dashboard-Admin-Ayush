import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import axios from "axios";

// export const loginUser = createAsyncThunk(
//   "loginUser",
//   async (authInfo, { rejectWithValue }) => {
//     try {
//       const response = await client.post(
//         "/auth/login",
//         { ...authInfo },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response, "response of login");

//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error?.response?.data?.message || error?.message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "loginUser",
  async (authInfo, { rejectWithValue }) => {
    try {
      console.log(authInfo);

      const response = await fetch(
        "https://anarock-super-admin.vayuz.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authInfo), // Format authInfo as JSON
        //   mode: "no-cors",
        }
      );

      console.log(response, "response from login user");

      // Check if the response is successful (status 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return rejectWithValue(errorData.message || "An error occurred");
      }

      // Parse the response JSON if successful
      const data = await response.json();
      console.log(data, "response of login");

      return data;
    } catch (error) {
      console.log(error, "error from user auth");

      // Handle error messages
      return rejectWithValue(
        error?.message || "An error occurred during the login process"
      );
    }
  }
);

export const compareOtp = createAsyncThunk(
  "compareOtp",
  async (otpInfo, { rejectWithValue }) => {
    try {
      const response = await client.post(
        "/auth/compare-otp",
        { ...otpInfo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response otp compare");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp",
  async ({ otpRequestId, token }, { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/auth/resend-otp?otpRequestId=${otpRequestId}`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response otp resend");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
