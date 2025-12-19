import store from '../assets/Store.svg'
import { GoHome } from "react-icons/go";
import { CiDiscount1, CiHeart } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoNotificationsOutline, IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [active, setActive] = useState(0);
  const navigate=useNavigate()

  const icons = [
    GoHome,
    CiDiscount1,
    CiHeart,
    MdOutlineMail,
    IoNotificationsOutline,
  ];

  return (
    <>
      <div className="hidden lg:fixed lg:flex flex-col w-20 items-center rounded-r-2xl 
                bg-[#1F1D2B]  top-0 left-0 h-screen 
                 overflow-hidden z-50">

        <img src={store} alt="logo" className="w-14 mb-11 relative z-10" />

        <div className="flex flex-col  relative z-10">
          {icons.map((Icon, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className="w-12 h-15 flex items-center justify-center  text-white rounded-xl cursor-pointer   mb-6"
            >

              {active === index && (
                <>
                  <div className="absolute  -left-3 w-25 h-20 bg-gray-800 rounded-l-2xl ">
                    <div className="absolute top-0 -left-3 w-25 h-20 bg-gray-800 rounded-l-2xl ">
                      <div className="absolute  -left-20 w-10 h-20 bg-gray-800 rounded-l-xl" />

                      <div className="absolute right-2 -top-10.5 w-10 h-10  z-10">
                        <div className="relative left-4.5 top-2.5 w-7.5 h-8 bg-gray-800">

                          <div className="absolute top-0 right-0 w-8 h-8 bg-[#1F1D2B] rounded-bl-full rotate-270" />
                        </div>
                      </div>

                      <div className="absolute right-2 top-17.5 w-10 h-10  z-10">
                        <div className="relative left-4.5 top-2.5 w-7.5 h-8 bg-gray-800">

                          <div className="absolute top-0 right-0 w-8 h-8 bg-[#1F1D2B] rounded-bl-full rotate-180" />
                        </div>
                      </div>

                    </div>
                  </div>
                </>)}

              <Icon
                className={` relative z-10 text-2xl transition-all duration-300
                  ${active === index
                    ? " text-white bg-orange-400 rounded-lg w-13 h-13 p-2"
                    : "text-orange-400 hover:text-white"
                  }
                `}
              />
            </button>
          ))}
        </div>

        <IoLogOutOutline className="text-[#F99147] hover:text-white text-3xl cursor-pointer mt-15 relative z-10" 
                                    onClick={()=>navigate("/")}/>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-10 bg-[#1F1D2B] flex justify-around items-center border-t border-gray-800">
        <GoHome className="text-[#F99147] text-2xl" />
        <CiDiscount1 className="text-[#F99147] text-2xl" />
        <CiHeart className="text-[#F99147] text-2xl" />
        <MdOutlineMail className="text-[#F99147] text-2xl" />
        <IoNotificationsOutline className="text-[#F99147] text-2xl" />
      </div>
    </>
  );
}

export default Sidebar;