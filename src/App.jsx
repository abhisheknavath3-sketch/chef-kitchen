import "./App.css";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Menu from "./component/Menu";
import Receipt from "./component/Receipt";
import Layout from "./dashboard/Layout";
import Category from "./dashboard/Category";
import Products from "./dashboard/Products";
import DashOrder from "./dashboard/OrderDashboard";


function App() {
  return (
    <div className="w-full flex h-screen">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/home" element={<Home />} />
        <Route path="/receipt" element={<Receipt />} />

        {/* Admin dashboard */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="shopping" element={<DashOrder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
