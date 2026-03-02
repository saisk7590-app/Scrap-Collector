import { Link } from "react-router-dom";
import { useState } from "react";

export function ScrapManagementPage() {


  const [categories, setCategories] = useState([
    { id: 1, name: "Paper", status: "active" },
    { id: 2, name: "Plastic", status: "active" },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory) return;
    setCategories(prev => [
      ...prev,
      { id: Date.now(), name: newCategory, status: "active" }
    ]);
    setNewCategory("");
  };

  const toggleCategoryStatus = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Scrap Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage scrap categories and availability
          </p>
        </div>

        <div className="flex gap-3">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="border px-4 py-2 rounded-lg text-sm"
          />
          <button
            onClick={addCategory}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="flex flex-col gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            className={`bg-white rounded-xl p-6 shadow-sm flex justify-between items-center transition ${cat.status === "inactive" ? "opacity-60" : "hover:shadow-md"
              }`}
          >
            {/* clickable area uses Link for proper navigation */}
            <div className="flex-1">
              {cat.status === "active" ? (
                <Link
                  to={`${cat.id}`}
                  className="block cursor-pointer"
                >
                  <h2 className="text-lg font-semibold">{cat.name}</h2>
                  <p className="text-xs text-gray-400">Category ID: {cat.id}</p>
                </Link>
              ) : (
                <div className="block opacity-60">
                  <h2 className="text-lg font-semibold">{cat.name}</h2>
                  <p className="text-xs text-gray-400">Category ID: {cat.id}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${cat.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                {cat.status === "active" ? "Active" : "Inactive"}
              </span>

              <button
                onClick={() => toggleCategoryStatus(cat.id)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold text-white ${cat.status === "active"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {cat.status === "active" ? "Disable" : "Enable"}
              </button>

              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-xs text-red-500 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}