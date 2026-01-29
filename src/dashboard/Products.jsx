// import React, { useEffect, useContext } from "react";
// import {  Edit2, Trash2 } from "lucide-react";
// import AddProduct from "./AddProduct";
// import { DashContext } from "../context/DashContext";


// const Products = () => {

//   const {setEditingId,setForm,setProductCategories,products, setProducts,
//     open, setOpen
//   } = useContext(DashContext);

//   useEffect(() => {
//     const savedProducts = localStorage.getItem("products");
//     if (savedProducts) {
//       setProducts(JSON.parse(savedProducts));
//     }
//   }, []);

  
//   useEffect(() => {
//     const savedCategories = localStorage.getItem("categories");
//     if (savedCategories) {
//       setProductCategories(JSON.parse(savedCategories));
//     }
//   }, []);

//    const handleEdit = (product) => {
//     setForm({ ...product });
//     setEditingId(product.id);
//     setOpen(true);
//   };



//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       setProducts(products.filter((p) => p.id !== id));
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Products</h1>
//         <button
//           onClick={() => {
//             setForm({ name: "", category: "", stock: "", sizes: {}, orderType: [], image: null });
//             setEditingId(null);
//             setOpen(true);
//           }}
//           className="bg-gray-900 text-white px-4 py-2 rounded-lg"
//         >
//           Add Product
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full min-w-[700px] text-xs sm:text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-sm text-left">
//               <th className="p-4 rounded-tl-lg">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4">Sizes</th>
//               <th className="p-4">Order Type</th>
//               <th className="p-4 rounded-tr-lg text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="border-t text-sm">
//                 <td className="p-4">
//                   {p.image ? (
//                     <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </td>
//                 <td className="p-4">{p.name}</td>
//                 <td className="p-4">{p.category}</td>
//                 <td className="p-4">{p.stock}</td>
//                 <td className="p-4">
//                   <div className="flex gap-2 flex-wrap">
//                     {Object.entries(p.sizes || {}).map(([size, price]) => (
//                       <span
//                         key={size}
//                         className="bg-green-100 px-2 py-1 rounded-full text-xs"
//                       >
//                         {size} – ₹{price}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   <div className="flex gap-2 flex-wrap">
//                     {p.orderType.map((o) => (
//                       <span
//                         key={o}
//                         className="bg-blue-100 px-2 py-1 rounded-full text-xs"
//                       >
//                         {o.replace("_", " ")}
//                       </span>
//                     ))}
//                   </div>
//                 </td>

//                 <td className="p-4 text-center flex justify-center gap-2">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="text-blue-500 flex items-center gap-1"
//                   >
//                     <Edit2 size={16} /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="text-red-500 flex items-center gap-1"
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Product Modal */}
//       {open && (
//         <AddProduct/>        
//       )}

//     </div>
//   );
// };

// export default Products; 




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

  // Save products
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
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
              <tr key={p.id} className="border-t text-sm">
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
                        key={`${p.id}-${o}`}
                        className="bg-blue-100 px-2 py-1 rounded-full text-xs"
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
