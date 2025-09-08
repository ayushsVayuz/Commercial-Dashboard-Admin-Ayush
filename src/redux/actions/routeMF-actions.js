import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; // Assuming you have axios setup here

// Function to get token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Post a new MF Mapping
export const createMFMapping = createAsyncThunk(
  "mf/createMFMapping",
  async (mfMappingData, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.post(
        "/master-settings/mf-mapping",
        mfMappingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "MF Mapping Created");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const fetchMFMappings = createAsyncThunk(
  "mf/fetchMFMappings",
  async (queryArray, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      // Construct the query string from the array of query objects
      const queryString = queryArray
        .map(
          (query) =>
            `${encodeURIComponent(query.field)}=${encodeURIComponent(
              query.value
            )}`
        )
        .join("&");

      const response = await client.get(
        `/master-settings/mf-mapping${queryString ? "?" + queryString : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
// Update MF Mapping by ID
export const updateMFMapping = createAsyncThunk(
  "mf/updateMFMapping",
  async ({ mfMappingId, updatedData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/mf-mapping/${mfMappingId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "MF Mapping Updated");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

// export const updateMFMapping = createAsyncThunk(
//   "mf/updateMFMapping",
//   async ({ mfMappingId, updatedData }, { rejectWithValue, getState }) => {
//     const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

//     try {
//       const response = await fetch(
//         `https://anarock-super-admin.vayuz.com/v1/master-settings/mf-mapping/${mfMappingId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );

//       if (!response.ok) {
//         // Handle HTTP errors
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to update MF Mapping");
//       }

//       const data = await response.json();
//       console.log(data, "MF Mapping Updated");

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Update MF Mapping Status by ID
export const updateMFMappingStatus = createAsyncThunk(
  "mf/updateMFMappingStatus",
  async ({ mfMappingId, statusData }, { rejectWithValue, getState }) => {
    const token = getTokenFromLocalStorage() || getState().auth.token; // Check local storage first

    try {
      const response = await client.put(
        `/master-settings/mf-mapping-status/${mfMappingId}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "MF Mapping Status Updated");

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
