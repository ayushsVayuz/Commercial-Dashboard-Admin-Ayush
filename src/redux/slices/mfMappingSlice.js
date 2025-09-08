import { createSlice } from "@reduxjs/toolkit";
import { createMFMapping, fetchMFMappings, updateMFMapping, updateMFMappingStatus } from "../actions/routeMF-actions";


const initialState = {
    mfMappings: [],
    loading: false,
    error: null,
    isToggleLoading: null,
    totalPages: 1
};

const mfMappingSlice = createSlice({
    name: "mfMapping",
    initialState,
    reducers: {
        resetMFMappingState: (state) => {
            state.mfMappings = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create MF Mapping
        builder
            .addCase(createMFMapping.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMFMapping.fulfilled, (state, action) => {
                state.loading = false;
                state.mfMappings.push(action.payload);
            })
            .addCase(createMFMapping.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create MF mapping";
            });

        // Fetch MF Mappings
        builder
            .addCase(fetchMFMappings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMFMappings.fulfilled, (state, action) => {
                state.loading = false;
                state.mfMappings = action.payload.data.data;
            })
            .addCase(fetchMFMappings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch MF mappings";
            });

        // Update MF Mapping
        builder
            .addCase(updateMFMapping.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMFMapping.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.mfMappings.findIndex(
                    (mfMapping) => mfMapping.id === action.payload.id
                );
                if (index !== -1) {
                    state.mfMappings[index] = action.payload;
                }
            })
            .addCase(updateMFMapping.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update MF mapping";
            });

        // Update MF Mapping Status
        builder
            .addCase(updateMFMappingStatus.pending, (state, action) => {
                state.isToggleLoading = action.meta.arg.mfMappingId;
                state.error = null;
            })
            .addCase(updateMFMappingStatus.fulfilled, (state, action) => {
                state.isToggleLoading = null;
                const { routeMicroFrontendMappingId, isActive } = action.payload.data;
                const index = state.mfMappings.findIndex(
                    (mfMapping) => mfMapping.routeMicroFrontendMappingId === routeMicroFrontendMappingId
                );
                if (index !== -1) {
                    state.mfMappings = state.mfMappings.map((obj, i) =>
                        i === index ? { ...obj, isActive } : obj
                    );
                }
            })
            .addCase(updateMFMappingStatus.rejected, (state, action) => {
                state.isToggleLoading = null;
                state.error = action.payload?.message || "Failed to update MF mapping status";
            });
    },
});

export const { resetMFMappingState } = mfMappingSlice.actions;
export default mfMappingSlice.reducer;
