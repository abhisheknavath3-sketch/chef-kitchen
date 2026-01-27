import React from "react";
import { User } from "lucide-react";

const Head = () => {
  return (
    <div className="bg-gray-200 h-20 w-full flex items-center justify-end px-6 shadow">
      
   
      <div className="flex items-center gap-4 text-black">
        
      
        <div className="text-right">
          <p className="font-medium">Admin</p>
          <p className="text-sm">admin@gmail.com</p>
        </div>

        
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <User className="text-black" size={22} />
        </div>
      </div>

    </div>
  );
};

export default Head;
