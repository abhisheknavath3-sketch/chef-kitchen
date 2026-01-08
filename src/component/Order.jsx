import React, { useContext } from "react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { X } from 'lucide-react';
import Receipt from "./Receipt";
import { OrderContext } from "../context/OrderContext";




const mode = [
  { id: 1, label: " Dine In " },
  { id: 2, label: " Take away" },
  { id: 3, label: "Delivery" },
];

function Order() {

  const {
    cart, handleDelete, onClose, orderType, setOrderType, onComplete,
    showReceipt, setShowReceipt, setShowSuccess

  } = useContext(OrderContext)

  const subTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0
  );



  return (
    <div
      className="
    bg-gray-900 text-white flex flex-col
     top-0 right-0 z-50
    w-110 h-full
    sm:h-screen
    p-4 sm:p-6
  "
    >

      {/* Header */}
      <div className="flex flex-row justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Orders #34562
        </h2>
        <button onClick={onClose} className=" text-2xl mb-8"><X /></button>
      </div>

      {/* Mode buttons */}
      <div className="flex flex-wrap sm:flex-nowrap text-white mt-4 gap-3 sm:gap-6">
        {["Dine In", "Take Away", "Delivery"].map((mode) => (
          <button
            key={mode}
            onClick={() => setOrderType(mode)} // update selection globally
            className={`transition-all border p-3 rounded-lg ${orderType === mode ? "bg-orange-500" : "text-orange-400 cursor-pointer"
              }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Cart items */}
      <div className="flex justify-between font-bold mt-5">
        <p>Item</p>
        <div className="flex gap-8">
          <p>Qty</p>
          <p>Price</p>
        </div>
      </div>

      <div className="border-b border-gray-700 mb-4 "></div>

      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar bg-gray-900">
        {cart.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={item.img} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                  <p className="text-xs text-gray-400">Size: {item.size}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">AED {item.price}</p>

                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <span className="bg-gray-700 px-3 py-1 rounded-lg">{item.qty}</span>
                <p>{(Number(item.price) * item.qty).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Order Note..."
                className="flex-1 bg-gray-800 px-3 py-2 sm:py-3 rounded-lg text-sm outline-none"
              />
              <button
                onClick={() => handleDelete(item.name, item.size)}
                className="border border-amber-600 p-2 rounded-lg"
              >
                <Trash className="text-amber-500 w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="justify-end border-t border-gray-700 pt-4 mt-auto pb-6 ">
        <div className="flex justify-between text-gray-400 mb-5">
          <p>Discount</p>
          <p>5%</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-gray-300">Sub total</p>
          <p className="font-semibold">{subTotal.toFixed(2)} AED</p>
        </div>

        <button
          onClick={() => {
            if (cart.length > 0) {
              setShowSuccess(false); 
              setShowReceipt(true);
            }
          }}
          className={`w-full py-3 rounded-xl text-base sm:text-lg font-semibold
           ${cart.length === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            }
  `}
          disabled={cart.length === 0}
        >
          Order now
        </button>


        {showReceipt && (
          <Receipt
            cart={cart}
            orderType={orderType}
            onClose={() => setShowReceipt(false)}
            onComplete={() => {
              setShowReceipt(false);
              onComplete();
            }}
          />
        )}
      </div>
    </div>
  );
}


export default Order;


