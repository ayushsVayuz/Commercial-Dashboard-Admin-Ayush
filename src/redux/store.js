import { configureStore } from "@reduxjs/toolkit";
// import userAuthSlice from "./slices/userAuth-slice";

import themeSlice from "./slices/themeSlice";
import appSlice from "./slices/appSlice";

import authSlice from "./slices/authSlice";
import domainSlice from "./slices/domainSlice";
import dashboardSlice from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    theme: themeSlice,
    // auth: userAuthSlice,
    auth: authSlice,
    domain: domainSlice,
    dashboard: dashboardSlice,
  },
});
