import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; // Assuming you have axios setup here

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

// GET: Fetch domain config list
export const fetchDomainConfigs = createAsyncThunk(
    "config/fetchDomainConfigs",
    async (queryArray, { rejectWithValue, getState }) => {
        const token = getTokenFromLocalStorage() || getState().auth.token;

        try {
            // Construct the query string from the array of query objects
            const queryString = queryArray
                .map(query => `${encodeURIComponent(query.field)}=${encodeURIComponent(query.value)}`)
                .join('&');

            const response = await client.get(`/master-settings/domain-config${queryString ? '?' + queryString : ''}`, {
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

// POST: Create a new domain config
export const createDomainConfig = createAsyncThunk(
    "config/createDomainConfig",
    async (configData, { rejectWithValue, getState }) => {
        const token = getTokenFromLocalStorage() || getState().auth.token;

        try {
            const response = await client.post("/master-settings/domain-config", configData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response, 'responsee');

            return response.data;
        } catch (error) {

            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

// PUT: Update a specific domain config by ID
export const updateDomainConfig = createAsyncThunk(
    "config/updateDomainConfig",
    async ({ domainSpecificConfigId, updatedData }, { rejectWithValue, getState }) => {
        const token = getTokenFromLocalStorage() || getState().auth.token;

        try {
            const response = await client.put(
                `/master-settings/domain-config/${domainSpecificConfigId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response, 'response of update');

            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

// PUT: Update the status of a domain config by ID
export const updateDomainConfigStatus = createAsyncThunk(
    "config/updateDomainConfigStatus",
    async ({ domainSpecificConfigId, statusData }, { rejectWithValue, getState }) => {
        const token = getTokenFromLocalStorage() || getState().auth.token;

        try {
            const response = await client.put(
                `/master-settings/domain-config-status/${domainSpecificConfigId}`,
                statusData,
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
