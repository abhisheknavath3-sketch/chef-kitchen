import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function Payment() {
  const { setShowPayment, confirmOrder } = useContext(OrderContext);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[360px] rounded-2xl p-6">

        <h2 className="text-xl font-bold mb-4">Payment</h2>

        {/* Fake inputs just for UI */}
        <input
          placeholder="Cardholder Name"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />
        <input
          placeholder="Card Number"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />
        <input
          placeholder="Expiry Date"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowPayment(false)}
            className="w-full border border-orange-400 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={confirmOrder}
            className="w-full bg-orange-500 py-2 rounded-xl"
          >
            Confirm Payment
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payment;
