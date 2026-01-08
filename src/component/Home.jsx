import React, { useContext, useState } from "react";
import Order from "./Order";
import Sidebar from "./Sidebar";
import { ShoppingCart } from 'lucide-react';
import Header from "./Header";
import Body from "./Body";
import { OrderContext } from "../context/OrderContext";

function Home() {

  const {
    showOrder,
    cartCount,setShowOrder,
  }=useContext(OrderContext);
  


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

            <Header/>

            <Body/>

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
      fixed bottom-9 right-6 z-50
      bg-amber-500
      w-13 h-13 
      rounded-full
      flex items-center justify-center opacity-85
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
          w-6 h-6
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