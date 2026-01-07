import React, { useContext, useState } from "react";
import Order from "./Order";
import Sidebar from "./Sidebar";
import { ShoppingCart } from 'lucide-react';
import { dishes, tabs } from "../constant/index";
import Header from "./Header";
import Body from "./Body";
import { OrderContext } from "../context/OrderContext";



function Home() {

  const {
    showOrder,
    cartCount,setShowOrder,
  }=useContext(OrderContext);
  // const [active, setActive] = useState("today");
  // const [cart, setCartItems] = useState([]);
  // const [showOrder, setShowOrder] = useState(false);
  // const [orderType, setOrderType] = useState("Dine In");
  // const [showType, setShowType] = useState(false);
  // const [currentDateTime, setCurrentDateTime] = useState(new Date)
  // const [searchQuery, setSearchQuery] = useState("");


  // const [selectedSize, setSelectedSize] = useState({});

  // const cartCount = cart.reduce((total, item) => total + item.qty, 0);


  // const handleSizeSelect = (itemName, size) => {
  //   setSelectedSize(prev => ({
  //     ...prev,
  //     [itemName]: size,
  //   }));
  // };



  // const isItemInCart = (item) => {
  //   const size = selectedSize[item.name] || "S";
  //   return cart.some(
  //     c => c.name === item.name && c.size === size
  //   );
  // };

  // const handleDelete = (name, size) => {
  //   setCartItems(prev =>
  //     prev
  //       .map(item => {
  //         if (item.name === name && item.size === size) {
  //           if (item.qty > 1) {
  //             return { ...item, qty: item.qty - 1 }; //  reduce qty
  //           }
  //           return null; //  remove if qty is 1
  //         }
  //         return item;
  //       })
  //       .filter(Boolean)
  //   );
  // };



  // const handleAddToCart = (item) => {
  //   const size = selectedSize[item.name] || "S";
  //   const finalPrice = item.basePrice + item.sizePrices[size];

  //   setCartItems(prev => {
  //     const existing = prev.find(
  //       i => i.name === item.name && i.size === size
  //     );

  //     if (existing) {
  //       return prev.map(i =>
  //         i.name === item.name && i.size === size
  //           ? { ...i, qty: i.qty + 1 }
  //           : i
  //       );
  //     }

  //     return [
  //       ...prev,
  //       {
  //         ...item,
  //         size,
  //         price: finalPrice,
  //         qty: 1,
  //       },
  //     ];
  //   });
  // };

  // const filteredDishes = dishes.filter((item) => {
  //   const matchesCategory = active === "today" ? true : item.category === active;
  //   const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesOrderType = item.availableFor?.includes(orderType) ?? true; // Safe check
  //   return matchesCategory && matchesSearch && matchesOrderType;
  // });


  return (

    <div className="w-full text-white bg-gray-800 h-screen flex flex-col lg:ml-20">
      <div className="flex flex-col w-full h-full ">

        <div className="flex flex-col h-full lg:flex-row w-full relative">

          <Sidebar />


          <div
            className={`px-4 sm:px-6 transition-all duration-300 
    ${showOrder ? "w-full lg:w-[65%]" : "w-full"} 
    bg-gray-800 overflow-y-auto flex flex-col flex-1`}
          >

            <Header
            />

            <Body
            />

          </div>
          {showOrder && (
            <div
              className="
    fixed inset-0 z-50
    lg:static lg:inset-auto
    w-full lg:w-[35%]
    h-screen
    bg-gray-900
    border-t lg:border-t-0 lg:border-l border-gray-700
    flex flex-col
  "
            >

              <Order/>

            </div>
          )}

        </div>
      </div>
      {!showOrder && (
        <button
          onClick={() => setShowOrder(true)}
          className="
      fixed bottom-6 right-6 z-50
      bg-amber-500
      w-14 h-14
      rounded-full
      flex items-center justify-center
      shadow-lg
    "
        >
          <ShoppingCart className="w-6 h-6 text-white " />

          {cartCount > 0 && (
            <span
              className="
          absolute -top-1 -right-1
          bg-red-500 text-white
          text-xs font-bold
          w-5 h-5
          flex items-center justify-center
          rounded-full
        "
            >
              {cartCount}
            </span>
          )}
        </button>
      )}


    </div>
  );
}

export default Home;