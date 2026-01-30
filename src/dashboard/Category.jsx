import React, { useState, useEffect, useContext } from "react";
import AddCategory from "./AddCategory";
import { DashContext } from "../context/DashContext";

const Category = () => {

  const {
     showAddCategory, setShowAddCategory, setEditIndex,
        categoryProducts, setcategoryProducts,categories, setCategories,
  }=useContext(DashContext);
 

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setcategoryProducts(JSON.parse(savedProducts));
    }
  }, []);

 

  // Save categories to localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);


  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // ✅ CALCULATE STOCK FROM PRODUCTS
  const getCategoryStock = (categoryName) => {
    return categoryProducts
      .filter((p) => p.category === categoryName)
      .reduce((total, p) => total + Number(p.stock || 0), 0);
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow p-6 relative">
      {!showAddCategory && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 text-orange-400">
            <h2 className="text-3xl font-semibold">Category</h2>

            <button
              onClick={() => {
                setEditIndex(null);
                setShowAddCategory(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-md "
            >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-400 text-sm text-center text-white">
                  <th className="p-3 rounded-tl-lg">Name</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center ">
                      No categories added
                    </td>
                  </tr>
                )}

                {categories.map((cat, index) => (
                  <tr key={index} className="border-b text-sm text-center text-white">
                    <td className="p-3">{cat.name}</td>

                    {/* Optional live product count */}
                    <td className="p-3">
                      {
                        categoryProducts.filter(
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
                        className="px-3 py-1 text-xs bg-orange-400 text-white rounded"
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
       
          <AddCategory
          />
       
      )}

      
    </div>
  );
};

export default Category;
