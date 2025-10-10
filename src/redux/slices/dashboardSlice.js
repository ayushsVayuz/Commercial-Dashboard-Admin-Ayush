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

        if (
          action.payload?.statusCode === 200 &&
          Array.isArray(action.meta.arg.sections)
        ) {
          const updatedSections = action.meta.arg.sections;

          let newData = state.data?.map((section) => {
            const updated = updatedSections.find(
              (s) => s.id === section.section_id
            );
            return updated
              ? { ...section, order_index: updated.order_index }
              : section;
          });

          newData = newData?.sort((a, b) => a.order_index - b.order_index);

          state.data = newData;
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
