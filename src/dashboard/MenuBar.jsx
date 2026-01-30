import React from "react";
import { NavLink } from "react-router-dom";
import { Shapes, StretchHorizontal, ShoppingCart, Utensils } from "lucide-react";

const MenuItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `relative flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all
      ${isActive
        ? "bg-orange-400/20 text-orange-400"
        : "text-gray-300 hover:bg-gray-800"}`
    }
  >
    {/* Active indicator */}
    <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-xl opacity-0 group-[.active]:opacity-100" />

    {/* Icon circle */}
    <div className="bg-gray-800 p-2 rounded-lg">
      <Icon size={20} />
    </div>

    {label}
  </NavLink>
);

const MenuBar = () => {
  return (
    <div className="h-screen w-64 bg-gray-950 p-4 border-r border-orange-500">

      {/* Inner card */}
      <div className="h-full bg-gray-900 rounded-2xl flex flex-col">

        {/* Logo */}
        <div className="flex flex-col items-center py-8 border-b border-orange-400">
          <div className="bg-orange-400 p-3 rounded-full">
            <Utensils className="text-black" size={28} />
          </div>

          <h1 className="text-orange-400 font-bold text-xl mt-3 tracking-wide">
            Chef Kitchen
          </h1>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-3 mt-6 px-3">
          <MenuItem to="/admin" icon={Shapes} label="Category" />
          <MenuItem to="/admin/products" icon={StretchHorizontal} label="Products" />
          <MenuItem to="/admin/shopping" icon={ShoppingCart} label="Orders" />
        </nav>

      </div>
    </div>
  );
};

export default MenuBar;
