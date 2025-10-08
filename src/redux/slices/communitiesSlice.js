import { createSlice } from "@reduxjs/toolkit";
import {
  readCommunities,
  changeStatusCommunity,
  mapCommunities,
} from "../actions/communities-action";

const initialState = {
  communities: [],
  loading: false,
  statusLoading: {},
  error: null,
  totalCount: 0,
};

const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Read Sections
    builder
      .addCase(readCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(readCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch communities";
      });

    // Change status of community
    builder
      .addCase(changeStatusCommunity.pending, (state, action) => {
        state.statusLoading = action.meta.arg.communityId;
      })
      .addCase(changeStatusCommunity.fulfilled, (state, action) => {
        console.log(action.payload, "aaaaaaa");
        const { statusCode } = action.payload;

        if (statusCode === 200 || statusCode === 201) {
          const communityIndex = state.communities.findIndex(
            (community) => community.id === state.statusLoading
          );

          if (communityIndex !== -1) {
            state.communities[communityIndex] = {
              ...state.communities[communityIndex],
              status: state.communities[communityIndex].status === 1 ? 0 : 1,
            };
          }
        }

        state.statusLoading = {};
        state.error = null;
      })
      .addCase(changeStatusCommunity.rejected, (state, action) => {
        state.statusLoading = {};
        state.error = action.payload?.message || "Failed to update community";
      });
    builder
      .addCase(mapCommunities.pending, (state, action) => {
        // Track all communities being updated
        state.statusLoading = action.meta.arg.communityIds;
      })
      .addCase(mapCommunities.fulfilled, (state, action) => {
        const { statusCode, data } = action.payload;

        if (statusCode === 200 || statusCode === 201) {
          const updatedIds = data.map((community) => community.community_id);
          state.communities = state.communities.filter(
            (community) => !updatedIds.includes(community.id)
          );
        }

        state.statusLoading = [];
        state.error = null;
      })
      .addCase(mapCommunities.rejected, (state, action) => {
        state.statusLoading = [];
        state.error = action.payload?.message || "Failed to update community";
      });
  },
});

export const {} = communitiesSlice.actions;
export default communitiesSlice.reducer;
