import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; // Assuming axios is set up here

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// 1. Thunk to fetch master config data
export const fetchMasterConfigs = createAsyncThunk(
  "masterConfig/fetchMasterConfigs",
  async (queryArray, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      // Construct the query string from the array of query objects
      const queryString = queryArray
        .map(
          (query) =>
            `${encodeURIComponent(query.field)}=${encodeURIComponent(
              query.value
            )}`
        )
        .join("&");

      const response = await client.get(
        `/master-settings/master-config${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const fetchActiveMasterConfigs = createAsyncThunk(
  "masterConfig/fetchActiveMasterConfigs",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first
    try {
      const response = await client.get(
        `/master-settings/master-config/active`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// 2. Thunk to create a new master config
export const createMasterConfig = createAsyncThunk(
  "masterConfig/createMasterConfig",
  async (masterConfigData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;
    try {
      const response = await client.post(
        "/master-settings/master-config",
        masterConfigData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "create response");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// 3. Thunk to update a specific master config
export const updateMasterConfig = createAsyncThunk(
  "masterConfig/updateMasterConfig",
  async ({ masterConfigId, updatedData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;
    try {
      const response = await client.put(
        `/master-settings/master-config/${masterConfigId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "res of edit");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// 4. Thunk to update the status of a master config
export const updateMasterConfigStatus = createAsyncThunk(
  "masterConfig/updateMasterConfigStatus",
  async ({ masterConfigId, statusData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;
    try {
      const response = await client.put(
        `/master-settings/master-config-status/${masterConfigId}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const uploadCSVFile = createAsyncThunk(
  "masterConfig/uploadCSVFile",
  async (csvFile, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;
    try {
      const response = await client.post(
        "/master-settings/master-config/upload-csv",
        csvFile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "create response");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const downloadCSVFileApi = createAsyncThunk(
  "masterConfig/downloadCSVFileApi",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;
    try {
      const response = await client.get(
        "/master-settings/master-config/download-csv",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "create response");
      // console.log(response.blob(), "blob");
      // const blob = await response.blob(); // Convert the response to Blob
      // return blob;
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
