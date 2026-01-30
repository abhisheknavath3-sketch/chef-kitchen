import React from 'react'
import { useContext } from 'react';
import { DashContext } from '../context/DashContext';
import { X } from 'lucide-react';

const AddProduct = () => {

  const {
    editingId, form, handleImageChange, productCategories,
    setEditingId, products, setProducts, setForm, setOpen
  } = useContext(DashContext);

  const allOrderTypes = ["DINE_IN", "TAKEAWAY", "DELIVERY"];
  const allSizes = ["S", "M", "L"];

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

  const handleSave = () => {
    const finalProduct = {
      ...form,
      orderType: form.orderType.length
        ? form.orderType
        : ["DINE_IN", "TAKEAWAY", "DELIVERY"],
    };

    if (editingId) {
      setProducts((p) =>
        p.map((item) =>
          item.id === editingId ? { ...item, ...finalProduct } : item
        )
      );
    } else {
      setProducts([...products, { id: Date.now(), ...finalProduct }]);
    }

    setForm({ name: "", category: "", stock: "", sizes: {}, orderType: [], image: null });
    setEditingId(null);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl border border-orange-400/40 overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-orange-400">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <button onClick={() => setOpen(false)}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">

          {/* IMAGE */}
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            {!form.image ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-300"
              />
            ) : (
              <div className="flex items-center gap-4">
                <img
                  src={form.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <button
                  onClick={() => setForm({ ...form, image: null })}
                  className="text-orange-400 text-sm"
                >
                  Replace
                </button>
              </div>
            )}
          </div>

          {/* NAME */}
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:border-orange-400 outline-none"
          />

          {/* CATEGORY + STOCK */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-white"
            >
              <option value="">Category</option>
              {productCategories.map((cat, i) => (
                <option key={i} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-white"
            />
          </div>

          {/* ORDER TYPE */}
          <div>
            <p className="text-orange-400 mb-2 font-medium">Order Type</p>
            <div className="flex gap-3 flex-wrap">
              {allOrderTypes.map((o) => (
                <label
                  key={o}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-sm transition
                  ${form.orderType.includes(o)
                      ? "bg-orange-400 text-black"
                      : "bg-gray-800 text-gray-300"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={form.orderType.includes(o)}
                    onChange={() => handleCheckbox("orderType", o)}
                    className="hidden"
                  />
                  {o.replace("_", " ")}
                </label>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <p className="text-orange-400 mb-2 font-medium">Sizes</p>

            <div className="grid grid-cols-3 gap-3">
              {allSizes.map((s) => (
                <div
                  key={s}
                  className={`p-3 rounded-lg text-center transition
                  ${form.sizes[s] !== undefined
                      ? "bg-orange-400"
                      : "bg-gray-800"
                    }`}
                >
                  <label className="text-sm flex justify-center gap-2 text-white">
                    <input
                      type="checkbox"
                      checked={form.sizes[s] !== undefined}
                      onChange={() => {
                        setForm((prev) => {
                          const newSizes = { ...prev.sizes };
                          if (newSizes[s] !== undefined) delete newSizes[s];
                          else newSizes[s] = "";
                          return { ...prev, sizes: newSizes };
                        });
                      }}
                    />
                    {s}
                  </label>

                  {form.sizes[s] !== undefined && (
                    <input
                      type="number "
                      placeholder="₹"
                      value={form.sizes[s]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          sizes: { ...prev.sizes, [s]: e.target.value },
                        }))
                      }
                      className="w-full mt-2 p-1 rounded text-xs text-black border"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold py-3 rounded-xl transition"
          >
            {editingId ? "Update Product" : "Save Product"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;
