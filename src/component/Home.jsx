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
    oldPrice: "3.29 ",
    newPrice: "3.29",
    bowls: "22 Bowls available",
    sizes: ["S", "M", "L"],
  },

  {
    img: "/image2.png",
    name: "Hot spicy fried rice with omelet",
    oldPrice: "3.29 ",
    newPrice: "3.29 ",
    bowls: "13 Bowls available",
    sizes: ["S", "M", "L"],
  },
  {
    img: "/image3.png",
    name: "Spicy noodle with special omelette",
    oldPrice: "3.29 ",
    newPrice: "3.29 ",
    bowls: "17 Bowls available",
    sizes: ["S", "M", "L"],
  },
  {
    img: "/image4.png",
    name: "Healthy Noodle with spinach leaf",
    price: "25.00",
    bowls: "22 Bowls available",
    sizes: ["S", "M", "L"],
  },
  {
    img: "/image5.png",
    name: "Hot Spicy fried rice with omelet",
    price: "25.00 ",
    bowls: "13 Bowls available",
    sizes: ["S", "M", "L"],
  },
  {
    img: "/image6.png",
    name: "Spicy Noodle with special omelette",
    price: "25.00 ",
    bowls: "17 Bowls available",
    sizes: ["S", "M", "L"],
  },
];


function Home() {
  const [active, setActive] = useState("today");
  const [cart, setCartItems] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [orderMode, setOrderMode] = useState(1);
  const [orderType, setOrderType] = useState("Dine In");
  const [showType, setShowType] = useState(false);



  const isItemInCart = (name) => {
    return cart.some((item) => item.name === name);
  };


  const handleDelete = (name) => {
    setCartItems(prev =>
      prev.filter(item => item.name !== name)
    );
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (existing) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1,
          price: item.newPrice || item.price,
        },
      ];
    });
  };


  return (
    <div className="flex w-full bg-gray-800">
      <div className="w-full bg-gray-800 text-white min-h-screen ml-20">

      <div className="flex flex-col lg:flex-row ">
        <div className='hidden lg:block'>
          <Sidebar />
        </div>

        <div
          className={`px-6 transition-all duration-300 ${showOrder ? "w-full lg:w-[65%]" : "w-full"
            }`}
        >

          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-4xl head">Chef Kitchen</h1>
              <p>Tuesday, 2 March 2024</p>
            </div>

            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                placeholder="Search food,coffe,etc.."
                className="h-14 pl-10 pr-4 w-60 rounded-xl bg-gray-800 border border-gray-600 outline-none"
              />
            </div>
          </div>

          <div className="flex text-white mt-4 space-x-10">
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

          <div className=" flex-col h-120 overflow-y-auto hide-scrollbar">
            <div className="mt-6 w-full  ">
              <div className="flex justify-between items-center mb-4">

                <h1 className="text-xl head">Choose Dishes</h1>
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

              <div className="grid grid-cols-2  md:grid-cols-2 py-10 lg:grid-cols-3 gap-12 pb-10">
                {dishes.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-3xl p-4 flex flex-col items-center"
                  >
                    <img
                      src={item.img}
                      className="w-28 h-28 rounded-full object-cover -mt-12 mb-4"
                    />
                    <p className="text-sm text-center font-semibold">
                      {item.name}
                    </p>

                    {item.oldPrice ? (
                      <div className="flex gap-2 text-xs mt-1">
                        <span className="line-through text-red-400">
                          {item.oldPrice}
                        </span>
                        <span className="text-green-400">
                          {item.newPrice}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm mt-1">{item.price}</p>
                    )}

                    <p className="text-xs text-gray-400 mt-1">
                      {item.bowls}
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      {item.sizes.map((s, index) => (
                        <button key={index} className="text-sm border border-gray-400 gap-2 px-2 rounded-md hover:bg-amber-500">
                          {s}
                        </button>
                      ))}

                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(item);
                        setShowOrder(true);
                      }}
                      className={`rounded-xl px-3 py-1 cursor-pointer transition-all mt-5
                       ${isItemInCart(item.name)
                          ? "bg-green-500"
                          : "bg-amber-500 hover:bg-amber-600"
                        }`}
                    >
                      {isItemInCart(item.name) ? "Added" : "Add"}
                    </button>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {showOrder && (
          <div className="w-full lg:w-[35%] border-t lg:border-t-0 lg:border-l border-gray-700">

            <Order cart={cart} onDelete={handleDelete}
              onClose={() => setShowOrder(false)}
              orderMode={orderMode}
              setOrderMode={setOrderMode} />


          </div>
        )}

      </div>
    </div>

    </div>
  );
}

export default Home;