import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./lib/pages/main/MainPage";
import Designers from "./lib/pages/designers/Designers";
import Tasks from "./lib/pages/tasks/Tasks";
import ErrorPage from "./lib/pages/ErrorPage.js";
import Layout from "./lib/layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./i18n.js";
import "./index.css";
import NotFoundPage from "./lib/layout/lib/404.js";

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
          { path: "*", element: <NotFoundPage></NotFoundPage> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
