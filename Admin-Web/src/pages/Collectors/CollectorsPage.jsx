import React, { useState } from "react";
import {
  UserPlus,
  Eye,
  Ban,
  CheckCircle,
} from "lucide-react";
import "./CollectorsPage.css";

export function CollectorsPage() {
  const [collectors, setCollectors] = useState([
    {
      id: "COL-001",
      name: "Ravi Kumar",
      phone: "9876543210",
      area: "Downtown",
      pickups: 145,
      rating: 4.6,
      status: "Active",
      wallet: 12500,
    },
    {
      id: "COL-002",
      name: "Amit Sharma",
      phone: "9123456780",
      area: "Uptown",
      pickups: 98,
      rating: 4.2,
      status: "Inactive",
      wallet: 8200,
    },
    {
      id: "COL-003",
      name: "Suresh Patel",
      phone: "9988776655",
      area: "West Zone",
      pickups: 176,
      rating: 4.8,
      status: "Active",
      wallet: 15800,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const toggleStatus = (id) => {
    setCollectors((prev) =>
      prev.map((collector) =>
        collector.id === id
          ? {
              ...collector,
              status:
                collector.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : collector
      )
    );
  };

  const totalCollectors = collectors.length;
  const activeCollectors = collectors.filter(
    (c) => c.status === "Active"
  ).length;
  const inactiveCollectors = totalCollectors - activeCollectors;
  const totalPickups = collectors.reduce(
    (sum, c) => sum + c.pickups,
    0
  );

  return (
    <div className="page">
      <div className="page-header">
        <h2>Collectors</h2>
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          <UserPlus size={16} /> Add Collector
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="card">
          <h4>Total Collectors</h4>
          <p>{totalCollectors}</p>
        </div>
        <div className="card">
          <h4>Active</h4>
          <p>{activeCollectors}</p>
        </div>
        <div className="card">
          <h4>Inactive</h4>
          <p>{inactiveCollectors}</p>
        </div>
        <div className="card">
          <h4>Total Pickups Done</h4>
          <p>{totalPickups}</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Area</th>
              <th>Pickups</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Wallet</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {collectors.map((collector) => (
              <tr key={collector.id}>
                <td>{collector.name}</td>
                <td>{collector.phone}</td>
                <td>{collector.area}</td>
                <td>{collector.pickups}</td>
                <td>⭐ {collector.rating}</td>
                <td>
                  <span
                    className={
                      collector.status === "Active"
                        ? "badge active"
                        : "badge inactive"
                    }
                  >
                    {collector.status}
                  </span>
                </td>
                <td>₹{collector.wallet}</td>
                <td className="actions">
                  <Eye
                    size={16}
                    onClick={() =>
                      alert("View Performance Coming Soon")
                    }
                  />
                  <Ban
                    size={16}
                    onClick={() =>
                      toggleStatus(collector.id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Collector</h3>
            <input placeholder="Full Name" />
            <input placeholder="Phone Number" />
            <input placeholder="Assigned Area" />
            <button
              className="primary-btn"
              onClick={() => setShowModal(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}