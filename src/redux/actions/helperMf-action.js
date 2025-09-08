import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchHelper = createAsyncThunk(
  "helper/fetchHelper",
  async (queryArray, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const queryString = queryArray
        .map(
          (query) =>
            `${encodeURIComponent(query.field)}=${encodeURIComponent(
              query.value
            )}`
        )
        .join("&");
      const response = await client.get(
        `/master-settings/helper-mf${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "responsee domain");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const createHelper = createAsyncThunk(
  "helper/createHelper",
  async (formattedData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.post(
        "/master-settings/helper-mf",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: "Error",
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

export const updateHelperData = createAsyncThunk(
  "helper/updateHelperData",
  async ({ formattedData, id }, { rejectWithValue, getState }) => {
    console.log(formattedData, id, "id", "formdat form thunk");
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.put(
        `/master-settings/helper-mf/${id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: "Error",
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);
export const updateHelperStatus = createAsyncThunk(
  "helper/updateHelperStatus",
  async ({ status, id }, { rejectWithValue, getState }) => {
    console.log(status, id, "id", "formdat form thunk");
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.put(
        `/master-settings/helper-mf-status/${id}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const fetchActiveHelper = createAsyncThunk(
  "helper/fetchActiveHelper",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.get(`/master-settings/helper-mf/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "responsee domain");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
