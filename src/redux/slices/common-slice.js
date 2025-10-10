import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "../actions/common-action";

const initialState = {
  roles: [],
  rolesLoading: false,
  statusRolesLoading: {},
  error: null,
  totalCount: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all roles
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.rolesLoading = true;
        state.error = null;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.roles = action.payload.data;
        }
        state.totalCount = action.payload.total;
        state.rolesLoading = false;
        state.error = null;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.rolesLoading = false;
        state.error = action.payload?.message || "Failed to fetch roles";
      });
  },
});

export default commonSlice.reducer;
