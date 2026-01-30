import React from "react";
import { User } from "lucide-react";

const Head = () => {
  return (
    <header className="w-full h-20 px-8 flex items-center justify-between
                       bg-gray-900 border-b border-orange-500 shadow-md">

      {/* Left - Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-orange-400 tracking-wide">
          Admin Panel
        </h1>

      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-4 cursor-pointer group">

        {/* Text */}
        <div className="text-right">
          <p className="font-semibold text-white">Admin</p>
          <p className="text-sm text-gray-400">admin@gmail.com</p>
        </div>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-orange-400 
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:scale-110 group-hover:bg-orange-500">

          <User size={20} className="text-black" />
        </div>
      </div>
    </header>
  );
};

export default Head;
