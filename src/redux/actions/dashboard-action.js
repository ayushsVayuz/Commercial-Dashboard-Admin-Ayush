import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { getAuthToken, handleError } from "../../utils";
import { decryptResponse } from "../../utils/decryption";
import { encryptPayload } from "../../utils/encryption";

export const fetchDashboardDetails = createAsyncThunk(
  "dashboard/fetchDashboardDetails",
  async ({ userId, communityId }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);

    try {
      const response = await client.get(
        `/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details?fromAdmin=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await decryptResponse(response?.data);

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
      return handleError(error, rejectWithValue);
    }
  }
);

export const updateSectionOrder = createAsyncThunk(
  "dashboard/updateSectionOrder",
  async ({ sections }, { rejectWithValue, getState }) => {
    const token = getAuthToken(getState);
    const encryptedData = await encryptPayload({ sections: sections });

    try {
      const response = await client.put(
        `/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/save`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const decryptedData = await decryptResponse(response.data);

      return decryptedData;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
