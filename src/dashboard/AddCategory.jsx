
import React, { useState, useEffect, useContext } from "react";
import { DashContext } from "../context/DashContext";


const AddCategory = () => {

  const { onClose,setShowAddCategory,onAdd,editData}=useContext(DashContext);


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
    <div className="flex justify-center items-center  ">
       <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setShowAddCategory(false)}
        />
     <div className=" w-96 h-full bg-white shadow-lg z-50 p-6">
       <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          className="w-full border p-2 rounded"
          value={formCategory.name}
          onChange={(e) => setFormCategory({ ...formCategory, name: e.target.value })}
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
    </div>
  );
};

export default AddCategory;

