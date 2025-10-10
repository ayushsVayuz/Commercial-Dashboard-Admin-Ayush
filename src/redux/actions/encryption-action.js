import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const readPublicKey = createAsyncThunk(
  "encryption/readPublicKey",
  async (_, { rejectWithValue, getState }) => {
    // const token = getAuthToken(getState);
    try {
      const response = await client.get("/keys/public-key", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
