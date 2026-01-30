import React, { useState, useEffect, useContext } from "react";
import { DashContext } from "../context/DashContext";

const AddCategory = () => {
  const { onClose, setShowAddCategory, onAdd, editData } = useContext(DashContext);

  const [formCategory, setFormCategory] = useState({
    name: "",
    products: "",
    stock: "",
  });

  useEffect(() => {
    if (editData) {
      setFormCategory(editData);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formCategory);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setShowAddCategory(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">

        <div className="bg-gray-900 w-[400px] rounded-2xl shadow-xl border border-orange-500 p-8">

          {/* Title */}
          <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
            {editData ? "Edit Category" : "Add Category"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Category Name"
              className="w-full bg-gray-800 border border-gray-700 
                         p-3 rounded-lg text-white placeholder-gray-400
                         focus:outline-none focus:border-orange-400"
              value={formCategory.name}
              onChange={(e) =>
                setFormCategory({ ...formCategory, name: e.target.value })
              }
              required
            />

            {/* Buttons */}
            <div className="flex justify-between gap-4 pt-4">

              <button
                type="submit"
                className="flex-1 bg-orange-400 hover:bg-orange-500 
                           text-black font-semibold py-3 rounded-lg transition"
              >
                {editData ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-600 
                           text-gray-300 hover:bg-gray-800 
                           py-3 rounded-lg transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>

      </div>
    </>
  );
};

export default AddCategory;
