import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { Check } from "lucide-react";

function Payment() {

    const { setShowPayment, confirmOrder } = useContext(OrderContext);

    const [method, setMethod] = useState("Credit Card");
    const [customerName, setCustomerName] = useState(""); // ✅ name state

    const paymentMethods = [
        { name: "Credit Card", icon: "💳" },
        { name: "PayPal", icon: "🅿️" },
        { name: "Cash", icon: "💵" },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white w-[360px] rounded-2xl p-6">

                <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>

                {/* ✅ NAME INPUT */}
                <input
                    placeholder="Cardholder Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-gray-800"
                />

                <p className="mb-2 text-gray-400">Select Payment Method</p>

                <div className="flex gap-3 mb-5">
                    {paymentMethods.map((item) => {
                        const isSelected = method === item.name;

                        return (
                            <label key={item.name}
                                className={`flex-1 flex flex-col items-center p-4 cursor-pointer rounded-xl border
                                ${isSelected ? "bg-orange-500" : "bg-gray-800"}`}>

                                <input
                                    type="radio"
                                    name="payment"
                                    className="hidden"
                                    checked={isSelected}
                                    onChange={() => setMethod(item.name)}
                                />

                                <span className="text-2xl">{item.icon}</span>
                                <span>{item.name}</span>

                                {isSelected && (
                                    <Check className="absolute top-2 right-2" />
                                )}
                            </label>
                        );
                    })}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowPayment(false)}
                        className="w-full border py-2 rounded-xl"
                    >
                        Cancel
                    </button>

                    {/* ✅ PASS NAME */}
                    <button
                        onClick={() => confirmOrder(method, customerName)}
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
