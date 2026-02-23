import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import ComingSoonPage from "./pages/ComingSoon/ComingSoonPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Layout */}
        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pickups" element={<ComingSoonPage title="Pickup Management" />} />
          <Route path="customers" element={<ComingSoonPage title="Customers" />} />
          <Route path="collectors" element={<ComingSoonPage title="Collectors" />} />
          <Route path="scrap-management" element={<ComingSoonPage title="Scrap Management" />} />
          <Route path="payments" element={<ComingSoonPage title="Payments" />} />
          <Route path="reports" element={<ComingSoonPage title="Reports" />} />
          <Route path="notifications" element={<ComingSoonPage title="Notifications" />} />
          <Route path="support" element={<ComingSoonPage title="Support" />} />
          <Route path="settings" element={<ComingSoonPage title="Settings" />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}