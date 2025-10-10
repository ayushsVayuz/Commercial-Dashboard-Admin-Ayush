import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken, handleError } from "../../utils";
import { decryptResponse } from "../../utils/decryption";

export const getAllRoles = createAsyncThunk(
  "common/getAllRoles",
  async (
    { skip = 0, limit = 10, search = "" } = {},
    { rejectWithValue, getState }
  ) => {
    const token = getAuthToken(getState);
    try {
      const response = await client.get(`/common/get-all-roles`, {
        params: { skip, limit, search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
