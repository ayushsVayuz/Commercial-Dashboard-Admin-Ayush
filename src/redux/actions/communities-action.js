import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { buildQueryString, getAuthToken, handleError } from "../../utils";
import { decryptResponse } from "../../utils/decryption";
import { encryptPayload } from "../../utils/encryption";

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

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
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

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const mapCommunities = createAsyncThunk(
  "section/mapCommunities",
  async ({ communityIds }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload({ communityIds: communityIds });

    try {
      const response = await client.put(
        `/community/update-status`,
        encryptedData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
