
import "./App.css";
import Sidebar from './component/Sidebar'
import Home from "./component/Home";
import {BrowserRouter, Routes,Route } from "react-router-dom";
import Order from "./component/Order";
import Menu from "./component/Menu";
import Receipt from "./component/Receipt";

function App() {
  
  return (
    <>
    <div className="w-full flex h-screen ">
    
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="Home" element={<Home/>}/>
        <Route path="/receipt" element={<Receipt/>}/>
       
      </Routes>
     
      </div>
    </>
  )
}

export default App;
