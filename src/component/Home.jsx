import React, { useState } from "react";
import Order from "./Order";
import Sidebar from "./Sidebar";
import { ShoppingCart } from 'lucide-react';
import { dishes, tabs } from "../constant/index";
import Header from "./Header";
import Body from "./Body";



function Home() {
  const [active, setActive] = useState("today");
  const [cart, setCartItems] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [showType, setShowType] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date)
  const [searchQuery, setSearchQuery] = useState("");


  const [selectedSize, setSelectedSize] = useState({});

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
      prev.filter(item => !(item.name === name && item.size === size))
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
    // Filter by active tab
    const matchesCategory = active === "today" ? true : item.category === active;

    // Filter by search query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });


  return (
    // <div className="w-full flex h-screen overflow-hidden bg-red-300">
    //   {/* sidebar section  */}
    //   <div className="w-40 bg-green-400 h-full"></div>
    //   {/* list page section  */}
    // <div className="bg-white flex flex-col w-full h-full">
    //   {/* header  */}
    //   <div className="h-36 bg-yellow-200"></div>
    //   {/* list  */}
    //   <div className="w-full grid grid-cols-4 gap-4 overflow-y-auto h-full bg-cyan-400">
    //     {
    //       new Array(100).fill(" ").map((_,index)=>
    //       <div className="h-[200px] bg-white" key={index}>{index}</div>)
    //     }
    //   </div>
    // </div>
    // </div>
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
              currentDateTime={currentDateTime}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              active={active}
              setActive={setActive}
              tabs={tabs}

            />

            <Body
              filteredDishes={filteredDishes}
              showType={showType}
              setShowType={setShowType}
              orderType={orderType}
              setOrderType={setOrderType}
              selectedSize={selectedSize}
              handleSizeSelect={handleSizeSelect}
              handleAddToCart={handleAddToCart}
              isItemInCart={isItemInCart}
            />

            {/* 
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div>
                <h1 className="text-4xl head">Chef Kitchen</h1>
                {currentDateTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search food, coffee, etc.."
                  className="h-14 pl-10 pr-4 w-60 rounded-xl bg-gray-800 border border-gray-600 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

              </div>
            </div>
            <div className="flex text-white mt-4 gap-6 overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`
        pb-1 transition-all
        whitespace-nowrap
        text-sm md:text-base
        ${active === tab.id ? "text-orange-400" : "text-white cursor-pointer"}
      `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full mt-3">
              <div className="w-full border-b-2 border-gray-600"></div>

              <div
                className="
    absolute top-0 border-b-4 border-orange-400 rounded-full
    transition-all duration-300
    w-1/3 md:w-[90px]
  "
                style={{
                  left:
                    window.innerWidth >= 768
                      ? active === "today"
                        ? "0px"
                        : active === "our"
                          ? "125px"
                          : "250px"
                      : active === "today"
                        ? "0%"
                        : active === "our"
                          ? "33.33%"
                          : "66.66%",
                }}
              />
            </div> */}


            {/* <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="mt-6 w-full  ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

                  <h1 className="text-xl head">
                    Choose Dishes
                    <span className="text-gray-400 text-sm ml-2">
                      ({filteredDishes.length} items)
                    </span>
                  </h1>

                  <div className="justify-end flex flex-row gap-3">
                    <div className="relative">
                     
                      <button
                        onClick={() => setShowType(!showType)}
                        className="flex items-center gap-1 bg-gray-900 px-4 py-2 rounded-lg"
                      >
                        {orderType}
                        <ChevronDown
                          className={`transition-transform ${showType ? "rotate-180" : ""}`}
                        />
                      </button>

                      
                      {showType && (
                        <div className="absolute right-0 mt-2 w-30 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-10">
                          {["Dine In", "Take Away", "Delivery"].map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setOrderType(type);
                                setShowType(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-amber-500 hover:text-white"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>



                  </div>
                </div>




                
                {filteredDishes.length === 0 && (
                  <p className="text-gray-400 text-center mt-10">No items found.</p>
                )}


                
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-10 bg-gray-800">
                  {filteredDishes.map((item, index) => {
                    const size = selectedSize[item.name] || "S";
                    const displayPrice = item.basePrice + item.sizePrices[size];

                    return (
                      <div
                        key={index}
                        className="bg-gray-900 rounded-3xl p-4 flex flex-col items-center w-full max-w-[320px] mx-auto"
                      >
                        <img
                          src={item.img}
                          className="w-28 h-28 rounded-full object-cover -mt-12 mb-4"
                        />

                        <p className="text-sm text-center font-semibold">{item.name}</p>

                        <p className="text-sm mt-1 font-semibold text-green-400">
                          {displayPrice.toFixed(2)} AED
                        </p>

                        <p className="text-xs text-gray-400 mt-1">{item.bowls}</p>

                        <div className="flex gap-2 mt-2">
                          {item.sizes.map((s) => {
                            const activeSize = selectedSize[item.name] || "S";

                            return (
                              <button
                                key={s}
                                onClick={() => handleSizeSelect(item.name, s)}
                                className={`px-2 rounded-md border ${activeSize === s
                                  ? "bg-amber-500 text-white"   // 🟧 ORANGE
                                  : "border-gray-400"
                                  }`}
                              >
                                {s}
                              </button>
                            );
                          })}

                        </div>

                        <button
                          onClick={() => {
                            handleAddToCart(item);

                          }}
                          className={`rounded-xl px-3 py-1 mt-5 ${isItemInCart(item)
                            ? "bg-green-500"
                            : "bg-amber-500 hover:bg-amber-600"
                            }`}
                        >
                          {isItemInCart(item) ? "Added" : "Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div> */}





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

              <Order
                cart={cart}
                onDelete={handleDelete}
                onClose={() => setShowOrder(false)}
                orderType={orderType}
                setOrderType={setOrderType}
                onComplete={() => {
                  setCartItems([]);      // ✅ clear cart
                  setSelectedSize({});    // 🔥 RESET SIZES
                  setShowOrder(false);  // ✅ close order panel
                }}
              />

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
          <ShoppingCart className="w-6 h-6 text-white" />

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