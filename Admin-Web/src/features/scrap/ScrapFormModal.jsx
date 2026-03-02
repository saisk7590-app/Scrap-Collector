import { useState } from "react";

export function ScrapFormModal({ onClose, onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [unit, setUnit] = useState(initialData?.unit || "kg");

  const handleSave = () => {
    if (!name || price === "" || !unit) {
      alert("Enter name, price and unit");
      return;
    }

    onSubmit({
      name,
      price: Number(price),
      unit,
    });

    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: 20 }}>
          {initialData ? "Edit Item" : "Add Item"}
        </h3>

        {/* Item Name */}
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        {/* Unit Dropdown */}
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ width: "100%", marginBottom: 20, padding: 8 }}
        >
          <option value="kg">Kilogram (kg)</option>
          <option value="pcs">Piece (pcs)</option>
          <option value="unit">Unit</option>
          <option value="ton">Ton</option>
        </select>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleSave}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "6px 14px",
              border: "none",
              borderRadius: 6,
            }}
          >
            {initialData ? "Update" : "Add"}
          </button>

          <button
            onClick={onClose}
            style={{
              background: "#e5e7eb",
              padding: "6px 14px",
              border: "none",
              borderRadius: 6,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: 20,
  width: 350,
  borderRadius: 10,
};