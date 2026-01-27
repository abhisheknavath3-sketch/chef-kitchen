
import React, { useState, useEffect } from "react";

const AddCategory = ({ onClose, onAdd, editData }) => {
  const [form, setForm] = useState({
    name: "",
    products: "",
    stock: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

       
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            {editData ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;

