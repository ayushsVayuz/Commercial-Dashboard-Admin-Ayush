import { createSlice } from "@reduxjs/toolkit";
import {
  createSection,
  readSection,
  updateSection,
  deleteSection,
  readSingleSection,
  changeStatusSection,
} from "../actions/section-action";

const initialState = {
  sections: [],
  singleSection: {},
  payload: {},
  loading: false,
  statusLoading: {},
  error: null,
  totalCount: 0,
};

const domainSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    sectionPayload: (state, action) => {
      state.payload = action.payload;
    },
    resetSectionPayload: (state) => {
      state.payload = {};
    },
    resetSections: (state) => {
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
        state.sections = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(readSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch sections";
      });
    // Read Single Section
    builder
      .addCase(readSingleSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readSingleSection.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSection = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(readSingleSection.rejected, (state, action) => {
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
          (section) => section.section_id === action.payload.id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });
    // Change status of section
    builder
      .addCase(changeStatusSection.pending, (state, action) => {
        state.statusLoading = action.meta.arg.sectionId;
      })
      .addCase(changeStatusSection.fulfilled, (state) => {
        state.sections = state.sections.map((section) =>
          section.id === state.statusLoading
            ? { ...section, status: section.status === 1 ? 0 : 1 }
            : section
        );
        state.statusLoading = {};
      })
      .addCase(changeStatusSection.rejected, (state, action) => {
        state.statusLoading = {};
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

export const { sectionPayload, resetSection, resetSectionPayload } =
  domainSlice.actions;
export default domainSlice.reducer;
