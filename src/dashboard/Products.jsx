import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2 } from "lucide-react";

                                                                  
const Products = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const [categories, setCategories] = useState([]);

useEffect(() => {
  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    setCategories(JSON.parse(savedCategories));
  }
}, []);

 
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    sizes: {},
    orderType: [],
    image: null,
  });

  const allSizes = ["S", "M", "L",];
  const allOrderTypes = ["DINE_IN", "TAKEAWAY", "DELIVERY"];

  const handleCheckbox = (type, value) => {
    if (type === "orderType") {
      setForm((prev) => ({
        ...prev,
        orderType: prev.orderType.includes(value)
          ? prev.orderType.filter((o) => o !== value)
          : [...prev.orderType, value],
      }));
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };


  const handleSave = () => {
    if (editingId) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
      );
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...form,
      };
      setProducts([...products, newProduct]);
    }

    // Reset
    setForm({ name: "", category: "", stock: "", sizes: {}, orderType: [], image: null });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setForm({ name: "", category: "", stock: "", sizes: {}, orderType: [], image: null });
            setEditingId(null);
            setOpen(true);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px] text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              <th className="p-4 rounded-tl-lg">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Sizes</th>
              <th className="p-4">Order Type</th>
              <th className="p-4 rounded-tr-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t text-sm">
                <td className="p-4">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
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
                        key={size}
                        className="bg-green-100 px-2 py-1 rounded-full text-xs"
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
                        key={o}
                        className="bg-blue-100 px-2 py-1 rounded-full text-xs"
                      >
                        {o.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500 flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-[420px]   rounded-xl p-4 sm:p-6 relative flex flex-col">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="space-y-3 sm:space-y-4">

              {/* Product Image */}
              <div>

                {/* Show file input ONLY if image not selected */}
                {!form.image && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 border rounded-lg p-2"
                  />
                )}

                {/* Image Preview */}
                {form.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />

                    {/* Change Image Button */}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: null })}
                      className="text-sm text-blue-600 underline"
                    >
                      Change image
                    </button>
                  </div>
                )}
              </div>


              {/* Product Name */}
              <div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Product Name"
                  className="w-full mt-1 border rounded-lg px-3 py-2.5 text-sm leading-normal"
                />

              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium">Category</label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Select Category</option>

                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>


              {/* Stock */}
              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                />
              </div>


              {/* Order Type */}
              <div>
                <label className="text-sm font-medium">Order Type</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {allOrderTypes.map((o) => (
                    <label
                      key={o}
                      className={`flex items-center gap-2 px-2 py-2 rounded-lg border cursor-pointer ${form.orderType.includes(o)
                        ? "bg-green-100 border-green-500"
                        : "border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.orderType.includes(o)}
                        onChange={() => handleCheckbox("orderType", o)}
                      />
                      {o.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes & Prices */}
              <div>
                <label className="text-sm font-medium">Sizes & Prices</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  {allSizes.map((s) => (
                    <div
                      key={s}
                      className={`border rounded-lg p-3 text-center ${form.sizes[s] !== undefined
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300"
                        }`}
                    >
                      <div className="flex justify-center gap-1 items-center mb-2">
                        <input
                          type="checkbox"
                          checked={form.sizes[s] !== undefined}
                          onChange={() => {
                            setForm((prev) => {
                              const newSizes = { ...prev.sizes };
                              if (newSizes[s] !== undefined) {
                                delete newSizes[s]; // uncheck
                              } else {
                                newSizes[s] = ""; // check
                              }
                              return { ...prev, sizes: newSizes };
                            });
                          }}
                        />
                        <span className="font-semibold">{s}</span>
                      </div>

                      {form.sizes[s] !== undefined && (
                        <input
                          type="number"
                          placeholder="Price"
                          value={form.sizes[s]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              sizes: {
                                ...prev.sizes,
                                [s]: e.target.value,
                              },
                            }))
                          }
                          className="w-full border rounded p-1 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>



              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg mt-1 font-semibold"
              >
                {editingId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;
