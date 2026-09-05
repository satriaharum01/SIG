import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import BasicTables from "../pages/tables/BasicTables";
import Forms from "../pages/forms/Forms";
import Buttons from "../pages/buttons/Buttons";
import Blank from "../pages/blank/Blank";
import Login from "../pages/login/Login";
import Logout from "../pages/login/Logout";
import Error404 from "../pages/error/Error404";

//Transaksi
import Transaksi from "../pages/transaksi/Index";

import type { JSX } from "react/jsx-runtime";

function PrivateRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/transaksi" element={
            <PrivateRoute>
              <Transaksi />
            </PrivateRoute>} />

          <Route path="/tables" element={<BasicTables />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/blank" element={<Blank />} />
        </Route>
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
