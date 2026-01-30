import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const DashOrder = () => {
  const { orders } = useContext(OrderContext);

  // Grand total for all orders
  const grandTotal = orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((oSum, item) => oSum + item.price * item.qty, 0),
    0
  );

  return (
    <div className="p-8 text-orange-400 hide-scrollbar overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Order List</h1>

      {orders.length === 0 && (
        <p className="text-gray-400 text-center">No orders yet</p>
      )}

      {orders.map((order) => {
        const orderTotal = order.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );

        return (
          <div
            key={order.id}
            className="bg-gray-900 rounded-xl p-4 mb-6 border border-orange-400"
          >
            {/* Customer Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">{order.customerName || "Guest"}</h2>
              <span className="text-gray-100 font-semibold">{order.paymentMethod}</span>
            </div>

            {/* Table header for items */}
            <div className="grid grid-cols-6 text-gray-100 text-sm font-semibold border-b border-gray-600 pb-2 mb-2">
              <span>Image</span>
              <span>Product</span>
              <span>Size</span>
              <span>Qty</span>
              <span>Price</span>
              <span></span> {/* empty for spacing */}
            </div>

            {/* Items */}
            {order.items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-6 items-center mb-2 text-sm border-b border-gray-600 pb-1"
              >
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </div>
                <div>{item.name}</div>
                <div>{item.size}</div>
                <div>{item.qty}</div>
                <div>{(item.price * item.qty).toFixed(2)} AED</div>
                <div></div>
              </div>
            ))}

            {/* Order Total */}
            <div className="flex justify-end font-bold mt-2 text-white">
              Total: {orderTotal.toFixed(2)} AED
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default DashOrder;
