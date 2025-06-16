import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";

import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddCarPage from "../pages/AddCar";
import MyCars from "../pages/MyCars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "/add-car",
        element: <AddCarPage />,
      },
            {
        path: "/my-cars",
        element: <MyCars />,
      },
    ],
  },
]);

export default router;
