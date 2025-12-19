
import "./App.css";
import Sidebar from './component/Sidebar'
import Home from "./component/Home";
import { Routes,Route } from "react-router-dom";
import Order from "./component/Order";
import Menu from "./component/Menu";
function App() {
  
  return (
    <>
    <div className="w-full flex h-screen ">
    
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="Home" element={<Home/>}/>
       
      </Routes>
     
      </div>
    </>
  )
}

export default App;
