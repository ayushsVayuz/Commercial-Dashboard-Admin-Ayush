import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";
import { getAuthToken, handleError } from "../../utils";
import { encryptPayload } from "../../utils/encryption";
import { decryptResponse } from "../../utils/decryption";

// Create a new widget
export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (widgetData, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload(widgetData);
    try {
      const response = await client.post("/widgets", encryptedData, {
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

export const updateWidgetCMS = createAsyncThunk(
  "widget/updateWidgetCMS",
  async ({ widgetId, updatedData }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload(updatedData);
    try {
      const response = await client.put(
        `/widgets/update-widget/${widgetId}`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response of edit");

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return handleError(error, rejectWithValue);
    }
  }
);

// Get widget list with query
export const readWidget = createAsyncThunk(
  "widget/readWidget",
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
        `widgets/all-widgets/${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "responsee widget");

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      console.log("rannn2", error);
      return handleError(error, rejectWithValue);
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

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      console.log("rannn2", error);
      return handleError(error, rejectWithValue);
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

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Update widget details
export const updateWidget = createAsyncThunk(
  "widget/updateWidget",
  async ({ widgetId, updatedData }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload(updatedData);
    try {
      const response = await client.put(`/widgets/${widgetId}`, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "response of edit");

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Change status of section
export const changeStatusWidget = createAsyncThunk(
  "widget/changeStatusWidget",
  async ({ widgetId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload({});

    try {
      const response = await client.put(
        `/widgets/update-status/${widgetId}`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response of edit");

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Delete widget
export const deleteWidget = createAsyncThunk(
  "widget/deleteWidget",
  async ({ domainId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.delete(
        `/master-settings/widget/${domainId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response of edit");

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
