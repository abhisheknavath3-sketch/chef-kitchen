import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Shapes, StretchHorizontal, ShoppingCart, Utensils, LogOut } from "lucide-react";

const MenuItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all
      ${isActive
        ? "bg-orange-400/20 text-orange-400"
        : "text-gray-300 hover:bg-gray-800"}`
    }
  >
    <div className="bg-gray-800 p-2 rounded-lg">
      <Icon size={20} />
    </div>
    {label}
  </NavLink>
);

const MenuBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you can clear tokens/localStorage here
    navigate("/"); // 👈 back to Menu page
  };

  return (
    <div className="h-screen w-64 bg-gray-950 p-4 border-r border-orange-500">

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
        <nav className="flex flex-col gap-3 mt-6 px-3 flex-1">
          <MenuItem to="/admin" icon={Shapes} label="Category" />
          <MenuItem to="/admin/products" icon={StretchHorizontal} label="Products" />
          <MenuItem to="/admin/shopping" icon={ShoppingCart} label="Orders" />
        </nav>

        {/* Logout button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full  text-orange-400 hover:text-orange-500 px-4 py-3 rounded-xl font-"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default MenuBar;
