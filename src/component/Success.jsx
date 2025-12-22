import React from "react";
import { CheckCircle } from "lucide-react";

function Success({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[320px] rounded-2xl p-6 text-center">

        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h2 className="text-xl font-semibold mb-2">
          Order Placed Successfully
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Your order has been confirmed.  
          Thank you for choosing Chef Kitchen 🍽️
        </p>

        <button
          onClick={onClose}
          className="w-full bg-green-500 py-2 rounded-xl font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default Success;
