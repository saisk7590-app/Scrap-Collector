import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ScrapFormModal } from "../../features/scrap/ScrapFormModal";

export function ScrapItemsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Newspaper",
      categoryId: 1,
      unit: "kg",
      price: 18,
      status: "active",
    },
    {
      id: 2,
      name: "Battery",
      categoryId: 1,
      unit: "pcs",
      price: 250,
      status: "active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredItems = items.filter(
    (item) => item.categoryId === Number(categoryId)
  );

  const toggleItemStatus = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "inactive" : "active" }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/scrap-management")}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="text-lg">←</span>
            Back
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Scrap Items (Category {categoryId})
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage items and pricing
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition"
        >
          + Add Item
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 transition ${item.status === "inactive" ? "opacity-60" : ""
                  }`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  ₹{item.price} / {item.unit}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {item.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    disabled={item.status === "inactive"}
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-40"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleItemStatus(item.id)}
                    className={`text-sm font-semibold ${item.status === "active"
                        ? "text-red-500 hover:text-red-700"
                        : "text-green-600 hover:text-green-800"
                      }`}
                  >
                    {item.status === "active" ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No items found in this category
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ScrapFormModal
          key={editingItem?.id || "new"}
          initialData={editingItem}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={(data) => {
            if (editingItem) {
              setItems((prev) =>
                prev.map((item) =>
                  item.id === editingItem.id ? { ...item, ...data } : item
                )
              );
            } else {
              setItems((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  categoryId: Number(categoryId),
                  status: "active",
                  ...data,
                },
              ]);
            }

            setIsModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}