import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAddPage from "./pages/AdminAddPage";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import AdminEditPage from "./pages/AdminEditPage";
import ClientProvider from "./contexts/ClientProvider";
import BasketPage from "./pages/BasketPage";

function Navigation() {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/admin/edit/:id" element={<AdminEditPage />} />
            <Route path="/basket" element={<BasketPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
}

export default Navigation;
