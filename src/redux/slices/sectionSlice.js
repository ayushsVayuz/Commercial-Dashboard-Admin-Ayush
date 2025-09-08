import { createSlice } from "@reduxjs/toolkit";
import {
  createDomain,
  fetchActiveDomains,
  fetchDomains,
  updateDomain,
  updateDomainStatus,
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
    resetDomainState: (state) => {
      state.sections = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Section
    builder
      .addCase(createDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create section";
      });

    // Fetch Sections
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.data.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch sections";
      });

    // Update Section
    builder
      .addCase(updateDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sections.findIndex(
          (section) => section.id === action.payload.id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(updateDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });

    // Update Section Status
    builder
      .addCase(updateDomainStatus.pending, (state, action) => {
        state.isToggleLoading = action.meta.arg.domainId;
        state.error = null;
      })
      .addCase(updateDomainStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null;
        const { domainId, isActive } = action.payload.data;
        const index = state.sections.findIndex(
          (section) => section.domainId === domainId
        );
        if (index != -1) {
          state.sections = state.sections.map((obj, i) => {
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
      .addCase(updateDomainStatus.rejected, (state, action) => {
        state.isToggleLoading = null;
        state.error =
          action.payload?.message || "Failed to update section status";
      });

    // fetch active sections
    builder
      .addCase(fetchActiveDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveDomains.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        const sortedData = action.payload.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        state.activeDomains = sortedData;
      })
      .addCase(fetchActiveDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch sections";
      });
  },
});

export const { resetDomainState } = domainSlice.actions;
export default domainSlice.reducer;
