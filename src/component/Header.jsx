import React from 'react'
import { Search } from 'lucide-react'
import { tabs } from '../constant'


const Header = ({currentDateTime,searchQuery,setSearchQuery,setActive,active,}) => {
    

  return (
   <>
   
            <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 ">
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
            <div className="flex text-white mt-5 gap-6 overflow-x-auto hide-scrollbar ">
              {tabs.map((tab) => (

                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                   className={`lg:mb-2 mb-4 ${active === tab.id ? "text-orange-400" : "text-white cursor-pointer"}`}
      
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full mt-4">
              <div className="w-full border-b-2 border-gray-600  "></div>

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
            </div>
   </>
  )
}

export default Header;




