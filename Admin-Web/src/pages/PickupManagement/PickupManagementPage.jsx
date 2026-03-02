import React, { useState } from "react";
import "./PickupManagementPage.css";

const collectorsList = ["Imran", "Suresh", "Ramesh", "Akash"];

const initialData = [
  {
    id: "PK1001",
    name: "Ravi Kumar",
    address: "Madhapur",
    scrap: "Metal",
    collector: "",
    date: "2026-03-05",
    status: "Pending",
  },
  {
    id: "PK1002",
    name: "Sneha Reddy",
    address: "Kondapur",
    scrap: "E-Waste",
    collector: "Imran",
    date: "2026-03-04",
    status: "Assigned",
  },
  {
    id: "PK1003",
    name: "Arjun Rao",
    address: "Gachibowli",
    scrap: "Plastic",
    collector: "Suresh",
    date: "2026-03-03",
    status: "Completed",
  },
];

export function PickupManagementPage() {
  const [pickups, setPickups] = useState(initialData);
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedCollector, setSelectedCollector] = useState("");

  const filteredData = pickups.filter(p => p.status === activeTab);

  const assignCollector = () => {
    const updated = pickups.map(p =>
      p.id === selectedPickup.id
        ? { ...p, collector: selectedCollector, status: "Assigned" }
        : p
    );
    setPickups(updated);
    setSelectedPickup(null);
    setSelectedCollector("");
  };

  const changeStatus = (id, newStatus) => {
    const updated = pickups.map(p =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPickups(updated);
  };

  const reschedule = (id, newDate) => {
    const updated = pickups.map(p =>
      p.id === id ? { ...p, date: newDate } : p
    );
    setPickups(updated);
  };

  return (
    <div className="pickup-page">

      {/* Tabs */}
      <div className="tabs">
        {["Pending", "Assigned", "Completed", "Cancelled"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Scrap</th>
              <th>Collector</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td>{p.scrap}</td>
                <td>{p.collector || "-"}</td>
                <td>{p.date}</td>
                <td>{p.status}</td>
                <td>

                  {p.status === "Pending" && (
                    <>
                      <button onClick={() => setSelectedPickup(p)}>Assign</button>
                      <button onClick={() => changeStatus(p.id, "Cancelled")}>
                        Cancel
                      </button>
                    </>
                  )}

                  {p.status === "Assigned" && (
                    <>
                      <button onClick={() => changeStatus(p.id, "Completed")}>
                        Complete
                      </button>
                      <input
                        type="date"
                        onChange={(e) => reschedule(p.id, e.target.value)}
                      />
                      <button onClick={() => changeStatus(p.id, "Cancelled")}>
                        Cancel
                      </button>
                    </>
                  )}

                  {p.status === "Completed" && <span>✔ Done</span>}
                  {p.status === "Cancelled" && <span>✖ Cancelled</span>}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Popup */}
      {selectedPickup && (
        <div className="modal">
          <div className="modal-content">
            <h3>Assign Collector</h3>
            <select
              value={selectedCollector}
              onChange={(e) => setSelectedCollector(e.target.value)}
            >
              <option value="">Select Collector</option>
              {collectorsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={assignCollector}>Confirm</button>
              <button onClick={() => setSelectedPickup(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}