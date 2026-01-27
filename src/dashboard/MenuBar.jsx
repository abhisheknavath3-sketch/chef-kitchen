// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { Shapes, StretchHorizontal, ShoppingCart } from 'lucide-react'

// const MenuBar = () => {
//   return (
//     <div className="w-60 bg-gray-300 h-full">
//       <h1 className="text-3xl font-semibold px-2 py-8">Chef Kitchen</h1>

//      <NavLink end to="/admin"

//         className={({ isActive }) =>
//           `flex px-5 py-3 items-center gap-2 text-xl font-bold  ${
//             isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
//           }`
//         }
//       >
//         <Shapes />
//         <p>Category</p>
//       </NavLink>

//       <NavLink to="/admin/products"

//         className={({ isActive }) =>
//           `flex px-5 py-3 items-center gap-2 text-xl font-bold ${
//             isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
//           }`
//         }
//       >
//         <StretchHorizontal />
//         <p>Products</p>
//       </NavLink>

//       <NavLink to="/admin/shopping"

//         className={({ isActive }) =>
//           `flex px-5 py-3 items-center gap-2 text-xl font-bold ${
//             isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
//           }`
//         }
//       >
//         <ShoppingCart />
//         <p>Shopping</p>
//       </NavLink>
//     </div>
//   )
// }

// export default MenuBar

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Shapes, StretchHorizontal, ShoppingCart, ChefHat } from 'lucide-react'

const MenuBar = () => {
  return (
    <div className="w-60 bg-gray-300 h-full">
      
     
      <div className="flex items-center gap-2 px-2 py-8">
        <ChefHat size={32} />
        <h1 className="text-2xl font-bold">Chef Kitchen</h1>
      </div>

      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex px-5 py-3 items-center gap-2 text-xl font-semibold ${
            isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
          }`
        }
      >
        <Shapes />
        <p>Category</p>
      </NavLink>

      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          `flex px-5 py-3 items-center gap-2 text-xl font-semibold ${
            isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
          }`
        }
      >
        <StretchHorizontal />
        <p>Products</p>
      </NavLink>

      <NavLink
        to="/admin/shopping"
        className={({ isActive }) =>
          `flex px-5 py-3 items-center gap-2 text-xl font-semibold ${
            isActive ? 'bg-gray-100 rounded-xl' : 'bg-gray-300'
          }`
        }
      >
        <ShoppingCart />
        <p>Shopping</p>
      </NavLink>

    </div>
  )
}

export default MenuBar;
