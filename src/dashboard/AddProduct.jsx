import React from 'react'
import { useContext } from 'react';
import { DashContext } from '../context/DashContext';
import { X } from 'lucide-react';

const AddProduct = () => {

 

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


  const allOrderTypes = ["DINE_IN", "TAKEAWAY", "DELIVERY"];
  const allSizes = ["S", "M", "L",];

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

     
     const {editingId,form,handleImageChange,productCategories,setEditingId,
        products,setProducts,setForm, setOpen
     } = useContext(DashContext);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-[420px] rounded-xl p-0 relative overflow-hidden shadow-lg">
            {/* Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">

              {/* Image */}
              <div className="bg-gray-50 rounded-lg p-3">
                {!form.image && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm border rounded-md p-2"
                  />
                )}

                {form.image && (
                  <div className="flex items-center gap-3">
                    <img
                      src={form.image}
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: null })}
                      className="text-sm text-blue-600"
                    >
                      Replace
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Category</option>
                  {productCategories.map((cat, i) => (
                    <option key={i} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* Order Type */}
              <div>
                <p className="text-sm font-medium mb-1">Order Type</p>
                <div className="flex flex-wrap gap-2">
                  {allOrderTypes.map((o) => (
                    <label
                      key={o}
                      className={`px-3 py-1.5 rounded-md border text-xs cursor-pointer
            ${form.orderType.includes(o)
                          ? "bg-indigo-100 border-indigo-500"
                          : "border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.orderType.includes(o)}
                        onChange={() => handleCheckbox("orderType", o)}
                        className="mr-1"
                      />
                      {o.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-sm font-medium mb-1">Sizes</p>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((s) => (
                    <div
                      key={s}
                      className={`border rounded-md p-2 text-center text-sm
            ${form.sizes[s] !== undefined
                          ? "bg-indigo-50 border-indigo-400"
                          : ""
                        }`}
                    >
                      <label className="flex justify-center gap-1 items-center mb-1">
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
                          type="number"
                          placeholder="₹"
                          value={form.sizes[s]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              sizes: { ...prev.sizes, [s]: e.target.value },
                            }))
                          }
                          className="w-full border rounded px-1 py-0.5 text-xs"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>

        </div>
  )
}

export default AddProduct
