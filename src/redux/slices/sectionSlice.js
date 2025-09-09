import { createSlice } from "@reduxjs/toolkit";
import {
  createSection,
  readSection,
  updateSection,
  deleteSection,
} from "../actions/section-action";

const initialState = {
  sections: [],
  activeDomains: [],
  loading: false,
  error: null,
  isToggleLoading: null,
  totalPages: 1,
};

const domainSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    resetSection: (state) => {
      state.sections = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Section
    builder
      .addCase(createSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create section";
      });

    // Read Sections
    builder
      .addCase(readSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.data.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(readSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch sections";
      });
    // Update Section
    builder
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sections.findIndex(
          (section) => section.id === action.payload.id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });
    // Delete Section
    builder
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sections.findIndex(
          (section) => section.id === action.payload.id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });
  },
});

export const { resetSection } = domainSlice.actions;
export default domainSlice.reducer;
