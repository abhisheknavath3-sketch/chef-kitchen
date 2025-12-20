import React, { useState } from "react";
import { Search, ChevronDown, Presentation } from "lucide-react";
import Order from "./Order";
import Sidebar from "./Sidebar";
import { ShoppingCart } from 'lucide-react';



const tabs = [
  { id: "today", label: "Today Special" },
  { id: "our", label: "Our Special" },
  { id: "south", label: "South Indian Special" },
];


const dishes = [


  {
    img: "/image1.png",
    name: "Healthy noodle with spinach leaf",
    basePrice: 3.29,
    sizePrices: { S: 0, M: 1, L: 2 },
    bowls: "22 Bowls available",
    sizes: ["S", "M", "L"],
    category: "our",
  },
  {
    img: "/image2.png",
    name: "Hot spicy fried rice with omelet",
    basePrice: 3.29,
    sizePrices: { S: 0, M: 1, L: 2 },
    bowls: "13 Bowls available",
    sizes: ["S", "M", "L"],
    category: "today",
  },
  {
    img: "/image3.png",
    name: "Spicy noodle with special omelette",
    basePrice: 5.29,
    sizePrices: { S: 0, M: 1, L: 2 },
    bowls: "17 Bowls available",
    sizes: ["S", "M", "L"],
    category: "our",
  },
  {
    img: "/image4.png",
    name: "Healthy Noodle with spinach leaf",
    basePrice: 25.00,
    sizePrices: { S: 0, M: 1, L: 2 },
    bowls: "22 Bowls available",
    sizes: ["S", "M", "L"],
    category: "south",
  },
  {
    img: "/image5.png",
    name: "Hot Spicy fried rice with omelet",
    basePrice: 26.00,
    sizePrices: { S: 0, M: 6, L: 15 },
    bowls: "13 Bowls available",
    sizes: ["S", "M", "L"],
    category: "our",
  },
  {
    img: "/image6.png",
    name: "Spicy Noodle with special omelette",
    basePrice: 27.00,
    sizePrices: { S: 0, M: 5, L: 15 },
    bowls: "17 Bowls available",
    sizes: ["S", "M", "L"],
    category: "south",
  },
];


function Home() {
  const [active, setActive] = useState("today");
  const [cart, setCartItems] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  const [orderType, setOrderType] = useState("Dine In");
  const [showType, setShowType] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date)
  const [searchQuery, setSearchQuery] = useState("");


  const [selectedSize, setSelectedSize] = useState({});

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
    <div className="w-full bg-gray-800 text-white min-h-screen lg:ml-20">
      <div className="flex w-full">

        <div className="flex flex-col lg:flex-row w-full relative">

          <Sidebar />


          <div
            className={`px-4 sm:px-6 transition-all duration-300 
               ${showOrder ? "w-full lg:w-[65%]" : "w-full"} 
               bg-gray-800 h-screen flex flex-col`}
          >



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

            <div className="flex text-white mt-4 space-x-6 overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`pb-1 transition-all ${active === tab.id ? "text-orange-400" : "text-white cursor-pointer"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full mt-3">
              <div className="w-full border-b-2 border-gray-600"></div>

              <div className="absolute top-0 border-b-5 border-orange-400 rounded-full transition-all"
                style={{
                  width: "90px",
                  left:
                    active === "today"
                      ? "0px"
                      : active === "our"
                        ? "130px"
                        : "250px",
                }}
              ></div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
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
                      {/* Selected button */}
                      <button
                        onClick={() => setShowType(!showType)}
                        className="flex items-center gap-1 bg-gray-900 px-4 py-2 rounded-lg"
                      >
                        {orderType}
                        <ChevronDown
                          className={`transition-transform ${showType ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Dropdown options */}
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

                    <button onClick={() => setShowOrder(true)} className="bg-amber-500 rounded-xl px-4 py-1 cursor-pointer">
                      <ShoppingCart />
                    </button>
                  </div>
                </div>

               


                {/* No items found */}
                {filteredDishes.length === 0 && (
                  <p className="text-gray-400 text-center mt-10">No items found.</p>
                )}


                {/* Dishes grid */}
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
                          {item.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSizeSelect(item.name, s)}
                              className={`px-2 rounded-md border ${selectedSize[item.name] === s
                                ? "bg-amber-500 text-white"
                                : "border-gray-400"
                                }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            handleAddToCart(item);
                            setShowOrder(true);
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
            </div>
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
                orderType={orderType}         // pass selected type
                setOrderType={setOrderType}   // pass setter to allow change from Order page
              />

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Home;