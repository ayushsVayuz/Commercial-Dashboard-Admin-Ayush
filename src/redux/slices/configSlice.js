import { createSlice } from "@reduxjs/toolkit";
import {
    createDomainConfig,
    fetchDomainConfigs,
    updateDomainConfig,
    updateDomainConfigStatus,
} from "../actions/config-actions";

const initialState = {
    configs: [], // This will hold the domain configs
    loading: false, // For general loading state
    error: null, // To store errors
    isToggleLoading: null, // To handle the status toggle button loading state
    totalPages: 1
};

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        resetConfigState: (state) => {
            state.configs = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create Domain Config
        builder
            .addCase(createDomainConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDomainConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.configs.push(action.payload);
            })
            .addCase(createDomainConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create domain config";
            });

        // Fetch Domain Configs
        builder
            .addCase(fetchDomainConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDomainConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.configs = action.payload.data.data; // Assuming the response structure
                state.totalPages = action.payload.data.totalPages
            })
            .addCase(fetchDomainConfigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch domain configs";
            });

        // Update Domain Config
        builder
            .addCase(updateDomainConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDomainConfig.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.configs.findIndex(
                    (config) => config.id === action.payload.id
                );
                if (index !== -1) {
                    state.configs[index] = action.payload;
                }
            })
            .addCase(updateDomainConfig.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload || "Failed to update domain config";
            });

        // Update Domain Config Status
        builder
            .addCase(updateDomainConfigStatus.pending, (state, action) => {
                state.isToggleLoading = action.meta.arg.domainSpecificConfigId;
                state.error = null;
            })
            .addCase(updateDomainConfigStatus.fulfilled, (state, action) => {
                state.isToggleLoading = null;
                const { domainSpecificConfigId, isActive } = action.payload.data;
                const index = state.configs.findIndex(
                    (config) => config.domainSpecificConfigId === domainSpecificConfigId
                );
                if (index !== -1) {
                    state.configs = state.configs.map((obj, i) => {
                        if (i === index) {
                            return {
                                ...obj,
                                isActive,
                            };
                        } else {
                            return obj;
                        }
                    });
                }
            })
            .addCase(updateDomainConfigStatus.rejected, (state, action) => {
                state.isToggleLoading = null;
                state.error = action.payload?.message || "Failed to update domain config status";
            });
    },
});

export const { resetConfigState } = configSlice.actions;
export default configSlice.reducer;
