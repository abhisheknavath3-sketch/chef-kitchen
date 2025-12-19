import React from "react";

export default function Foods({ item }) {
    return (
        <div className="bg-[#1F2633] p-4 rounded-2xl w-[220px] cursor-pointer 
                    border-2 border-transparent hover:border-blue-400 duration-300">

            <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 mx-auto rounded-full object-cover"
            />

            <h2 className="text-white text-sm font-semibold text-center mt-3">
                {item.title}
            </h2>

            <div className="flex justify-center gap-2 mt-1">
                {item.oldPrice && (
                    <span className="text-red-400 line-through text-xs">{item.oldPrice}</span>
                )}
                <span className="text-green-400 text-xs">{item.newPrice}</span>
            </div>

            <p className="text-gray-400 text-xs text-center mt-1">
                {item.bowlsAvailable} Bowls available
            </p>

            {item.sizes.length > 0 && (
                <div className="flex justify-center gap-2 mt-3">
                    {item.sizes.map((size) => (
                        <span
                            key={size}
                            className="px-2 py-1 bg-gray-700 text-white text-xs rounded-md"
                        >
                            {size}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}