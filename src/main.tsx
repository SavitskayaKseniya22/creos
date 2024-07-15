import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./lib/pages/main/MainPage";
import Designers from "./lib/pages/designers/Designers";
import Tasks from "./lib/pages/tasks/Tasks";
import ErrorPage from "./lib/pages/Error";
import Layout from "./lib/layout/Layout";
import "./i18n.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MainPage /> },
          {
            path: "designers",
            element: <Designers></Designers>,
          },
          {
            path: "tasks",
            element: <Tasks></Tasks>,
          },
          { path: "*", element: <>404</> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
