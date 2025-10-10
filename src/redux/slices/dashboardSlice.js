import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardDetails,
  updateSectionOrder,
} from "../actions/dashboard-action";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSectionOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSectionOrder.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action, "sdfas")
        if (action.payload?.statusCode == 200) {
          // state.data = action.payload;
        }
      })
      .addCase(updateSectionOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
