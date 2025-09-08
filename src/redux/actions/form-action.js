import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const addFormData = createAsyncThunk(
  "form/addFormData",
  async (formattedData, { rejectWithValue, getState }) => {
    console.log(formattedData);
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.post(
        "/master-settings/master-form",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: "Error",
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

export const fetchAllFormListing = createAsyncThunk(
  "form/fetchAllFormListing",
  async (queryArray, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    const queryString = queryArray
      .map(
        (query) =>
          `${encodeURIComponent(query.field)}=${encodeURIComponent(
            query.value
          )}`
      )
      .join("&");

    try {
      const response = await client.get(
        `/master-settings/master-form${queryString ? "?" + queryString : ""}`,
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
export const fetchActiveFormListing = createAsyncThunk(
  "form/fetchActiveFormListing",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.get(`/master-settings/master-form/active`, {
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

export const fetchMasterForm = createAsyncThunk(
  "form/fetchMasterForm",
  async (query, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.get(
        `/master-settings/master-form?${query.field}=${query.value}`,
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

export const updateFormData = createAsyncThunk(
  "form/addFormData",
  async ({ formattedData, id }, { rejectWithValue, getState }) => {
    console.log(formattedData, "formdat form thunk");
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    try {
      const response = await client.put(
        `/master-settings/master-form/${id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "slow days");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: "Error",
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

export const addDomainSpecificForm = createAsyncThunk(
  "form/addDomainSpecificForm",
  async (formData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // First check local storage, then Redux state
    console.log(token, "token from add domain ");
    try {
      const response = await client.post(
        "/master-settings/domain-specific-form-config",
        formData,
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

export const updateMasterFormStatus = createAsyncThunk(
  "form/updateMasterFormStatus",
  async ({ masterFormId, statusData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/master-form-status/${masterFormId}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "Master form Status Updated");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const fetchDomainSpecificForm = createAsyncThunk(
  "form/fetchDomainSpecificForm",
  async (_, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.get(
        `/master-settings/domain-specific-form-config`,
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
