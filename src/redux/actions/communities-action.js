import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { buildQueryString, getAuthToken, handleError } from "../../utils";

// Get community list with query
export const readCommunities = createAsyncThunk(
  "section/readCommunities",
  async ({ queryArray = [] }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const queryString = buildQueryString(queryArray);
      const url = `/community/all-communities${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await client.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Change section status
export const changeStatusCommunity = createAsyncThunk(
  "section/changeStatusCommunity",
  async ({ communityId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.put(
        `/community/update-status/${communityId}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return { statusCode: response.data.statusCode };
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const mapCommunities = createAsyncThunk(
  "section/mapCommunities",
  async ({ communityIds }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.put(
        `/community/update-status`,
        {
          communityIds,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return {
        statusCode: response.data.statusCode,
        data: response.data.data,
      };
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
