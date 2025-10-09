import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken } from "../../utils";

export const fetchDashboardDetails = createAsyncThunk(
  "dashboard/fetchDashboardDetails",
  async ({ userId, communityId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.get(
        `/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details?user_id=${userId}&community_id=${communityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response?.data;

      if (result?.statusCode !== 200) {
        return rejectWithValue(result?.message || "Failed to fetch dashboard");
      }

      const apiSections =
        result.data.sections?.map((s, idx) => ({
          section_id: s.id,
          name: s.name,
          order_index: s.order_index ?? idx,
          widgets:
            s.widgets?.map((w) => ({
              widget_id: w.widget_id,
              widget_name: w.widget_id,
              container_id: w.container_id,
              is_active: w.is_active,
              position: w.position || [0, 0, 4, 2],
            })) || [],
        })) || [];

      return apiSections;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  }
);
