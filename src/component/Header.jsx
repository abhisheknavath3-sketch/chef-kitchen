// import React, { useContext } from 'react'
// import { Search } from 'lucide-react'
// // import { tabs } from '../constant'
// import { OrderContext } from '../context/OrderContext'
// import { DashContext } from '../context/DashContext'


// const Header = () => {

//   const {
//     currentDateTime, searchQuery, setSearchQuery, setActive, active,
//   } = useContext(OrderContext)

//   const {

//     categories

//   } = useContext(DashContext)

//   const categoryTabs = [
//     { id: "today", label: "All" },
//     ...categories.map((cat) => ({
//       id: cat.name,
//       label: cat.name,
//     })),
//   ];


//   return (
//     <>

//       <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 ">
//         <div>
//           <h1 className="text-4xl head">Chef Kitchen</h1>
//           {currentDateTime.toLocaleDateString("en-IN", {
//             weekday: "long",
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//           })}
//         </div>

//         {/* DESKTOP SEARCH */}
//         <div className="relative hidden sm:block">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search food, coffee, etc.."
//             className="h-14 pl-10 pr-4 w-60 rounded-xl bg-gray-800 border border-gray-600 outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//         </div>

//         {/* MOBILE SEARCH */}
//         <div className="relative sm:hidden mt-1 text-sm  ">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
//           <input
//             type="text"
//             placeholder="Search for food, coffee, etc.."
//             className="h-8 w-full pl-10 pr-4 rounded-2xl bg-gray-800 border border-gray-600 outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//       </div>
      
//       <div className="relative flex items-center text-white mt-5 gap-6 hide-scrollbar">
//         {categoryTabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActive(tab.id)}
//             className={`text-sm sm:text-base ${active === tab.id ? "text-orange-400" : "text-white"
//               }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>


//       <div className="relative w-full mt-4">
//         <div className="w-full border-b-2 border-gray-600  "></div>

//         <div
//           className="
//     absolute top-0 border-b-4 border-orange-400 rounded-full 
//     transition-all duration-300
//     w-1/6 md:w-[70px]
//   "
//           style={{
//             left:
//               window.innerWidth >= 768
//                 ? active === "today"
//                   ? "0px"
//                   : active === "our"
//                     ? "125px"
//                     : "250px"
//                 : active === "today"
//                   ? "0%"
//                   : active === "our"
//                     ? "32.33%"
//                     : "64.66%",
//           }}
//         />
//       </div>
//     </>
//   )
// }

// export default Header;




import React, { useContext } from 'react'
import { Search } from 'lucide-react'
import { OrderContext } from '../context/OrderContext'
import { DashContext } from '../context/DashContext'

const Header = () => {

  const {
    currentDateTime, searchQuery, setSearchQuery, setActive, active,
  } = useContext(OrderContext)

  const { categories } = useContext(DashContext)

  const categoryTabs = [
    { id: "today", label: "All" },
    ...categories.map((cat) => ({
      id: cat.name,
      label: cat.name,
    })),
  ];

  // ✅ NEW: find active tab index
  const activeIndex = categoryTabs.findIndex(tab => tab.id === active);

  return (
    <>
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

        {/* SEARCH */}
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

      {/* CATEGORY TABS */}
      {/* CATEGORY TABS */}
<div className="relative mt-5">

  {/* Tabs */}
  <div className="flex gap-8 text-white relative">
    {categoryTabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActive(tab.id)}
        className={`text-sm sm:text-base ${
          active === tab.id ? "text-orange-400" : "text-white"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Base line */}
  <div className="w-full border-b border-gray-600 mt-2"></div>

  {/* ✅ Sliding underline */}
  <div
    className="absolute bottom-0 h-[3px] bg-orange-400 rounded-full transition-all duration-300"
    style={{
      width: "40px",
      left: `calc(${categoryTabs.findIndex(t => t.id === active) * 100}px)`,
    }}
  />
</div>

    </>
  )
}

export default Header;
