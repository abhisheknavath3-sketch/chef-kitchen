import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";

const Category = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ PRODUCTS STATE (MOVED INSIDE COMPONENT)
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Load categories from localStorage
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  // Save categories to localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddOrEdit = (data) => {
    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex] = data;
      setCategories(updated);
      setEditIndex(null);
    } else {
      setCategories([...categories, data]);
    }
    setShowAddCategory(false);
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // ✅ CALCULATE STOCK FROM PRODUCTS
  const getCategoryStock = (categoryName) => {
    return products
      .filter((p) => p.category === categoryName)
      .reduce((total, p) => total + Number(p.stock || 0), 0);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow p-6 relative">
      {!showAddCategory && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Category</h2>

            <button
              onClick={() => {
                setEditIndex(null);
                setShowAddCategory(true);
              }}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
            >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-300 text-sm text-center">
                  <th className="p-3 rounded-tl-lg">Name</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      No categories added
                    </td>
                  </tr>
                )}

                {categories.map((cat, index) => (
                  <tr key={index} className="border-b text-sm text-center">
                    <td className="p-3">{cat.name}</td>

                    {/* Optional live product count */}
                    <td className="p-3">
                      {
                        products.filter(
                          (p) => p.category === cat.name
                        ).length
                      }
                    </td>

                    {/* ✅ Live stock */}
                    <td className="p-3 font-semibold">
                      {getCategoryStock(cat.name)}
                    </td>

                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setEditIndex(index);
                          setShowAddCategory(true);
                        }}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Side Panel */}
      {showAddCategory && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6">
          <AddCategory
            onClose={() => setShowAddCategory(false)}
            onAdd={handleAddOrEdit}
            editData={editIndex !== null ? categories[editIndex] : null}
          />
        </div>
      )}

      {showAddCategory && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setShowAddCategory(false)}
        />
      )}
    </div>
  );
};

export default Category;
