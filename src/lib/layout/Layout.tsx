import { Outlet } from "react-router-dom";
import Footer from "./lib/Footer";
import Header from "./lib/Header";

export default function Layout() {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-between gap-2 bg-indigo-50 p-2 text-gray-900 dark:bg-gray-800 dark:text-slate-100">
      <Header />
      <div className="container grow rounded-md bg-white p-4 dark:bg-gray-700">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
