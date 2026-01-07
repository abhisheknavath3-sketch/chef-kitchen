import { createContext, useState } from "react";
import { dishes, tabs } from "../constant/index";


export const OrderContext = createContext();

export function OrderProvider({ children }) {

    const [active, setActive] = useState("today");
    const [cart, setCartItems] = useState([]);
    const [showOrder, setShowOrder] = useState(false);
    const [orderType, setOrderType] = useState("Dine In");
    const [showType, setShowType] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSize, setSelectedSize] = useState({});
     const [showReceipt, setShowReceipt] = useState(false);
      const [showSuccess, setShowSuccess] = useState(false);
      

    const cartCount = cart.reduce((total, item) => total + item.qty, 0);


    const handleSizeSelect = (itemName, size) => {
        setSelectedSize(prev => ({
            ...prev,
            [itemName]: size,
        }));
    };



    const isItemInCart = (item) => {
        const size = selectedSize[item.name] || "S";
        return cart.some(
            c => c.name === item.name && c.size === size
        );
    };

    const handleDelete = (name, size) => {
        setCartItems(prev =>
            prev
                .map(item => {
                    if (item.name === name && item.size === size) {
                        if (item.qty > 1) {
                            return { ...item, qty: item.qty - 1 }; //  reduce qty
                        }
                        return null; //  remove if qty is 1
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };



    const handleAddToCart = (item) => {
        const size = selectedSize[item.name] || "S";
        const finalPrice = item.basePrice + item.sizePrices[size];

        setCartItems(prev => {
            const existing = prev.find(
                i => i.name === item.name && i.size === size
            );

            if (existing) {
                return prev.map(i =>
                    i.name === item.name && i.size === size
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }

            return [
                ...prev,
                {
                    ...item,
                    size,
                    price: finalPrice,
                    qty: 1,
                },
            ];
        });
    };

    const filteredDishes = dishes.filter((item) => {
        const matchesCategory = active === "today" ? true : item.category === active;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesOrderType = item.availableFor?.includes(orderType) ?? true; 
        return matchesCategory && matchesSearch && matchesOrderType;
    });

    const onComplete = () => {
        setCartItems([]);     
        setSelectedSize({});    
        setShowOrder(false);
        setShowSuccess(false); 
    }

    const onClose = () =>{
        setShowOrder(false)
    }

    const onDone= ()=>{
        setShowOrder(false);
        setSelectedSize({})
        setShowReceipt(false)
        setCartItems([])
    }

    const onRemove =()=>{
         setShowSuccess(true)
            
    }

    return (
        <OrderContext.Provider
            value={{
                active, setActive, cart, setCartItems, showOrder, setShowOrder
                , orderType, setOrderType, showType, setShowType,
                currentDateTime, setCurrentDateTime, searchQuery, setSearchQuery,
                selectedSize, setSelectedSize, cartCount, handleSizeSelect,
                isItemInCart, handleDelete, handleAddToCart, filteredDishes,onComplete,onClose,
                onDone,showReceipt, setShowReceipt,onRemove,showSuccess, setShowSuccess

            }}>
                {children}

        </OrderContext.Provider>
    )

}