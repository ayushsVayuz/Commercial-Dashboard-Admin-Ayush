import { createSlice } from "@reduxjs/toolkit";
import {
  createDomain,
  fetchActiveDomains,
  fetchDomains,
  updateDomain,
  updateDomainStatus,
} from "../actions/domain-action";

const initialState = {
  domains: [],
  activeDomains: [],
  loading: false,
  error: null,
  isToggleLoading: null,
  totalPages: 1,
};

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    resetDomainState: (state) => {
      state.domains = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Domain
    builder
      .addCase(createDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.domains.push(action.payload);
      })
      .addCase(createDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create domain";
      });

    // Fetch Domains
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload.data.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch domains";
      });

    // Update Domain
    builder
      .addCase(updateDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.domains.findIndex(
          (domain) => domain.id === action.payload.id
        );
        if (index !== -1) {
          state.domains[index] = action.payload;
        }
      })
      .addCase(updateDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update domain";
      });

    // Update Domain Status
    builder
      .addCase(updateDomainStatus.pending, (state, action) => {
        state.isToggleLoading = action.meta.arg.domainId;
        state.error = null;
      })
      .addCase(updateDomainStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null;
        const { domainId, isActive } = action.payload.data;
        const index = state.domains.findIndex(
          (domain) => domain.domainId === domainId
        );
        if (index != -1) {
          state.domains = state.domains.map((obj, i) => {
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
          action.payload?.message || "Failed to update domain status";
      });

    // fetch active domains
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
        state.error = action.payload?.message || "Failed to fetch domains";
      });
  },
});

export const { resetDomainState } = domainSlice.actions;
export default domainSlice.reducer;
