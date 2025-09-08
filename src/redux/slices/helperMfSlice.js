import { createSlice } from "@reduxjs/toolkit";
import {
  createHelper,
  fetchActiveHelper,
  fetchHelper,
  updateHelperData,
  updateHelperStatus,
} from "../actions/helperMf-action";

const initialState = {
  helperData: [],
  loading: false,
  error: false,
  isToggleLoading: null,
};

const helperMfSlice = createSlice({
  name: "form",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelper.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchHelper.fulfilled, (state, action) => {
        state.loading = false;
        state.helperData = action.payload.data.data;
      })
      .addCase(fetchHelper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in HelperMf";
      });

    builder
      .addCase(fetchActiveHelper.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchActiveHelper.fulfilled, (state, action) => {
        state.loading = false;
        state.helperData = action.payload.data;
      })
      .addCase(fetchActiveHelper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in HelperMf";
      });

    builder
      .addCase(createHelper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHelper.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createHelper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create domain";
      });

    builder
      .addCase(updateHelperData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateHelperData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateHelperData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    builder
      .addCase(updateHelperStatus.pending, (state, action) => {
        console.log(action.meta.arg, "meta.args");
        state.isToggleLoading = action.meta.arg.id;
        state.error = null;
      })
      .addCase(updateHelperStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null;
        const { helperMicroFrontendId, isActive } = action.payload.data;
        const index = state.helperData.findIndex(
          (data) => data.helperMicroFrontendId === helperMicroFrontendId
        );
        if (index != -1) {
          state.helperData = state.helperData.map((obj, i) => {
            if (i == index) {
              return {
                ...obj,
                isActive,
              };
            } else {
              return obj;
            }
          });
        }
      })
      .addCase(updateHelperStatus.rejected, (state, action) => {
        state.isToggleLoading = null;
        state.error =
          action.payload?.message || "Failed to update domain status";
      });
  },
});

export default helperMfSlice.reducer;
