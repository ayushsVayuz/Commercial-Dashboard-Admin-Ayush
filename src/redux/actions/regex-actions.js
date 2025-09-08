import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchRegex = createAsyncThunk(
  "regex/fetchRegex",
  async (queryArray, { rejectWithValue, getState }) => {
    try {
      const token = getTokenFromLocalStorage() || getState().auth.token; // Get the token from local storage or state

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
        `/master-settings/regex${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const fetchActiveRegex = createAsyncThunk(
  "regex/fetchActiveRegex",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getTokenFromLocalStorage() || getState().auth.token; // Get the token from local storage or state

      const response = await client.get(`/master-settings/regex/active-regex`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const addRegex = createAsyncThunk(
  "regex/addRegex",
  async (regexBody, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage() || getState().auth.token; // Get the token from local storage or state
      const response = await client.post(`/master-settings/regex`, regexBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateRegex = createAsyncThunk(
  "regex/updateRegex",
  async ({ regexId, regexBody }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage() || getState().auth.token; // Get the token from local storage or state
      const response = await client.put(
        `/master-settings/regex/${regexId}`,
        regexBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const fetchSingleRegex = createAsyncThunk(
  "regex/fetchSingleRegex",
  async (regexId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage() || getState().auth.token; // Get the token from local storage or state
      const response = await client.get(
        `/master-settings/regex?regexId=${regexId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Update regex status
export const updateRegexStatus = createAsyncThunk(
  "regex/updateRegexStatus",
  async ({ regexId, statusData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/regex-status/${regexId}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);