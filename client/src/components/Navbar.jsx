// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-orange-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className="text-2xl">🧩</span>
        ExtensionPay
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/pricing" className="text-gray-700 hover:text-gray-900 font-medium">
          Pricing
        </Link>
        <Link to="/faq" className="text-gray-700 hover:text-gray-900 font-medium">
          FAQ
        </Link>
      </div>

      <Link 
        to="/signup" 
        className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-semibold transition-all"
      >
        Get Started
      </Link>
    </nav>
  );
};

export default Navbar;