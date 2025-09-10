import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Create a new section
export const createSection = createAsyncThunk(
  "section/createSection",
  async (sectionData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.post("/sections", sectionData, {
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

// Get section list with query
export const readSection = createAsyncThunk(
  "section/readSection",
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
        `/sections/dashboard/${id}${queryString ? "?" + queryString : ""}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
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

// Get section list with query
export const readSingleSection = createAsyncThunk(
  "section/readSingleSection",
  async ({ id }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token;

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
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/sections/${sectionId}`,
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

// Delete section
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async ({ domainId, updatedData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/section/${domainId}`,
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
