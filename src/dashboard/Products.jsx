import React, { useEffect, useContext } from "react";
import { Edit2, Trash2 } from "lucide-react";
import AddProduct from "./AddProduct";
import { DashContext } from "../context/DashContext";

const Products = () => {
  const {
    setEditingId,
    setForm,
    setProductCategories,
    products,
    setProducts,
    open,
    setOpen,
  } = useContext(DashContext);



  // Load categories
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setProductCategories(JSON.parse(savedCategories));
    }
  }, [setProductCategories]);

  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (err) {
      console.error("LocalStorage quota exceeded", err);
    }
  }, [products]);



  const handleEdit = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-orange-400">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setForm({
              image: null,
              name: "",
              category: "",
              stock: "",
              sizes: {},
              orderType: [],

            });
            setEditingId(null);
            setOpen(true);
          }}
          className="bg-gray-900 text-orange-500 px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px] text-xs sm:text-sm">
          <thead>
            <tr className="bg-orange-400 text-sm text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Sizes</th>
              <th className="p-4">Order Type</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t text-sm text-white">
                <td className="p-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.stock}</td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(p.sizes || {}).map(([size, price]) => (
                      <span
                        key={`${p.id}-${size}`}
                        className="bg-orange-400 px-2 py-1 rounded-full text-xs"
                      >
                        {size} – ₹{price}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    {p.orderType.map((o) => (
                      <span
                        key={`${p.id}-${o}`}
                        className="bg-orange-500 px-2 py-1 rounded-full text-xs"
                      >
                        {o.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && <AddProduct />}
    </div>
  );
};

export default Products;
