import { configureStore } from "@reduxjs/toolkit";
// import userAuthSlice from "./slices/userAuth-slice";

import themeSlice from "./slices/themeSlice";
import appSlice from "./slices/appSlice";

import authSlice from "./slices/authSlice";
import domainSlice from "./slices/domainSlice";
import mfMappingSlice from "./slices/mfMappingSlice";
import configSlice from "./slices/configSlice";
import masterConfigSlice from "./slices/masterConfigSlice";
import regexSlice from "./slices/regexSlice";
import formSlice from "./slices/formSlice";
import dashboardSlice from "./slices/dashboardSlice";
import helperSlice from "./slices/helperMfSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    theme: themeSlice,
    // auth: userAuthSlice,

    auth: authSlice,
    domain: domainSlice,
    mfMapping: mfMappingSlice,
    config: configSlice,
    masterConfig: masterConfigSlice,
    regex: regexSlice,
    form: formSlice,
    dashboard: dashboardSlice,
    helper: helperSlice,
  },
});
