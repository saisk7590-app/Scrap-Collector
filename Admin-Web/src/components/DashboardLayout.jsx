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
  UserCheck,
  Headphones,
} from "lucide-react";

import "./DashboardLayout.css";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/pickups", icon: Truck, label: "Pickup Management" },
  { path: "/customers", icon: Users, label: "Customers" },
  { path: "/collectors", icon: UserCheck, label: "Collectors" },
  { path: "/scrap-management", icon: Recycle, label: "Scrap Management" },
  { path: "/payments", icon: Wallet, label: "Payments" },
  { path: "/reports", icon: FileText, label: "Reports" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/support", icon: Headphones, label: "Support" },
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

        <header className="topbar">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input className="search" placeholder="Search..." />
          </div>

          <div className="admin-info">
            <div className="notification">
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </div>

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