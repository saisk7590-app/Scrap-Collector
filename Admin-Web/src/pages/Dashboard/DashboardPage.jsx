import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./DashboardPage.css";

/* ================= DUMMY DATA ================= */

const revenueData = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 18000 },
  { day: "Wed", revenue: 15000 },
  { day: "Thu", revenue: 22000 },
  { day: "Fri", revenue: 17000 },
  { day: "Sat", revenue: 25000 },
  { day: "Sun", revenue: 20000 },
];

const pickupData = [
  { day: "Mon", pickups: 12 },
  { day: "Tue", pickups: 18 },
  { day: "Wed", pickups: 14 },
  { day: "Thu", pickups: 22 },
  { day: "Fri", pickups: 17 },
  { day: "Sat", pickups: 28 },
  { day: "Sun", pickups: 20 },
];

const recentPickups = [
  { name: "Ravi Kumar", area: "Madhapur", scrap: "Metal", status: "Pending" },
  { name: "Sneha Reddy", area: "Kondapur", scrap: "E-Waste", status: "Assigned" },
  { name: "Arjun Rao", area: "Gachibowli", scrap: "Plastic", status: "Completed" },
  { name: "Fatima Khan", area: "Banjara Hills", scrap: "Paper", status: "Pending" },
];

const recentPayments = [
  { id: "PK1001", amount: "₹1,200", mode: "UPI" },
  { id: "PK1002", amount: "₹850", mode: "Cash" },
  { id: "PK1003", amount: "₹2,400", mode: "Wallet" },
];

const recentAssignments = [
  { pickup: "PK1001", collector: "Imran" },
  { pickup: "PK1002", collector: "Suresh" },
  { pickup: "PK1003", collector: "Ramesh" },
];

export function DashboardPage() {
  return (
    <div className="dashboard">

      {/* ================= TOP CARDS ================= */}

      <div className="card-grid">

        <div className="stat-card">
          <h4>Today’s Pickups</h4>
          <h2>24</h2>
          <p>18 Completed • 6 Pending</p>
        </div>

        <div className="stat-card">
          <h4>Total Revenue</h4>
          <h2>₹2,35,000</h2>
          <p>₹12,500 Today</p>
        </div>

        <div className="stat-card">
          <h4>Active Collectors</h4>
          <h2>9</h2>
          <p>12 Total</p>
        </div>

        <div className="stat-card">
          <h4>Pending Pickups</h4>
          <h2>6</h2>
          <p>2 Overdue</p>
        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="chart-grid">

        <div className="chart-card">
          <h3>Revenue – Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Pickup Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pickupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pickups" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="activity-grid">

        {/* Recent Pickups */}
        <div className="activity-card">
          <h3>Latest Pickup Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Scrap</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPickups.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.area}</td>
                  <td>{item.scrap}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Payments */}
        <div className="activity-card">
          <h3>Recent Payments</h3>
          <table>
            <thead>
              <tr>
                <th>Pickup ID</th>
                <th>Amount</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.amount}</td>
                  <td>{item.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Collector Assignments */}
        <div className="activity-card">
          <h3>Recent Assignments</h3>
          <table>
            <thead>
              <tr>
                <th>Pickup ID</th>
                <th>Collector</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((item, index) => (
                <tr key={index}>
                  <td>{item.pickup}</td>
                  <td>{item.collector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}