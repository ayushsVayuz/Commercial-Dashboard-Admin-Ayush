import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Create a new widget
export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (sectionData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.post("/widgets", sectionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get widget list with query
export const readWidget = createAsyncThunk(
  "widget/readWidget",
  async ({ id, queryArray }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      // Construct the query string from the array of query objects
      const queryString = queryArray
        ?.map(
          (query) =>
            `${encodeURIComponent(query.field)}=${encodeURIComponent(
              query.value
            )}`
        )
        .join("&");

      const response = await client.get(
        `/widgets/${id ? "" : "all-widgets"}/${id ? id : ""}${
          queryString ? "?" + queryString : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "responsee widget");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get widget list with query
export const readSingleWidget = createAsyncThunk(
  "widget/readSingleWidget",
  async ({ id }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;

    try {
      const response = await client.get(`/widgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "responsee widget");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Update widget details
export const updateWidget = createAsyncThunk(
  "widget/updateWidget",
  async ({ widgetId, updatedData }, { rejectWithValue, getState }) => {
    console.log(widgetId, updatedData, "widgetid and updated data");
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(`/widgets/${widgetId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "response of edit");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Change status of section
export const changeStatusWidget = createAsyncThunk(
  "widget/changeStatusWidget",
  async ({ widgetId }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;

    try {
      const response = await client.put(`/widgets/update-status/${widgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "response of edit");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Delete widget
export const deleteWidget = createAsyncThunk(
  "widget/deleteWidget",
  async ({ domainId, updatedData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/widget/${domainId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response of edit");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
