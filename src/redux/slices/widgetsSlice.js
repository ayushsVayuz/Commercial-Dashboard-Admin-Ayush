import { createSlice } from "@reduxjs/toolkit";
import {
  createWidget,
  readWidget,
  updateWidget,
  deleteWidget,
  readSingleWidget,
} from "../actions/widgets-action";

const initialState = {
  widgets: [],
  singleWidget: {},
  payload: {},
  loading: false,
  error: null,
  isToggleLoading: null,
  totalPages: 1,
};

const widgetsSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    widgetPayload: (state, action) => {
      state.payload = action.payload;
    },
    resetWidgetPayload: (state) => {
      state.payload = {};
    },
  },
  extraReducers: (builder) => {
    // Create Widget
    builder
      .addCase(createWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWidget.fulfilled, (state, action) => {
        state.loading = false;
        state.widgets.push(action.payload);
      })
      .addCase(createWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create section";
      });

    // Read Sections
    builder
      .addCase(readWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readWidget.fulfilled, (state, action) => {
        state.loading = false;
        state.widgets = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
        console.log(action.payload.data, "widget dataaa");
      })
      .addCase(readWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch widgets";
      });
    // Read Single Widget
    builder
      .addCase(readSingleWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readSingleWidget.fulfilled, (state, action) => {
        state.loading = false;
        state.singleWidget = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(readSingleWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch widgets";
      });
    // Update Widget
    builder
      .addCase(updateWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWidget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.widgets.findIndex(
          (section) => section.id === action.payload.id
        );
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
      })
      .addCase(updateWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });
    // Delete Widget
    builder
      .addCase(deleteWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWidget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.widgets.findIndex(
          (section) => section.id === action.payload.id
        );
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
      })
      .addCase(deleteWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update section";
      });
  },
});

export const { widgetPayload, resetWidgetPayload } =
  widgetsSlice.actions;
export default widgetsSlice.reducer;
