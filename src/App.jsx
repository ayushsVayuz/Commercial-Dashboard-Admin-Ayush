import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Outlet, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "./components/tooltip";
import { Settings } from "./components/settings";
import { ThemeProvider } from "./components/theme";
import { OnlineStatus } from "./components/onlineStatus";
import { ScrollToTopButton } from "./components/scrollToTop";

import React from "react";
import ReactDOM from "react-dom/client";

// Chart.js v4+
// import * as ChartJs from "chart.js";
// import { Chart as ReactChart } from "react-chartjs-2";

// MUI + Icons
// import * as MaterialUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

// Emotion
// import * as EmotionReact from "@emotion/react";
// import * as EmotionStyled from "@emotion/styled";

// React Grid Layout
import * as ReactGridLayout from "react-grid-layout";

function App() {
  // Expose globals for MF bundle
  window.React = React;
  window.ReactDOM = ReactDOM;
  // window.ChartJs = ChartJs;
  // window.ReactChartJs2 = { Chart: ReactChart };
  // window.MaterialUI = MaterialUI;
  // window.EmotionReact = EmotionReact;
  // window.EmotionStyled = EmotionStyled;
  window.MuiIcons = MuiIcons;
  window.ReactGridLayout = ReactGridLayout;
  window.WidthProvider = ReactGridLayout.WidthProvider;
  window.Responsive = ReactGridLayout.Responsive;
  window.process = { env: {} };

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
