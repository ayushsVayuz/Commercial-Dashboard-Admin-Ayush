import App from "../App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "../components/error";
import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage";
import DomainPage from "../pages/domain/DomainPage";
import { PrimaryLayout } from "../components/layout/primary";
import DomainAddOrEdit from "../pages/domain/DomainAddOrEdit";
import ProtectedRoute from "../pages/protectedRoute";
import DomainViewPage from "../pages/domain/DomainViewPage";
import { Dashboard } from "../pages/dashboard";
import SectionListing from "../pages/section/Listing";
import SectionAddEdit from "../pages/section/AddEdit";
import SectionDetails from "../pages/section/Details";
import SectionPreview from "../pages/section/Preview";

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
                    path: "detail/:id",
                    element: <SectionDetails />,
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
