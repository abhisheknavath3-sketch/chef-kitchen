import React from "react";
import { X } from "lucide-react";
import Success from "./Success";
import { useState } from "react";



function Receipt({ cart, orderType, onClose }) {
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const discount = subTotal * 0.05;
  const total = subTotal - discount;
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[380px] rounded-2xl p-6 relative">

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-center">Chef Kitchen</h2>
        <p className="text-center text-sm text-gray-400">
          {orderType} · Order #34562
        </p>
        <p className="text-center text-xs text-gray-500 mb-4">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="border-b border-gray-700 my-3"></div>

        {/* Items */}
        <div className="space-y-3">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-400 text-xs">
                  ({item.size}) x {item.qty}
                </p>
              </div>
              <p>{(item.price * item.qty).toFixed(2)} AED</p>
            </div>
          ))}
        </div>

        <div className="border-b border-gray-700 my-4"></div>

        {/* Price */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-400">Sub total</p>
            <p>{subTotal.toFixed(2)} AED</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Discount (5%)</p>
            <p>-{discount.toFixed(2)} AED</p>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>{total.toFixed(2)} AED</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setShowSuccess(true)}
          className="w-full mt-6 bg-orange-500 py-3 rounded-xl font-semibold"
        >
          Confirm Order
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Thank you for your order
        </p>
      </div>
      {showSuccess && (
        <Success
          onClose={() => {
            setShowSuccess(false);
            onClose(); // close receipt
          }}
        />
      )}

    </div>
  );
}

export default Receipt;
