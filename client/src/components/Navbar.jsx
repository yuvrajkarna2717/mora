// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-orange-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className="text-2xl">🧩</span>
        Mora
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/privacy-policy" className="text-gray-700 hover:text-gray-900 font-medium">
          Privacy
        </Link>
        <Link to="/faq" className="text-gray-700 hover:text-gray-900 font-medium">
          FAQ
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user?.name}</span>
          <button 
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link 
          to="/signin"
          className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-semibold transition-all"
        >
          Sign in with Google
        </Link>
      )}
    </nav>
  );
};

export default Navbar;