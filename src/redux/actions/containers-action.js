import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Helper to get token
const getAuthHeaders = (getState) => {
  const token = getTokenFromLocalStorage() || getState().auth.token;
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Create Container
export const createContainer = createAsyncThunk(
  "container/createContainer",
  async (containerData, { rejectWithValue, getState }) => {
    try {
      const response = await client.post("/widget-containers", containerData, {
        headers: getAuthHeaders(getState),
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Update Container
export const updateContainer = createAsyncThunk(
  "container/updateContainer",
  async ({ containerId, updatedData }, { rejectWithValue, getState }) => {
    try {
      const response = await client.put(
        `/widget-containers/${containerId}`,
        updatedData,
        { headers: getAuthHeaders(getState) }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get Container List
export const readContainer = createAsyncThunk(
  "container/readContainer",
  async ({ id, queryArray }, { rejectWithValue, getState }) => {
    try {
      const queryString = queryArray
        ?.map(
          (query) =>
            `${encodeURIComponent(query.field)}=${encodeURIComponent(
              query.value
            )}`
        )
        .join("&");

      const response = await client.get(
        `/widget-containers${id ? `/id` : ""}${
          queryString ? "?" + queryString : ""
        }`,
        {
          headers: getAuthHeaders(getState),
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get Single Container
export const readSingleContainer = createAsyncThunk(
  "container/readSingleContainer",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const response = await client.get(`/widget-containers/${id}`, {
        headers: getAuthHeaders(getState),
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Delete Container
export const deleteContainer = createAsyncThunk(
  "container/deleteContainer",
  async ({ containerId }, { rejectWithValue, getState }) => {
    try {
      const response = await client.delete(
        `/widget-containers/${containerId}`,
        {
          headers: getAuthHeaders(getState),
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
