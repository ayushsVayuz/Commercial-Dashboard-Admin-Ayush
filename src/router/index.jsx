import App from "../App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "../components/error";
import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage";
import { PrimaryLayout } from "../components/layout/primary";
import ProtectedRoute from "./protectedRoute";
// import Dashboard from "../pages/dashboard-old";
import Dashboard from "../pages/dashboard";
import SectionListing from "../pages/section/Listing";
import SectionAddEdit from "../pages/section/AddEdit";
import SectionDetails from "../pages/section/Details";
import SectionPreview from "../pages/section/Preview";
import WidgetsListing from "../pages/widgets/Listing";
import WidgetDetails from "../pages/widgets/Details";
import WidgetPreview from "../pages/widgets/Preview";
import WidgetAddEdit from "../pages/widgets/AddEdit";
import WidgetCMSAddEdit from "../pages/widget-cms/AddEdit";
import ContainersListing from "../pages/containers/Listing";
import ContainerAddEdit from "../pages/containers/AddEdit";
import ContainerPreview from "../pages/containers/Preview";
import ContainerDetails from "../pages/containers/Details";
import CommunitiesListing from "../pages/communities/Listing";

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
        // Protection has been removed as no api for login
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <PrimaryLayout />,
            children: [
              {
                path: "/",
                element: <Dashboard />,
              },
              {
                path: "home",
                element: <Dashboard />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },

              // Section Routes
              {
                path: "section",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SectionListing />,
                  },
                  {
                    path: "add",
                    element: <SectionAddEdit />,
                  },
                  {
                    path: "edit/:id",
                    element: <SectionAddEdit />,
                  },
                  {
                    path: "preview",
                    element: <SectionPreview />,
                  },
                  {
                    path: "preview/:id",
                    element: <SectionPreview />,
                  },
                  {
                    path: "view/:id",
                    element: <SectionDetails />,
                  },
                ],
              },
              // Communities Routes
              {
                path: "communities",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <CommunitiesListing />,
                  },
                ],
              },
              // Widgets Routes
              {
                path: "widget",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <WidgetsListing />,
                  },
                  {
                    path: "cms",
                    element: <WidgetCMSAddEdit />,
                  },
                  {
                    path: "cms/:id",
                    element: <WidgetCMSAddEdit />,
                  },
                  {
                    path: "add",
                    element: <WidgetAddEdit />,
                  },
                  {
                    path: "edit/:id",
                    element: <WidgetAddEdit />,
                  },
                  {
                    path: "preview",
                    element: <WidgetPreview />,
                  },
                  {
                    path: "preview/:id",
                    element: <WidgetPreview />,
                  },
                  {
                    path: "view/:id",
                    element: <WidgetDetails />,
                  },
                ],
              },
              //

              {
                path: "containers",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <ContainersListing />,
                  },

                  {
                    path: "add",
                    element: <ContainerAddEdit />,
                  },
                  {
                    path: "edit/:id",
                    element: <ContainerAddEdit />,
                  },
                  {
                    path: "preview",
                    element: <ContainerPreview />,
                  },
                  {
                    path: "preview/:id",
                    element: <ContainerPreview />,
                  },
                  {
                    path: "view/:id",
                    element: <ContainerDetails />,
                  },
                ],
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
