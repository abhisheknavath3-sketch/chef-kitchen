import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true"); // ✅ added
      navigate("/admin");
    } else if (username === "user" && password === "user123") {
      localStorage.setItem("isLoggedIn", "true"); // ✅ added
      navigate("/home");
    } else {
      alert("Invalid username or password");
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-black/70 to-gray-900/80 flex items-center justify-center z-50">
      
      <div className="bg-gray-950 text-white w-[380px] rounded-2xl shadow-2xl border border-gray-800 p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-200 hover:text-orange-400"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-orange-400 text-center mb-6 text-sm">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          <div>
            <label className="text-sm text-orange-400">Admin/Username</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm text-orange-400">Password</label>

            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-orange-500 outline-none pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-10 text-gray-400 hover:text-orange-500"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-orange-500 to-orange-600 hover:scale-105 transition py-3 rounded-xl font-semibold shadow-lg"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
