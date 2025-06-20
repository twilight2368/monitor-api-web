import MainLayout from "@/layouts/MainLayout";
import NotFoundPage from "@/pages/NotFound";
import ServiceManagementPage from "@/pages/ServiceManagement";
import StatusManagementPage from "@/pages/StatusManagement";
import React from "react";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<StatusManagementPage />} />
        <Route path="services" element={<ServiceManagementPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
