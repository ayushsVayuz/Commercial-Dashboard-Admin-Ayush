import { configureStore } from "@reduxjs/toolkit";
// import userAuthSlice from "./slices/userAuth-slice";

import themeSlice from "./slices/themeSlice";
import appSlice from "./slices/appSlice";

import authSlice from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";
import sectionSlice from "./slices/sectionSlice";
import widgetsSlice from "./slices/widgetsSlice";
import containersSlice from "./slices/containerSlice";
import communitiesSlice from "./slices/communitiesSlice";
import commonSlice from "./slices/common-slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    theme: themeSlice,
    // auth: userAuthSlice,
    auth: authSlice,
    dashboard: dashboardSlice,
    container: containersSlice,
    section: sectionSlice,
    widget: widgetsSlice,
    communities: communitiesSlice,
    common: commonSlice,
  },
});
