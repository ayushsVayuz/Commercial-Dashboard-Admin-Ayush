import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken } from "../../utils";

// Create Container
export const createContainer = createAsyncThunk(
  "container/createContainer",
  async (containerData, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    try {
      const response = await client.post("/widget-containers", containerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const token = getAuthToken(getState);
    try {
      const response = await client.put(
        `/widget-containers/${containerId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
  async ({ queryArray }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
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
        `/widget-containers${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    const token = getAuthToken(getState);
    s;
    try {
      const response = await client.get(`/widget-containers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const token = getAuthToken(getState);
    try {
      const response = await client.delete(
        `/widget-containers/${containerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
