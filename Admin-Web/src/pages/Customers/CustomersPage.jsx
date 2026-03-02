import React, { useState } from "react";
import "./CustomersPage.css";

const dummyCustomers = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    area: "Madhapur",
    pickups: 12,
    scrapSold: 180,
    earnings: 5400,
    status: "Active",
    history: [
      { date: "2026-03-01", scrap: "Metal", weight: "20kg", amount: "₹800" },
      { date: "2026-02-20", scrap: "Plastic", weight: "15kg", amount: "₹450" },
    ],
  },
  {
    id: 2,
    name: "Sneha Reddy",
    phone: "9123456780",
    area: "Kondapur",
    pickups: 8,
    scrapSold: 95,
    earnings: 2800,
    status: "Blocked",
    history: [
      { date: "2026-02-15", scrap: "Paper", weight: "25kg", amount: "₹600" },
    ],
  },
];

export function CustomersPage() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const toggleStatus = (id) => {
    const updated = customers.map(c =>
      c.id === id
        ? { ...c, status: c.status === "Active" ? "Blocked" : "Active" }
        : c
    );
    setCustomers(updated);
  };

  const exportCSV = () => {
    const headers = "Name,Phone,Area,Pickups,Scrap Sold,Earnings,Status\n";
    const rows = customers.map(c =>
      `${c.name},${c.phone},${c.area},${c.pickups},${c.scrapSold},${c.earnings},${c.status}`
    );
    const blob = new Blob([headers + rows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customers.csv";
    link.click();
  };

  return (
    <div className="customers-page">

      <div className="top-bar">
        <h2>Customers</h2>
        <div className="actions">
          <input
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Area</th>
              <th>Pickups</th>
              <th>Scrap Sold (kg)</th>
              <th>Earnings (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.area}</td>
                <td>{c.pickups}</td>
                <td>{c.scrapSold}</td>
                <td>₹{c.earnings}</td>
                <td>
                  <span className={c.status === "Active" ? "active" : "blocked"}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => setSelectedCustomer(c)}>View</button>
                  <button onClick={() => toggleStatus(c.id)}>
                    {c.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* History Modal */}
      {selectedCustomer && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedCustomer.name} - Pickup History</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Scrap</th>
                  <th>Weight</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.history.map((h, index) => (
                  <tr key={index}>
                    <td>{h.date}</td>
                    <td>{h.scrap}</td>
                    <td>{h.weight}</td>
                    <td>{h.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setSelectedCustomer(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}