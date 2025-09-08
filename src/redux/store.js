import { configureStore } from "@reduxjs/toolkit";
// import userAuthSlice from "./slices/userAuth-slice";

import themeSlice from "./slices/themeSlice";
import appSlice from "./slices/appSlice";

import authSlice from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";
import domainSlice from "./slices/domainSlice";
import sectionSlice from "./slices/sectionSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    theme: themeSlice,
    // auth: userAuthSlice,
    auth: authSlice,
    dashboard: dashboardSlice,
    domain: domainSlice,
    section: sectionSlice,
  },
});
