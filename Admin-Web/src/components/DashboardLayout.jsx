import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Truck,
  Recycle,
  Wallet,
  Bell,
  FileText,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

import "./DashboardLayout.css";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/users", icon: Users, label: "User Management" },
  { path: "/pickup-requests", icon: Truck, label: "Pickup Requests" },
  { path: "/scrap-categories", icon: Recycle, label: "Scrap Categories & Pricing" },
  { path: "/wallet-payments", icon: Wallet, label: "Wallet & Payments" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/reports", icon: FileText, label: "Reports & Analytics" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-top">
          <div className="logo-row">
            <Recycle size={22} />
            <h2 className="logo">Scrap Collector</h2>
          </div>
          <p className="subtitle">Admin Dashboard</p>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="logout-wrapper">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Area */}
      <div className="main-area">

        {/* Topbar */}
        <header className="topbar">

          {/* Search */}
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input className="search" placeholder="Search..." />
          </div>

          <div className="admin-info">

            {/* Notification */}
            <div className="notification">
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </div>

            {/* Avatar */}
            <div className="avatar">AD</div>

            <div className="admin-details">
              <p className="admin-name">Admin User</p>
              <p className="admin-email">admin@scrap.com</p>
            </div>

          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
