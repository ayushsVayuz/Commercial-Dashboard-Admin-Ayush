import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRegex,
  fetchActiveRegex,
  addRegex,
  updateRegex,
  fetchSingleRegex,
  updateRegexStatus,  // Import the new thunk
} from "../actions/regex-actions"; // Adjust the path as necessary

const initialState = {
  regexList: [],           // Stores the list of regex patterns
  activeRegex: [],         // Stores active regex patterns
  singleRegex: null,       // Stores a single regex pattern
  loading: false,          // For tracking API request status
  error: null,             // To store error messages if API requests fail
  isToggleLoading: null,   // For tracking loading state when updating status
  totalPages: 1
};

const regexSlice = createSlice({
  name: "regex",
  initialState,
  reducers: {
    resetRegexState: (state) => {
      state.regexList = [];
      state.activeRegex = [];
      state.singleRegex = null;
      state.loading = false;
      state.error = null;
      state.isToggleLoading = null;  // Reset toggle loading state
    },
  },
  extraReducers: (builder) => {
    // Fetch Regex
    builder
      .addCase(fetchRegex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegex.fulfilled, (state, action) => {
        state.loading = false;
        state.regexList = action.payload.data.data; // Assuming API returns regex list directly
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchRegex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch regex patterns";
      });

    // Fetch Active Regex
    builder
      .addCase(fetchActiveRegex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveRegex.fulfilled, (state, action) => {
        state.loading = false;
        state.activeRegex = action.payload.data; // Assuming API returns active regex directly
      })
      .addCase(fetchActiveRegex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch active regex patterns";
      });

    // Add Regex
    builder
      .addCase(addRegex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRegex.fulfilled, (state, action) => {
        state.loading = false;
        state.regexList.push(action.payload); // Add new regex to the state
      })
      .addCase(addRegex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add regex pattern";
      });

    // Update Regex
    builder
      .addCase(updateRegex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRegex.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.regexList.findIndex(
          (regex) => regex.id === action.payload.id // Adjust based on your ID structure
        );
        if (index !== -1) {
          state.regexList[index] = action.payload; // Update regex in the state
        }
      })
      .addCase(updateRegex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update regex pattern";
      });

    // Fetch Single Regex
    builder
      .addCase(fetchSingleRegex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleRegex.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRegex = action.payload.data.data; // Assuming API returns the single regex directly
      })
      .addCase(fetchSingleRegex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch single regex pattern";
      });

    // Update Regex Status
    builder
      .addCase(updateRegexStatus.pending, (state, action) => {
        state.isToggleLoading = action.meta.arg.regexId; // Set the ID of the regex being updated
        state.error = null;
      })
      .addCase(updateRegexStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null; // Reset loading state
        const { regexId, isActive } = action.payload.data; // Assuming API returns updated regex data
        state.regexList = state.regexList.map((regex) => {
          if (regex.regexId === regexId) {
            return {
              ...regex,
              isActive, // Update the isActive status
            };
          }
          return regex; // Return unchanged regex
        });
      })

      .addCase(updateRegexStatus.rejected, (state, action) => {
        state.isToggleLoading = null; // Reset loading state
        state.error = action.payload || "Failed to update regex status";
      });
  },
});

export const { resetRegexState } = regexSlice.actions;
export default regexSlice.reducer;
