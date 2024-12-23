import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter as Router, useRoutes,
  Route
} from "react-router-dom";
import CustomLayout from './Layout/Layout';
import routes from "./routes";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <CustomLayout><Home title="VidyaMargam" /></CustomLayout>,
//   },
//   {
//     path: "/schools",
//     element: <CustomLayout><Schools title="Schools 1" /></CustomLayout>,
//   },
//   {
//     path: "/buses",
//     element: <CustomLayout><BusesListing title="Buses List" /></CustomLayout>,
//   },
//   {
//     path: "/users",
//     element: <CustomLayout><Users title="Customers" /></CustomLayout>,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <RegistrationPage />,
//   },
// ]);
function App() {
  const AppRoutes = () => {
    const element = useRoutes(
      routes.map(route => ({
        path: route.ref,
        element: <CustomLayout><route.component title={route.title} /></CustomLayout>
      }))
    );
    return element;
  };
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
