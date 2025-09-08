import { createSlice } from "@reduxjs/toolkit";
import {
  addFormData,
  fetchActiveFormListing,
  fetchAllFormListing,
  fetchDomainSpecificForm,
  fetchMasterForm,
  updateMasterFormStatus,
} from "../actions/form-action";

const initialState = {
  activeFormListing: [],
  allFormListing: [],
  domainSpecificListing: [],
  masterForm: null,
  loading: false,
  isToggleLoading: false,
  error: null,
  totalPages: 1,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  extraReducers: (builder) => {
    // add form listing data
    builder
      .addCase(addFormData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.allFormListing.push(action.payload);
      })
      .addCase(addFormData.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload;
      });

    //   fetch form Listing

    builder
      .addCase(fetchAllFormListing.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting a new fetch
      })
      .addCase(fetchAllFormListing.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload.data.data);
        // console.log(action.payload.data.totalPages);
        state.totalPages = action.payload.data.totalPages;
        state.allFormListing = action.payload.data.data; // Assign fetched data to formData
      })
      .addCase(fetchAllFormListing.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "error in fetching all master form"; // Assuming payload contains the error message
      });

    builder
      .addCase(fetchActiveFormListing.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting a new fetch
      })
      .addCase(fetchActiveFormListing.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.totalPages = action.payload.data.totalPages;
        state.activeFormListing = action.payload.data.data; // Assign fetched data to formData
      })
      .addCase(fetchActiveFormListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming payload contains the error message
      });

    // fetch master form

    builder
      .addCase(fetchMasterForm.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting a new fetch
      })
      .addCase(fetchMasterForm.fulfilled, (state, action) => {
        state.loading = false;
        state.masterForm = action.payload.data.data; // Assign fetched data to formData
      })
      .addCase(fetchMasterForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming payload contains the error message
      });

    builder
      .addCase(updateMasterFormStatus.pending, (state, action) => {
        console.log(action.meta.arg);
        state.isToggleLoading = action.meta.arg.mfMappingId;
        state.error = null;
      })
      .addCase(updateMasterFormStatus.fulfilled, (state, action) => {
        state.isToggleLoading = null;
        const { masterFormId, isActive } = action.payload.data;
        const index = state.allFormListing.findIndex(
          (formData) => formData.masterFormId === masterFormId
        );
        if (index !== -1) {
          state.allFormListing = state.allFormListing.map((obj, i) =>
            i === index ? { ...obj, isActive } : obj
          );
        }
      })
      .addCase(updateMasterFormStatus.rejected, (state, action) => {
        state.isToggleLoading = null;
        state.error =
          action.payload?.message || "Failed to update MF mapping status";
      });

    builder
      .addCase(fetchDomainSpecificForm.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting a new fetch
      })
      .addCase(fetchDomainSpecificForm.fulfilled, (state, action) => {
        state.loading = false;
        state.domainSpecificListing = action.payload.data.data; // Assign fetched data to formData
      })
      .addCase(fetchDomainSpecificForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming payload contains the error message
      });
  },
});

export const { setPin } = formSlice.actions;

export default formSlice.reducer;
