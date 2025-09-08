import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../axios-baseurl';



const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchDashboardStats",
    async (_, { rejectWithValue, getState }) => {
        const token = getTokenFromLocalStorage() || getState().auth.token;

        try {
            const response = await client.get('/dashboard/dashboard-stats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Return the data directly
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message); // Handle errors
        }
    }
);
