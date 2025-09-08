import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardStats } from '../actions/dashboard-action';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null; // Clear the error message
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true; // Set loading to true while fetching
                state.error = null;   // Clear any previous errors
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;  // Set loading to false after fetching
                state.stats = action.payload.data; // Store the fetched stats
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;  // Set loading to false if fetching fails
                state.error = action.payload; // Store the error message
            });
    },
});

// Export actions and reducer
export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
