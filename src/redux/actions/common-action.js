import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken, handleError } from "../../utils";

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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      // console.log(response.data, "roles response");

      return {
        statusCode: response.data.statusCode,
        data: response.data.data,
        total: response.data.total,
      };
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
