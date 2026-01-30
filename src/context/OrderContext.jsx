

import { createContext, useContext, useEffect, useState } from "react";
import { DashContext } from "./DashContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {


    const { products = [] } = useContext(DashContext);




    const [active, setActive] = useState("today");
    const [cart, setCartItems] = useState([]);
    const [showOrder, setShowOrder] = useState(false);
    const [orderType, setOrderType] = useState("Dine In");
    const [showType, setShowType] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSize, setSelectedSize] = useState({});
    const [showReceipt, setShowReceipt] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [showPayment, setShowPayment] = useState(false);


    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);


const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem("orders");
};




    // filteredProducts
    const normalizeOrderType = (type) => {
        if (type === "Dine In") return "DINE_IN";
        if (type === "Take Away") return "TAKEAWAY";
        if (type === "Delivery") return "DELIVERY";
        return type;
    };

    const filteredProducts = products.filter((item) => {
        const matchesCategory = active === "today" || item.category === active;
        const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const normalizedType = normalizeOrderType(orderType);
        const matchesOrderType = !item.orderType?.length || item.orderType.includes(normalizedType);
        return matchesCategory && matchesSearch && matchesOrderType;
    });

    console.log("Filtered products:", filteredProducts);

    const handleSizeSelect = (name, size) => setSelectedSize((p) => ({ ...p, [name]: size }));
    const isItemInCart = (item) => cart.some((c) => c.name === item.name && c.size === (selectedSize[item.name] || "S"));
    const handleAddToCart = (item) => {
        const size = selectedSize[item.name] || "S";
        const price = Number(item.sizes?.[size] || 0);


        setCartItems((prev) => {
            const existing = prev.find((i) => i.name === item.name && i.size === size);
            if (existing) return prev.map((i) => (i.name === item.name && i.size === size ? { ...i, qty: i.qty + 1 } : i));
            return [...prev, { ...item, size, price, qty: 1, }];
        });
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleDelete = (name, size) => {
        setCartItems((prev) =>
            prev
                .map((item) => {
                    if (item.name === name && item.size === size) {
                        return { ...item, qty: item.qty - 1 };
                    }
                    return item;
                })
                .filter((item) => item.qty > 0)
        );
    };

    const confirmOrder = (paymentMethod, customerName) => {

        if (cart.length === 0) return;

        const newOrder = {
            id: Date.now(),
            customerName: customerName || "Guest", // ✅ fallback
            items: [...cart],
            paymentMethod,
        };

        setOrders(prev => [...prev, newOrder]);

        setShowPayment(false);
        setShowSuccess(true);
    };






    const onClose = () => {
        setShowOrder(false);
    };

    const onRemove = () => {
        // optional: clear cart
        setCartItems([]);

        // hide receipt and show success
        setShowReceipt(false);
        setShowSuccess(true);
    };

    const onDone = () => {
        setShowSuccess(false);
        setShowReceipt(false);
        setShowOrder(false);
        setCartItems([]);
    };




    return (
        <OrderContext.Provider
            value={{
                active, currentDateTime, setActive,
                cart, showOrder, setShowOrder,
                orderType, setOrderType, showType, setShowType,
                searchQuery, setSearchQuery, selectedSize,
                cartCount: cart.reduce((t, i) => t + i.qty, 0),
                handleSizeSelect, handleAddToCart, isItemInCart,
                filteredProducts, showReceipt, setShowReceipt,
                showSuccess, setShowSuccess, handleDelete,
                onClose, onRemove, onDone, confirmOrder, showPayment,
                setShowPayment, orders,clearOrders,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
