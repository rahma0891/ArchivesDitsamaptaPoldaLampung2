import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Layout from "./components/Layout";
import ArsipMasuk from "./page/ArsipMasuk";
import ArsipKeluar from "./page/ArsipKeluar";
import UserProfile from "./page/UserProfile";
import UbahPassword from "./page/UbahPassword";
import Pengarsipan from "./page/Pengarsipan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/arsip",
    element: <Pengarsipan />,
  },
  {
    path: "/dashboard/statistic",
    element: <Layout> <Dashboard /></Layout>,
  },
  {
    path: "/dashboard/arsipmasuk",
    element: <Layout> <ArsipMasuk /></Layout>,
  },
  {
    path: "/dashboard/arsipkeluar",
    element: <Layout> <ArsipKeluar /></Layout>,
  },
  {
    path: "/dashboard/profile",
    element: <Layout> <UserProfile /></Layout>,
  },
  {
    path: "/dashboard/ubahPassword",
    element: <Layout> <UbahPassword /></Layout>,
  },
]);
