import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "./components/tooltip";
import { Settings } from "./components/settings";
import { ThemeProvider } from "./components/theme";
import { OnlineStatus } from "./components/onlineStatus";
import { ScrollToTopButton } from "./components/scrollToTop";

import React from "react";
import * as MaterialUI from "@mui/material";
import ReactDOM from "react-dom";
import * as EmotionReact from "@emotion/react";
import * as EmotionStyled from "@emotion/styled";
import * as MuiIcons from "@mui/icons-material";
import * as ReactRouterDOM from "react-router-dom";
import * as ReactHotToast from "react-hot-toast";

function App() {
  window.EmotionReact = EmotionReact;
  window.EmotionStyled = EmotionStyled;
  window.MuiIcons = MuiIcons;
  window.process = { env: {} };
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.MaterialUI = MaterialUI;
  window.ReactRouterDOM = ReactRouterDOM;
  window.ReactHotToast = ReactHotToast;
  
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <Outlet />
          <Tooltip id="my-tooltip" />
          <ScrollToTopButton />
          <Toaster />
          <Settings />
          <OnlineStatus />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
