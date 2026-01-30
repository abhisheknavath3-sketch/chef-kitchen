import React, { useContext, useRef, useEffect, useState } from "react";
import { Search, ChefHat } from "lucide-react";
import { OrderContext } from "../context/OrderContext";
import { DashContext } from "../context/DashContext";

const Header = () => {
  const {
    currentDateTime,
    searchQuery,
    setSearchQuery,
    setActive,
    active,
  } = useContext(OrderContext);

  const { categories } = useContext(DashContext);

  const categoryTabs = [
    { id: "today", label: "All" },
    ...categories.map((cat) => ({
      id: cat.name,
      label: cat.name,
    })),
  ];

  // ✅ underline logic
  const tabRefs = useRef([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const index = categoryTabs.findIndex(t => t.id === active);
    const el = tabRefs.current[index];

    if (el) {
      setUnderline({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [active, categoryTabs]);

  return (
    <>
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-4">

        <div className="flex items-center gap-4">
          <div className="bg-orange-400 p-3 rounded-xl">
            <ChefHat className="text-black" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-orange-400">
              Chef Kitchen
            </h1>

            <p className="text-gray-400 text-sm">
              {currentDateTime.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search food, coffee..."
            className="h-12 pl-12 pr-4 w-72 rounded-xl 
                       bg-gray-900 border border-gray-700 
                       text-white placeholder-gray-400
                       focus:outline-none focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="relative mt-6">

        <div className="flex gap-8 text-sm font-medium relative">
          {categoryTabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActive(tab.id)}
              className={`pb-2 transition ${
                active === tab.id
                  ? "text-orange-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full border-b border-gray-700"></div>

        {/* ✅ Dynamic underline */}
        <div
          className="absolute bottom-0 h-[3px] bg-orange-400 rounded-full transition-all duration-300"
          style={{
            left: underline.left,
            width: underline.width,
          }}
        />
      </div>
    </>
  );
};

export default Header;
