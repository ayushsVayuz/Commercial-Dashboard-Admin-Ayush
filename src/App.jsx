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


function App() {

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
