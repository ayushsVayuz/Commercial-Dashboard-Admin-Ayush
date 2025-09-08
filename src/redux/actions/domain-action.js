import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; // Assuming you have axios setup here

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Post a new domain
export const createDomain = createAsyncThunk(
  "domain/createDomain",
  async (domainData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.post(
        "/master-settings/domain",
        domainData,
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

// Get domain list with query
export const fetchDomains = createAsyncThunk(
  "domain/fetchDomains",
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
        `/master-settings/domain${queryString ? "?" + queryString : ""}`,
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

export const fetchActiveDomains = createAsyncThunk(
  "domain/fetchActiveDomains",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.get(
        `/master-settings/domain/active-domains`,
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

// Update domain details
export const updateDomain = createAsyncThunk(
  "domain/updateDomain",
  async ({ domainId, updatedData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/domain/${domainId}`,
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

// Update domain status
export const updateDomainStatus = createAsyncThunk(
  "domain/updateDomainStatus",
  async ({ domainId, statusData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/domain-status/${domainId}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "responsee");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
