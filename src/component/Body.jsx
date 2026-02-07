import React, { useContext } from 'react'
import { ChevronDown } from 'lucide-react';
import { OrderContext } from '../context/OrderContext';

const Body = () => {

  const {

    filteredProducts,
    showType,
    setShowType,
    orderType,
    setOrderType,
    selectedSize,
    handleSizeSelect,
    handleAddToCart,
    isItemInCart,
    showOrder,


  } = useContext(OrderContext)

  //   console.log("OrderContext data:", {
  //   filteredProducts,
  //   showType,
  //   orderType,
  //   selectedSize,
  //   showOrder,
  // });
  return (
    <div className='bg-gray-800 h-full overflow-hidden  flex flex-col '>
      <div className="flex-1 flex flex-col h-full">
        <div className="mt-6 w-full flex flex-col h-full ">
          <div className="flex items-center justify-between text-sm gap-2">

            <h1 className="text-lg sm:text-xl head">
              Choose Dishes
              <span className="text-gray-400 text-sm ml-2">
                ({filteredProducts.length} items)
              </span>
            </h1>

            <div className="relative">
              <button
                onClick={() => setShowType(!showType)}
                className="
        flex items-center gap-1
        bg-gray-900 px-3 py-2
        rounded-lg
        whitespace-nowrap
      "
              >
                {orderType}
                <ChevronDown
                  className={`transition-transform ${showType ? "rotate-180" : ""}`}
                />
              </button>

              {showType && (
                <div className="absolute right-0 mt-2 opacity-85 w-40 bg-gray-900 rounded-lg shadow-lg z-20">
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

          {filteredProducts.length === 0 && (
            <p className="text-gray-400 text-center mt-10">No items found.</p>
          )}


          <div className={`grid h-full overflow-y-auto grid-cols-2 sm:grid-cols-2  gap-6 sm:gap-8 py-10 hide-scrollbar pb-25 ${showOrder ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
            {filteredProducts.map((item, index) => {
              const size = selectedSize[item.name] || "S";
              const displayPrice = Number(item.sizes[size] || 0)

              return (
                <div
                  key={index}
                  className="bg-gray-900 rounded-3xl p-6 flex flex-col items-center w-full h-70 max-w-[250px] pb-2 mx-auto"
                >
                  <img
                    src={item.image}
                    className="w-28 h-28 rounded-full object-cover -mt-12 mb-4"
                  />

                  <p className="text-sm text-center font-semibold">{item.name}</p>

                  <p className="text-sm mt-1 font-semibold text-green-400">
                    {displayPrice.toFixed(2)} AED
                  </p>

                  <p className="text-xs text-gray-400 mt-1">Stock: {item.stock}</p>


                  <p className="text-xs text-gray-400 mt-1">{item.bowls}</p>

                  <div className="flex gap-2 mt-2">
                    {Object.keys(item.sizes || {}).map((s) => {
                      const activeSize = selectedSize[item.name] || "S";



                      return (
                        <button
                          key={s}
                          onClick={() => handleSizeSelect(item.name, s)}
                          className={`px-2 rounded-md border ${activeSize === s
                            ? "bg-amber-500 text-white"
                            : "border-gray-400"
                            }`}
                        >
                          {s}
                        </button>
                      );
                    })}

                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock <= 0}
                    className={`rounded-xl px-9 py-0.5 mt-6 ${isItemInCart(item) ? "bg-green-500" : item.stock <= 0 ? "bg-gray-600 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"
                      }`}
                  >
                    {item.stock <= 0 ? "Unavailable" : isItemInCart(item) ? "Added" : "Add"}
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Body;
