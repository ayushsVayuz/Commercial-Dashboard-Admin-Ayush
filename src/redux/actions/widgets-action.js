import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";
import { getAuthToken } from "../../utils";

// Create a new widget
export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (sectionData, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
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

export const updateWidgetCMS = createAsyncThunk(
  "widget/updateWidgetCMS",
  async ({ widgetId, updatedData }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.put(
        `/widgets/update-widget/${widgetId}`,
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
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get widget list with query
export const readWidget = createAsyncThunk(
  "widget/readWidget",
  async ({ id, queryArray }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

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
        `widgets/all-widgets/${queryString ? "?" + queryString : ""}`,
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

export const readMappedWidget = createAsyncThunk(
  "widget/readMappedWidget",
  async ({ queryArray }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

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
        `/widgets${queryString ? "?" + queryString : ""}`,
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
    const token = getAuthToken(getState);

    try {
      const response = await client.get(`/widgets/widget-details/${id}`, {
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
    const token = getAuthToken(getState);

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
    const token = getAuthToken(getState);

    try {
      const response = await client.put(
        `/widgets/update-status/${widgetId}`,
        {},
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

// Delete widget
export const deleteWidget = createAsyncThunk(
  "widget/deleteWidget",
  async ({ domainId, updatedData }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

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
