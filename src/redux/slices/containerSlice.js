import { createSlice } from "@reduxjs/toolkit";
import {
  createContainer,
  readContainer,
  updateContainer,
  deleteContainer,
  readSingleContainer,
} from "../actions/containers-action";

const initialState = {
  containers: [],
  singleContainer: {},
  payload: {},
  loading: false,
  error: null,
  totalCount: 0,
};

const containersSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    setContainerPayload: (state, action) => {
      state.payload = action.payload;
    },
    resetContainerPayload: (state) => {
      state.payload = {};
    },
    resetSingleContainer: (state) => {
      state.singleContainer = {};
    },
  },
  extraReducers: (builder) => {
    // Create Container
    builder
      .addCase(createContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.containers.push(action.payload);
        state.payload = action.payload; // keep for preview
      })
      .addCase(createContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create container";
      });

    // Read Containers
    builder
      .addCase(readContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.containers = action.payload?.data || [];
        state.totalCount = action.payload?.total || 0;
      })
      .addCase(readContainer.rejected, (state, action) => {
        state.loading = false;
        state.containers = [];
        state.error = action.payload || "Failed to fetch containers";
      });

    // Read Single Container
    builder
      .addCase(readSingleContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readSingleContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.singleContainer = action.payload?.data || {};
        state.payload = action.payload?.data || {}; // for preview
      })
      .addCase(readSingleContainer.rejected, (state, action) => {
        state.loading = false;
        state.singleContainer = {};
        state.error = action.payload || "Failed to fetch container";
      });

    // Update Container
    builder
      .addCase(updateContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContainer.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.containers.findIndex(
          (c) => c.id === updated.id || c.container_id === updated.container_id
        );
        if (index !== -1) {
          state.containers[index] = updated;
        }
        state.payload = updated; // keep for preview
      })
      .addCase(updateContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update container";
      });

    // Delete Container
    builder
      .addCase(deleteContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContainer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload?.id || action.payload?.container_id;
        state.containers = state.containers.filter(
          (c) => c.id !== deletedId && c.container_id !== deletedId
        );
      })
      .addCase(deleteContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete container";
      });
  },
});

export const {
  setContainerPayload,
  resetContainerPayload,
  resetSingleContainer,
} = containersSlice.actions;

export default containersSlice.reducer;
