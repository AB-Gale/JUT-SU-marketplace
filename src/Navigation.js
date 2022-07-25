import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAddPage from "./pages/AdminAddPage";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";

function Navigation() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AdminAddPage />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default Navigation;
