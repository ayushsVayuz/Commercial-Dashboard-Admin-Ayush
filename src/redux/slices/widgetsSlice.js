import { createSlice } from "@reduxjs/toolkit";
import {
  createWidget,
  readWidget,
  updateWidget,
  deleteWidget,
  readSingleWidget,
  changeStatusWidget,
  updateWidgetCMS,
} from "../actions/widgets-action";

const initialState = {
  widgets: [],
  singleWidget: {},
  payload: {},
  loading: false,
  statusLoading: {},
  error: null,
  isToggleLoading: null,
  totalCount: 0,
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
    clearSingleWidget: (state) => {
      state.singleWidget = {};
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
        state.error = action.payload?.message || "Failed to create widgets";
      });

    // Read widgets
    builder
      .addCase(readWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readWidget.fulfilled, (state, action) => {
        state.loading = false;
        state.widgets = action.payload.data;
        state.totalCount = action.payload.total;
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
        state.totalPages = action.payload.total;
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
          (widgets) => widgets.id === action.payload.id
        );
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
      })
      .addCase(updateWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update widgets";
      });

    builder
      .addCase(updateWidgetCMS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWidgetCMS.fulfilled, (state, action) => {
        state.loading = false;
        // const index = state.widgets.findIndex(
        //   (widgets) => widgets.id === action.payload.id
        // );
        // if (index !== -1) {
        //   state.widgets[index] = action.payload;
        // }
        console.log('updateWidgetCMS.fulfilled - action.payload:', action.payload);
  console.log('Current widgets state:', state.widgets);
  console.log('updateWidgetCMS.fulfilled - action.payload:', action.payload);
  console.log('Widget data from API:', action.payload.data);
  
  const updatedWidget = action.payload.data; // API response ka actual data
  
  const index = state.widgets.findIndex(
    (widget) => widget.widget_id === updatedWidget.widget_id
  );
  
  console.log('Looking for widget_id:', updatedWidget.widget_id);
  console.log('Found index:', index);
  
  if (index !== -1) {
    console.log('Before update:', state.widgets[index]);
    state.widgets[index] = { ...state.widgets[index], ...updatedWidget };
    console.log('After update:', state.widgets[index]);
  } else {
    console.log('Widget not found in current state');
  }
      })
      .addCase(updateWidgetCMS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update widgets";
      });

    // Change status of widgets
    builder
      .addCase(changeStatusWidget.pending, (state, action) => {
        state.statusLoading = action.meta.arg.widgetId;
      })
      .addCase(changeStatusWidget.fulfilled, (state) => {
        state.widgets = state.widgets.map((widgets) =>
          widgets.widget_id === state.statusLoading
            ? { ...widgets, is_active: widgets.is_active === 1 ? 0 : 1 }
            : widgets
        );
        state.statusLoading = {};
      })
      .addCase(changeStatusWidget.rejected, (state, action) => {
        state.statusLoading = {};
        state.error = action.payload?.message || "Failed to update widgets";
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
          (widget) => widget.id === action.payload.id
        );
        if (index !== -1) {
          state.widgets[index] = action.payload;
        }
      })
      .addCase(deleteWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update widgets";
      });
  },
});

export const { widgetPayload, resetWidgetPayload, clearSingleWidget } =
  widgetsSlice.actions;
export default widgetsSlice.reducer;
