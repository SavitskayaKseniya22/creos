import { Outlet } from "react-router-dom";
import Footer from "./lib/Footer";
import Header from "./lib/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
