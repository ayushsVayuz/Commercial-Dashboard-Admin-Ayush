import App from "../App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "../components/error";
import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage";
import DomainPage from "../pages/domain/DomainPage";
import MasterConfigPage from "../pages/masterConfig/MasterConfigPage";
import ConfigPage from "../pages/config/ConfigPage";
import RouteMFPage from "../pages/routeMF/RouteMFPage";
import RegexPage from "../pages/regex/RegexPage";
import { PrimaryLayout } from "../components/layout/primary";
import DomainAddOrEdit from "../pages/domain/DomainAddOrEdit";
import MasterConfigAddOrEdit from "../pages/masterConfig/MasterConfigAddOrEdit";
import ConfigAddOrEdit from "../pages/config/ConfigAddOrEdit";
import RegexAddOrEdit from "../pages/regex/RegexAddOrEdit";
import RouteMFAddOrEdit from "../pages/routeMF/RouteMFAddOrEdit";
import ProtectedRoute from "../pages/protectedRoute";
import DomainViewPage from "../pages/domain/DomainViewPage";
import MasterConfigViewPage from "../pages/masterConfig/MasterConfigViewPage";
import RouteMFViewPage from "../pages/routeMF/RouteMFViewPage";
import ConfigViewPage from "../pages/config/ConfigViewPage";
import FormsListing from "../pages/forms/listing";
import FormCreateOrEdit from "../pages/forms/createOrEdit";
import FormMapping from "../pages/forms/mapping";
import { Dashboard } from "../pages/dashboard";
import HelperMfListing from "../pages/helperMf/HelperMfListing";
import HelperAddOrEdit from "../pages/helperMf/helperAddOrEdit";
import RegexDetail from "../pages/regex/regexDetail";
import HelperMFViewPage from "../pages/helperMf/helperMFView";
import MasterFormViewPage from "../pages/forms/view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <PrimaryLayout />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "home",
                element: <HomePage />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              // Domain Routes
              {
                path: "domain",
                element: <DomainPage />,
              },
              {
                path: "domain/add",
                element: <DomainAddOrEdit />,
              },
              {
                path: "domain/edit/:id",
                element: <DomainAddOrEdit />,
              },
              {
                path: "domain/view/:id",
                element: <DomainViewPage />,
              },
              {
                path: "domain-detail/:id",
                element: <DomainViewPage />,
              },

              // form Routes
              {
                path: "form",
                element: <FormsListing />,
              },
              {
                path: "form/add",
                element: <FormCreateOrEdit />,
              },
              {
                path: "form/edit/:id",
                element: <FormCreateOrEdit />,
              },
              {
                path: "form-detail/:id",
                element: <MasterFormViewPage />,
              },

              {
                path: "form/formMapping/:id",
                element: <FormMapping />,
              },

              // MasterConfig Routes

              {
                path: "masterConfig",
                element: <MasterConfigPage />,
              },
              {
                path: "masterConfig/add",
                element: <MasterConfigAddOrEdit />,
              },
              {
                path: "masterConfig/edit/:id",
                element: <MasterConfigAddOrEdit />,
              },

              {
                path: "masterConfig-detail/:id",
                element: <MasterConfigViewPage />,
              },
              // Config Routes
              {
                path: "config",
                element: <ConfigPage />,
              },
              {
                path: "config/add",
                element: <ConfigAddOrEdit />,
              },
              {
                path: "config/edit/:id",
                element: <ConfigAddOrEdit />,
              },
              {
                path: "config-detail/:id",
                element: <ConfigViewPage />,
              },
              // Regex Routes
              {
                path: "regex",
                element: <RegexPage />,
              },
              {
                path: "regex/add",
                element: <RegexAddOrEdit />,
              },
              {
                path: "regex/edit/:id",
                element: <RegexAddOrEdit />,
              },
              {
                path: "regex-detail/:id",
                element: <RegexDetail />,
              },
              // RouteMF Routes
              {
                path: "routeMF",
                element: <RouteMFPage />,
              },
              {
                path: "routeMF/add",
                element: <RouteMFAddOrEdit />,
              },
              {
                path: "routeMF/edit/:id",
                element: <RouteMFAddOrEdit />,
              },
              {
                path: "routeMF-detail/:id",
                element: <RouteMFViewPage />,
              },
              // helper Mf routes

              {
                path: "helper",
                element: <HelperMfListing />,
              },
              {
                path: "helper/add",
                element: <HelperAddOrEdit />,
              },
              {
                path: "helper/edit/:id",
                element: <HelperAddOrEdit />,
              },
              {
                path: "helper-detail/:id",
                element: <HelperMFViewPage />,
              },

              // Catch-all for undefined routes
              {
                path: "*",
                element: <ErrorComponent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const RouterConfigration = () => {
  return <RouterProvider router={router} />;
};
