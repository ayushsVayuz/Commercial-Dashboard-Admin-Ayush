import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMasterConfigs,
  createMasterConfig,
  updateMasterConfig,
  updateMasterConfigStatus,
  fetchActiveMasterConfigs,
  uploadCSVFile,
  downloadCSVFileApi,
} from "../actions/master-config-actions"; // Assuming you have your actions in this path

const initialState = {
  masterConfigs: [],
  activeMasterConfig: [], // Stores the master config data
  loading: false, // For tracking API request status
  error: null, // To store error messages if API requests fail
  isToggleLoading: null, // Specific for tracking the loading of status change
  csvFileLoading: false,
  csvFileError: null,
  downloadCSVFile: null,
  downloadCsvLoading: false,
  downloadCsvError: null,
};

const masterConfigSlice = createSlice({
  name: "masterConfig",
  initialState,
  reducers: {
    resetMasterConfigState: (state) => {
      state.masterConfigs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Master Configs
    builder
      .addCase(fetchMasterConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.downloadCSVFile = null;
      })
      .addCase(fetchMasterConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.masterConfigs = action.payload.data.data; // Assuming API returns data as `data`
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchMasterConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch master configs";
      });

    // Create Master Config
    builder
      .addCase(createMasterConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMasterConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.masterConfigs.push(action.payload); // Add new config to the state
      })
      .addCase(createMasterConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create master config";
      });

    // Update Master Config
    builder
      .addCase(updateMasterConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMasterConfig.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.masterConfigs.findIndex(
          (config) => config.masterConfigId === action.payload.masterConfigId
        );
        if (index !== -1) {
          state.masterConfigs[index] = action.payload; // Update config in the state
        }
      })
      .addCase(updateMasterConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update master config";
      });

    // Update Master Config Status
    builder
      .addCase(updateMasterConfigStatus.pending, (state, action) => {
        state.isToggleLoading = action.meta.arg.masterConfigId;
        state.error = null;
      })
      .addCase(updateMasterConfigStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null;
        const { masterConfigId, isActive } = action.payload.data;
        const index = state.masterConfigs.findIndex(
          (config) => config.masterConfigId === masterConfigId
        );
        if (index !== -1) {
          state.masterConfigs[index].isActive = isActive; // Update config status
        }
      })
      .addCase(updateMasterConfigStatus.rejected, (state, action) => {
        state.isToggleLoading = null;
        state.error = action.payload || "Failed to update master config status";
      });

    // fetch active master config

    builder
      .addCase(fetchActiveMasterConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveMasterConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.activeMasterConfig = action.payload.data; // Assuming API returns data as `data`
      })
      .addCase(fetchActiveMasterConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch master configs";
      });

    builder
      .addCase(uploadCSVFile.pending, (state, action) => {
        state.csvFileLoading = true;
      })
      .addCase(uploadCSVFile.fulfilled, (state, action) => {
        state.csvFileLoading = false;
        state.csvFileError = null;
      })
      .addCase(uploadCSVFile.rejected, (state, action) => {
        state.csvFileLoading = false;
        state.csvFileError =
          action.payload?.message || "error in uploading CSV file";
      });

    builder
      .addCase(downloadCSVFileApi.pending, (state, action) => {
        state.downloadCsvLoading = true;
      })
      .addCase(downloadCSVFileApi.fulfilled, (state, action) => {
        state.downloadCsvLoading = false;
        // console.log(action.payload.data);
        const sortedData = action.payload.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Store the sorted data in state
        state.downloadCSVFile = sortedData;
      })
      .addCase(downloadCSVFileApi.rejected, (state, action) => {
        state.downloadCsvLoading = false;
        state.downloadCsvError =
          action.payload?.message || "error in uploading CSV file";
      });
  },
});

export const { resetMasterConfigState } = masterConfigSlice.actions;
export default masterConfigSlice.reducer;
