import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter as Router,
  useRoutes,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import routes from "./routes";
import useStorage from "./hooks/useStorage";
import DashboardLayout from "./Layout/Layout";
import LoginPage from "./pages/Auth/Login";
import RegistrationPage from "./pages/Auth/Registration";

const App: React.FC = () => {
  const { cookies } = useStorage();
  const AppRoutes = () => {
    const element = useRoutes(
      cookies.token
        ? routes.map((route) => ({
            path: route.ref,
            element: (
              <DashboardLayout>
                <route.component title={route.title} />
              </DashboardLayout>
            ),
          }))
        : [
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegistrationPage />,
            },
            {
              path: "*",
              element: <Navigate to="/login" replace />,
            },
          ]
    );
    return element;
  };
  return (
    <>
      <MantineProvider>
        <Router>
          <AppRoutes />
        </Router>
      </MantineProvider>
      {/* <RouterProvider router={router} /> */}
    </>
  );
};

export default App;
