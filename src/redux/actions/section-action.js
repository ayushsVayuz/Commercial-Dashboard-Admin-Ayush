import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken } from "../../utils";
import { encryptPayload } from "../../utils/encryption";
import { decryptApiResponse } from "../../utils/decryptApiResponse";

// Create a new section
export const createSection = createAsyncThunk(
  "section/createSection",
  async (sectionData, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload(sectionData);

    try {
      const response = await client.post("/sections", encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get section list with query
export const readSection = createAsyncThunk(
  "section/readSection",
  async ({ id, queryArray }, { rejectWithValue, getState }) => {
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
        `/sections/dashboard/${id}${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      const decryptedData = await decryptApiResponse(response.data);

      // console.log(decryptedData, "decryptedData section");

      return decryptedData;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
// Get section list with id
export const readSectionListing = createAsyncThunk(
  "section/readSectionListing",
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
        `/sections/all-sections/${id ? id : ""}${
          queryString ? "?" + queryString : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "responsee section");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get section widgets position
export const readSectionWidgetsPosition = createAsyncThunk(
  "section/readSectionWidgetsPosition",
  async ({ id }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.get(`/sections/get-positions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "responsee section");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Get section list with query
export const readSingleSection = createAsyncThunk(
  "section/readSingleSection",
  async ({ id }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.get(`/sections/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "responsee section");

      return response.data;
    } catch (error) {
      console.log("rannn2", error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Update section details
export const updateSection = createAsyncThunk(
  "section/updateSection",
  async ({ sectionId, updatedData }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload(updatedData);
    try {
      const response = await client.put(
        `/sections/${sectionId}`,
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
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Change status of section
export const changeStatusSection = createAsyncThunk(
  "section/changeStatusSection",
  async ({ sectionId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.put(
        `/sections/update-status/${sectionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response of edit");

      return {
        statusCode: response.data.statusCode,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// Delete section
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async ({ domainId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    try {
      const response = await client.delete(
        `/master-settings/section/${domainId}`,
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
