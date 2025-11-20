// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-4 z-50 flex justify-center">
      <div className="w-[80%] px-6 py-3 flex items-center justify-between rounded-2xl backdrop-blur-xl shadow-lg border bg-white/70 border-gray-200">
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
          mora
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/pricing" className="font-medium transition text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link to="/login" className="font-medium transition text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-xl font-medium transition bg-gray-900 text-white hover:bg-gray-800">
            Get Started
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-900">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-20 w-[80%] mx-auto px-6 py-4 rounded-2xl shadow-lg backdrop-blur-xl border bg-white/80 border-gray-200">
          <div className="flex flex-col space-y-4">
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="font-medium text-gray-700">
              Pricing
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="font-medium text-gray-700">
              Login
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full px-4 py-2 rounded-xl text-center font-medium bg-gray-900 text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;